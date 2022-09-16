import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'node-html-parser';

interface ShieldIoParams {
  label: string;
  message: string;
  color: string;
  labelColor: string;
  isError: string;
  namedLogo: string;
  logoSvg: string;
  logoColor: string;
  logoWidth: string;
  logoPosition: string;
  style: string;
  cacheSeconds: string;
}

interface RequestParams extends ShieldIoParams {
  owner: string;
  repo: string;
  workflowFileName: string;
  branch: string;
  event: string;
  cache: string;
}


const deleteRequestParamsFromShieldIOParams = (requestParams: RequestParams) => {
  const requestParamsKeys = Object.keys(requestParams);

  const omitKeys = ['owner', 'repo', 'workflowFileName', 'branch', 'event', 'cache'];

  return requestParamsKeys.reduce((output, key) => (
    omitKeys.includes(key) ? output : { ...output, [key]: requestParams[key as keyof RequestParams] }
  ), {} as ShieldIoParams)
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

  let status = ''

  if (!html.toLowerCase().includes('not found')) {
    const parsedHtml = parse(html);

    const title = parsedHtml.getElementsByTagName('title')[0].rawText;

    status = title.split('-')
      .map(element => element.trim())
      .filter(element => element !== '')[1].toUpperCase();
  } else {
    status = 'REPO, BRANCH, OR WORKFLOW NOT FOUND';
  }

  const responseParams = deleteRequestParamsFromShieldIOParams(requestParams);

  if (!requestParams.color) {
    if (status === 'PASSING') {
      responseParams.color = '4c1';
    } else if (status === 'NO STATUS') {
      responseParams.color = '9f9f9f';
    } else {
      responseParams.color = 'e05d44';
    }
  }

  responseParams.message = status;

  const cacheSeconds = requestParams.cache ?? 60;

  res.setHeader('Cache-Control', `s-maxage=${cacheSeconds}, stale-while-revalidate`);
  res.json({
    schemaVersion: 1,
    ...responseParams
  });
};

export default handler;