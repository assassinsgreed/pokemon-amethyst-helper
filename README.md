# Pokemon Amethyst Helper

Pokemon Amethyst Helper is a web based utility designed to support people playing the Pokemon Amethyst Romhack.

It's secondary purpose is to serve as a way for me to learn more about React, and was built with [Next.js](https://nextjs.org).

## Running Locally

You will need to create an `.env.local` file at the root of this directory, containing the repository secrets. This is required in order to communicate with Firestore for data retrieval.

Run the app by running `npm run dev`. The server will be hosted at [http://localhost:3000](http://localhost:3000) by default.

To debug, run the included `Next.js: debug full stack` debug configuration and place `debugger;` statements in source code that need to be debugged. Alternative configurations are provided for debugging just the server or client code.

## Deploying

This repo makes use of Vercel to deploy both the production build and PR Previews. Links to these deployments can be found on the repo in GitHub.

## Credits

The following free resources were used when developing this webpage:

- [Pokedex favicon](https://www.iconfinder.com/icons/3151571/pokedex_video_game_icon) by [IconFinder](https://www.iconfinder.com/)
- [Pokedex icons](https://projectpokemon.org/home/docs/spriteindex_148/switch-sv-style-sprites-for-home-r153/)
