import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
import markdownIt from 'markdown-it';
import { addHttpsIfNotLocal } from '../../utils/general';

export default async function getVerifiers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const VERIFIER_LIST_ENDPOINT = `${addHttpsIfNotLocal(
    process.env.NEXT_PUBLIC_VERCEL_URL
  )}/api/getVerifiersFromGithub`;

  const verifierList = await fetch(`${VERIFIER_LIST_ENDPOINT}`);
  const verifierListData = await verifierList.json();

  const data = {
    ...verifierListData.flat(),
  };

  const getIssue = async (issueNumber: number) => {
    const endpoint = `https://api.github.com/repos/filecoin-project/notary-governance/issues/${issueNumber}`;
    const res = await fetch(endpoint, {
      headers: {
        Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
      },
    });
    return res.json();
  };

  const getIssueComments = async (issueNumber: number) => {
    const endpoint = `https://api.github.com/repos/filecoin-project/notary-governance/issues/${issueNumber}/comments`;
    const res = await fetch(endpoint, {
      headers: {
        Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
      },
    });
    return res.json();
  };

  const getInfoFromIssue = async (issue: any) => {
    const issueBodyParsed = markdownIt().render(issue.body);
    // console.log('issueBodyParsed ->', issueBodyParsed);

    // const getRegion = /region[^:]*:\s*([^\\]+(?!\\r|\\n))/i.exec(issue.body);
    // const getRegion = /^<.*region[^:]*:\s*([^<>\n]+)/igm.exec(issueBodyParsed);
    // const getRegion = /^<.*region[^:]*:\s*([^<>\n]+)/igm.exec(issueBodyParsed);
    // const getRegion = /^<?.*region[^:]*:(.+)<+?/gim.exec(issueBodyParsed);
    const getRegion = /^<?.*region[^:]*:([^\n]+)<+?/gim.exec(issueBodyParsed);
    const region =
      getRegion &&
      getRegion[1]
        .trim()
        .replace(/<\/?[^>]*>/gi, '')
        .replace(/^\[|\]$/gi, '');

    let getAddress = /^<?.*address[^:]*:([^\n]+)<+?/gim.exec(issueBodyParsed);
    if (!getAddress || !getAddress[1]) {
      const issueComments = await getIssueComments(issue.number);

      // getAddress = issueComments.flatMap((v: any) => v.body && /request.*approved.*address.*(f[0-9]+[^\\]+)/gi.exec(v.body));
      // getAddress = issueComments.reduce((previous: any, current: any) => /request.*approved.*address.*(f[0-9]+[^\\]+)/gim.exec(current.body));

      // getAddress = issueComments.reduce((previous: any, current: any) => {
      //   // console.log('current ->', current.body);
      //   const bodyParsed = markdownIt().render(current.body);
      //   // console.log('bodyParsed ->', bodyParsed);
      //   console.log('current ->', /approved.*address(.|[\n\r])*(f[0-9]+[^\\<]+)/gim.exec(bodyParsed));
      //   // console.log('current ->', /request.*approved.*address.*(f[0-9]+[^\\]+)/gim.exec(bodyParsed));
      // });

      // getAddress = issueComments.flatMap((v: any) => v.body).filter((v: any) => /approved.*\r\n.*address/igm.test(v)).map((v: any) => /approved.*[\r\n]*.*address.*[\r\n]*.*(f[0-9]+[^\\]+)/igm.exec(v));
      getAddress = issueComments
        .flatMap((v: any) => v.body)
        .filter((v: any) => /approved.*\r\n.*address/gim.test(v))
        .flat();
      getAddress =
        getAddress &&
        /approved.*[\r\n]*.*address.*[\r\n]*.*\s+(f[0-9]+[^\r]+)/gim.exec(
          getAddress[0]
        );

      // .map((v: any) => /approved.*[\r\n]*.*address.*[\r\n]*.*(f[0-9]+[^\\]+)/igm.exec(v));

      console.log('new getAddress ->', getAddress);
      // getAddress = /^<?.*address[^:]*:([^\n]+)<+?/gim.exec(issueBodyParsed);
    }
    let address =
      getAddress &&
      getAddress[1]
        ?.trim()
        ?.replace(/<\/?[^>]*>/gi, '')
        ?.replace(/^\[|\]$/gi, '');

    const getName = /^<?.*name[^:]*:([^\n]+)<+?/gim.exec(issueBodyParsed);
    const name =
      getName &&
      getName[1]
        .trim()
        .replace(/<\/?[^>]*>/gi, '')
        .replace(/^\[|\]$/gi, '');

    const getOrganization = /^<?.*organization[^:]*:([^\n]+)<+?/gim.exec(
      issueBodyParsed
    );
    const organization =
      getOrganization &&
      getOrganization[1]
        .trim()
        .replace(/<\/?[^>]*>/gi, '')
        .replace(/^\[|\]$/gi, '');

    const getWebsiteAndSocial =
      /^<?.*website.{0,3}social[^:]*:([^\n]+)<+?/gim.exec(issueBodyParsed);
    const websiteAndSocial =
      getWebsiteAndSocial &&
      getWebsiteAndSocial[1]
        .trim()
        .replace(/<\/?[^>]*>/gi, '')
        .replace(/^\[|\]$/gi, '');

    return {
      region,
      address,
      name,
      organization,
      websiteAndSocial,
    };
  };

  const newData = verifierListData.slice(0, 200).map(async (verifier: any) => {
    const issueNumber = verifier.link.match(/[0-9]+$/g);
    const issue = await getIssue(issueNumber);
    // const issue = await getIssue(158);
    const infoFromGithubIssue = await getInfoFromIssue(issue);
    console.log('issueNumber ->', issueNumber);
    // console.log(getInfoFromIssue(issue));

    return {
      ...verifier,
      infoFromGithubIssue,
    };
  });

  const response = await Promise.all(newData);

  res.status(200).json(response);
}
