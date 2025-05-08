# Pokemon Amethyst Helper

Pokemon Amethyst Helper is a web based utility designed to support people playing the Pokemon Amethyst Romhack.

It's secondary purpose is to serve as a way for me to learn more about React, and was built with [Next.js](https://nextjs.org).

## Running Locally

Run the app by running `npm run dev`. The server will be hosted at [http://localhost:3000](http://localhost:3000) by default.

## Deploying

This repo makes use of the [gh-pages](https://www.npmjs.com/package/gh-pages) NPM package to deploy the application. The following elements are configured:

- A `homepage` property in `package.json`, which defines the deployed URL
- `predeploy` and `deploy` scripts in `package.json`, which define the deployment commands
- A `gh-pages` branch on the repo, which deployments are pushed to
- Configuration on the repo to deploy automatically

The deployed page can be found [here](https://assassinsgreed.github.io/pokemon-amethyst-helper/).
