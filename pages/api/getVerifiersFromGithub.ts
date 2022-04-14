import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
import markdownIt from 'markdown-it';

export default async function getVerifiersFromGithub(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiEndpoint =
    // 'https://github.com/filecoin-project/notary-governance/blob/main/notaries/README.md';
    'https://api.github.com/repos/filecoin-project/notary-governance/readme/notaries';

  const response = await fetch(`${apiEndpoint}`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
    },
  });
  const data = await response.json();
  const dataDecoded = Buffer.from(data.content, 'base64').toString();
  const dataParsed = markdownIt().render(dataDecoded);

  const $ = cheerio.load(dataParsed);

  // @TODO: Organize this mess.
  const getNotaries = () => {
    const notariesRows = $('tbody > tr')
      .toArray()
      .map((e) => $(e));
    // console.log('notariesRows ->', notariesRows);

    let notaries: any[] = notariesRows.map((v) => v.find('td').toArray());
    // console.log(newNotaries);

    notaries = notaries.map((v) =>
      v.map((e: any) => e.children[0].data || e.children[0].children[0].data)
    );
    notaries = notaries.map((v) => ({
      region: v[0],
      name: v[1],
      link: v[2],
      datacap: v[3],
    }));
    // console.log(notaries);
    return notaries;
  };

  // getNotaries();
  // console.log(getNotaries());

  res.status(200).json(getNotaries());
}
