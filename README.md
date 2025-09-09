# Brzo

This is my own SaaS boilerplate kit. Does not come with a pre-built UI, so you will need to build this out yourself. The main reason I did not include a UI is because I'm always experimenting and changing things up, and everybody does it differently. I used my own Better-Auth config, which is something that typically shouldn't really change.

I included Stripe and Amazon SES. I also included the Better Email Harmony plugin. This should help reduce users signing up with throwaway emails.

## Creating a project

```bash
# create a new project in the current directory
npm init solid@latest

# create a new project in my-app
npm init solid@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _presets_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different preset, add it to the `devDependencies` in `package.json` and specify in your `app.config.js`.

## This project was created with the [Solid CLI](https://github.com/solidjs-community/solid-cli)
