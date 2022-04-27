import * as util from 'util';
import { addHttpsIfNotLocal, isAddressId, isAddressKey, normalizeVerifiers, trimAndClean } from '../utils/general';
import * as cheerio from 'cheerio';
import markdownIt from 'markdown-it';
import { Octokit } from 'octokit';
import {
  IssueComment,
  IssueCommentConnection,
  IssueConnection,
  PullRequest,
  PullRequestCommit,
  PullRequestCommitConnection,
  PullRequestConnection,
  Repository,
} from '@octokit/graphql-schema';
import {
  getAddress,
  getName,
  getApprovedAddress,
  getOrganization,
  getRegion,
  getWebsiteAndSocial,
} from '../utils/regexes';
import { getAddressIdFromKey } from './getAddressIdFromKey';
import { getAddressKeyFromId } from './getAddressKeyFromId';
import _ from 'lodash';
import { extractedFromGithub } from '../mocks/extractedFromGithub';
import { getVerifiersWithoutAllowanceArray } from '../mocks/getVerifiersWithoutAllowanceArray';
import { getVerifiersWithAllowanceArray } from '../mocks/getVerifiersWithAllowanceArray';

util.inspect.defaultOptions = {
  colors: true,
  depth: 6,
  maxArrayLength: null,
  // showHidden: true,
  // breakLength: Infinity,
  breakLength: 2,
};

const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN });

export async function loopEdges<A>(
  connection: IssueConnection | PullRequestConnection | IssueCommentConnection,
  options: Partial<{
    onNext: (cursor: string, data: A[]) => Promise<A[] | void>;
    onNode: (node: A) => A | Promise<A>;
  }> = {},
): Promise<A[]> {
  const data: A[] = [];

  let lastCursor: string | null = null;

  if (connection.edges && connection.edges.length) {
    for (const edge of connection.edges) {
      if (edge) {
        let node = edge.node as unknown as A;

        if (options.onNode) {
          node = await options.onNode(node);
        }

        data.push(node);

        lastCursor = edge.cursor;
      }
    }
  }

  if (connection.pageInfo.hasNextPage && lastCursor && options.onNext) {
    const response = await options.onNext(lastCursor, data);

    if (response) {
      data.push(...response);
    }
  }

  return data;
}

const extractInfoFromIssues = async (issues: any) => {
  const data = await Promise.allSettled(
    issues.map((v) => {
      // console.log(v);
      // return {...extractInfoFromIssue(v)};
      const data = extractInfoFromIssue(v);
      return data;
    }),
  );
  const returnThis = data.map((v) => v.status === 'fulfilled' && v.value);
  // console.log(returnThis);
  return returnThis;
  // return data.map((v) => v.status === 'fulfilled' && v.value);
};

const extractInfoFromIssue = async (issue) => {
  const bodyParsed = markdownIt().render(issue.body);

  const region = getRegion(bodyParsed) && trimAndClean(getRegion(bodyParsed)[1]);

  // If address is not present in the issue body, we look for it in the comments
  let address = getAddress(bodyParsed);
  let newAddress;
  if ((!address || !address[1]) && Array.isArray(issue.comments)) {
    const { comments } = issue;

    newAddress = comments
      ?.flatMap((v: any) => v.body)
      ?.filter((v: any) => /approved.*\r\n.*address/im.test(v))
      ?.flat();
    newAddress = address && /approved.*[\r\n]*.*address.*[\r\n]*.*\s+(f[0-9]+[^\r]+)/im.exec(address[0]);
  }
  address = newAddress || (address && address[1]);
  address = trimAndClean(address);

  const addressId =
    (isAddressId(address) && address) || (isAddressKey(address) && (await getAddressIdFromKey(address)));
  const addressKey =
    (isAddressKey(address) && address) || (isAddressId(address) && (await getAddressKeyFromId(address)));
  const name = getName(bodyParsed) && trimAndClean(getName(bodyParsed)[1]);
  const organization = getOrganization(bodyParsed) && trimAndClean(getOrganization(bodyParsed)[1]);
  const websiteAndSocial = getWebsiteAndSocial(bodyParsed) && trimAndClean(getWebsiteAndSocial(bodyParsed)[1]);

  // console.log();
  return {
    issueNumber: issue.number,
    addressId: addressId || null,
    addressKey: addressKey || null,
    // address,
    name,
    organization,
    region,
    websiteAndSocial,
  };
};

const getIssue = async (issueNumber: number) => {
  const QUERY = `
    query ($owner: String!, $repo: String!, $issueNumber: Int!) {
      repository(owner: $owner, name: $repo) {
        issue(number: $issueNumber) {
          number
          title
          body
          comments(first: 100) {
            edges {
              node {
                body
              }
            }
          }
        }
      }
    }
  `;
  const response = await octokit.graphql<{ repository: Repository }>(QUERY, {
    owner: 'filecoin-project',
    repo: 'notary-governance',
    issueNumber,
  });

  return {
    ...response.repository.issue,
    comments: response.repository.issue?.comments.edges?.flatMap((v) => v?.node),
  };
};

const getIssues = async (num: number = 100) => {
  const QUERY = `
    query ($owner: String!, $repo: String!, $after: String, $num: Int = 100) {
      repository(owner:$owner, name:$repo) {
        issues(first:$num, after:$after, orderBy: {field: CREATED_AT, direction: ASC}) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              number
              title
              body
              comments(first: 100) {
                edges {
                  node {
                    body
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const response = await octokit.graphql<{ repository: Repository }>(QUERY, {
    owner: 'filecoin-project',
    repo: 'notary-governance',
    num,
  });

  return response.repository.issues.edges?.map((v) => ({
    ...v?.node,
    comments: v?.node?.comments.edges?.flatMap((v) => v?.node),
    response,
  }));
};

export type QueryOption = Record<string, string | number | string[]>;
const getAllIssues = async (options: QueryOption = {}) => {
  const QUERY = `
  query ($owner: String!, $repo: String!, $after: String, $num: Int = 100) {
    repository(owner:$owner, name:$repo) {
      issues(first:$num, after:$after, orderBy: {field: CREATED_AT, direction: DESC}) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            number
            title
            body
            comments(first: 100) {
              edges {
                node {
                  body
                }
              }
            }
          }
        }
      }
    }
  }
`;
  const response = await octokit.graphql<{ repository: Repository }>(QUERY, {
    owner: 'filecoin-project',
    repo: 'notary-governance',
    num: 100,
    ...options,
  });

  const issuesConnection = response.repository?.issues;

  return await loopEdges<IssueComment>(issuesConnection, {
    onNext: (cursor) => getAllIssues({ ...options, after: cursor }),
  });
};

const filterPossibleVerifiers = (list: any) => list.filter((v: {}) => Object.entries(v).filter((n) => n[1]).length > 3);

const filterExistsInInterplanetaryApi = (verifiers: any[]) => {
  const verifiersFromIpo = getVerifiersWithoutAllowanceArray;
  return verifiers.filter((verifier) =>
    verifiersFromIpo.data.find((fromIpo) => {
      const issueFromAuditTrail = /([0-9]+)$/im.exec(fromIpo.auditTrail) || [];
      return (
        verifier.addressId === fromIpo.addressId ||
        verifier.addressKey === fromIpo.address ||
        verifier.issueNumber === issueFromAuditTrail[1]
      );
    }),
  );
};

const addInfoFromInterplanetaryApi = (verifiers: any[]) => {
  // const verifiersFromIpo = getVerifiersWithoutAllowanceArray;
  const verifiersFromIpo = getVerifiersWithAllowanceArray;
  return verifiers.map((verifier) => ({
    ...verifier,
    fromInterplanetaryOneApi: { ...verifiersFromIpo.data.find((fromIpo) => verifier.addressId === fromIpo.addressId) },
    // fromInterplanetaryOneApiByIssueNumber: {
    //   ...verifiersFromIpo.data.find((fromIpo) => {
    //     const issueFromAuditTrail = /([0-9]+)$/im.exec(fromIpo.auditTrail) || [];
    //     return verifier.issueNumber === issueFromAuditTrail[0];
    //   }),
    // },
    // allFromInterplanetaryOneApi: [
    //   ...verifiersFromIpo.data.filter((fromIpo) => verifier.addressId === fromIpo.addressId),
    // ],
  }));
};

export async function getVerifiers() {
  // const allIssues = await getAllIssues();
  // const allIssues = await getIssues(50);
  // const verifiers = filterPossibleVerifiers(
  //   extractInfoFromIssues(await getIssues()),
  // );

  // const verifiers = filterPossibleVerifiers(extractInfoFromIssues(allIssues));
  const verifiersMock = extractedFromGithub;
  // const verifiers = verifiersMock;
  // const verifiers = normalizeVerifiers(verifiersMock);
  // const verifiers = addInfoFromInterplanetaryApi(filterExistsInInterplanetaryApi(verifiersMock));
  const verifiers = normalizeVerifiers(addInfoFromInterplanetaryApi(filterExistsInInterplanetaryApi(verifiersMock)));
  // console.log('verifiers ->', verifiers);
  console.log('verifiers.length ->', verifiers.length);

  // console.log(await pullAllIssues());

  const response = verifiers;

  return response;
}
