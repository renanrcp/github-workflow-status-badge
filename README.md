## Introduction
This app was created as alternative of this [shields.io issue #8416](https://github.com/badges/shields/issues/8146) about github workflow status badge not working for some actions.

## Usage

To use this app you need to build your url according with these params:

`https://github-workflow-status-badge.vercel.app/api/{owner}/{repo}/{workflowFileName}`

Example:

`https://github-workflow-status-badge.vercel.app/api/NextAudio/NextAudio/build-test-lint.yml`

___

You can also use `branch` and `event` as query params:


branch:

`https://github-workflow-status-badge.vercel.app/api/{owner}/{repo}/{workflowFileName}?branch={branchName}`

event:

`https://github-workflow-status-badge.vercel.app/api/{owner}/{repo}/{workflowFileName}?event={eventName}`

___

After build your url you just need to concat with shields.io custom json badge:

`https://img.shields.io/endpoint?url=https://github-workflow-status-badge.vercel.app/api/{owner}/{repo}/{workflowFileName}`

Example:

`https://img.shields.io/endpoint?url=https://github-workflow-status-badge.vercel.app/api/NextAudio/NextAudio/build-test-lint.yml`

___

You can use shields.io params like label, logo, etc; just passing these params before the `url` param

`https://img.shields.io/endpoint?label=BUILD%20STATUS&logo=github&style=for-the-badge&logoWidth=20&labelColor=0d0d0d&url=https://github-workflow-status-badge.vercel.app/api/{owner}/{repo}/{workflowFileName}`

Example:
`https://img.shields.io/endpoint?label=BUILD%20STATUS&logo=github&style=for-the-badge&logoWidth=20&labelColor=0d0d0d&url=https://github-workflow-status-badge.vercel.app/api/NextAudio/NextAudio/build-test-lint.yml`

___

## Simple URL Builder
You can access the [app homepage](https://github-workflow-status-badge.vercel.app) and build a simple shield.io url.

## Developing

Run the development server:

```bash
yarn dev
```
