## Info
This app was created as alternativa of this [shields.io issue #8416](https://github.com/badges/shields/issues/8146) about github workflow status badge not working for some actions.

## Usage

To use this app you need to build your url according with the params:

`https://github-workflow-status-badge.vercel.app/api/{owner}/{repo}/{workflowFileName}`

Example:

`https://github-workflow-status-badge.vercel.app/api/NextAudio/NextAudio/build-test-lint.yml`

You can also use `branch` and `event` as query params:

branch:

`https://github-workflow-status-badge.vercel.app/api/{owner}/{repo}/{workflowFileName}?branch={branchName}`

event:

`https://github-workflow-status-badge.vercel.app/api/{owner}/{repo}/{workflowFileName}?event={eventName}`

After build your url you just need to concat with shields.io custom json badge:

`https://img.shields.io/endpoint?url=https://github-workflow-status-badge.vercel.app/api/{owner}/{repo}/{workflowFileName}`

You can use shields.io params like label, logo, etc; just passing these params before the `url` param

Example:
`https://img.shields.io/endpoint?label=BUILD%20STATUS&logo=github&style=for-the-badge&logoWidth=20&labelColor=0d0d0d&url=https://github-workflow-status-badge.vercel.app/api/NextAudio/NextAudio/build-test-lint.yml`

## Developing

Run the development server:

```bash
yarn dev
```