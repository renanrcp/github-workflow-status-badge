import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'node-html-parser';

interface ShieldIoParams {
  schemaVersion: number;
  label: string;
  message: string;
  color: string;
}

interface RequestParams {
  owner: string;
  repo: string;
  workflowFileName: string;
  branch: string;
  event: string;
  cache: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestParams: RequestParams = req.query as any;

  let githubUrl = `https://github.com/${requestParams.owner}/${requestParams.repo}/actions/workflows/${requestParams.workflowFileName}/badge.svg`;

  if (!!requestParams.branch) {
    githubUrl += `?branch=${requestParams.branch}`;
  }

  if (!!requestParams.event) {
    githubUrl += githubUrl.includes('?branch=') ? `&event=${requestParams.event}` : `?event=${requestParams.event}`;
  }

  const gitHubResponse = await fetch(githubUrl);

  const html = await gitHubResponse.text();

  console.log(html);

  let status = ''

  if (!html.toLowerCase().includes('not found')) {
    const parsedHtml = parse(html);

    const title = parsedHtml.getElementsByTagName('title')[0].rawText;

    const words = title.split('-')
      .map(element => element.trim())
      .filter(element => element !== '');

    status = words[words.length - 1].toLowerCase();
  } else {
    status = 'repo, branch, or workflow not found';
  }

  let color = '';

  if (status === 'passing') {
    color = '4c1';
  } else if (status === 'no status') {
    color = '9f9f9f';
  } else {
    color = 'e05d44';
  }

  const responseParams: ShieldIoParams = {
    schemaVersion: 1,
    message: status,
    color: color,
    label: 'build'
  };

  const cacheSeconds = requestParams.cache ?? 60;

  res.setHeader('Cache-Control', `s-maxage=${cacheSeconds}, stale-while-revalidate`);
  res.json(responseParams);
};

export default handler;