import { Octokit } from 'octokit';
import * as util from 'util';

util.inspect.defaultOptions = {
  colors: true,
  depth: Infinity,
  maxArrayLength: null,
  // showHidden: true,
  // breakLength: Infinity,
  breakLength: 2,
};

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN_FILPLUS });

export async function getVerifiers() {
  const res = await octokit.rest.repos.getContent({
    owner: 'FilecoinPlus',
    repo: 'data',
    path: 'data/generated/verifiers.json',
    mediaType: {
      format: 'raw',
    },
  });

  // @ts-ignore
  const data = JSON.parse(res.data);

  return data;
}
