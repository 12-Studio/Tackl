## 💫 Tackl 2 - Website Starter Kit

Our most advanced starter kit to date that provides the developer experience and infrastructure to build, scale, and secure a faster, more personalized Web.

This is a [Next.js](https://nextjs.org/)

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

To create a production build

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.jsx`. The page auto-updates as you edit the file.

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Tackl project.

    .
    ├── node_modules
    ├── storybook
    ├── app
    ├── public
    ├── src
    ├── .env
    ├── .eslintrc.json
    ├── .gitignore
    ├── .npmrc
    ├── .deployment_guide.md
    ├── .jsconfig.json
    ├── next-config.js
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/storybook`**: This directory contains everything storybook related, including setup files for tweaking the storybook interfaces, individual stories are created at the component level under `src/parts/YourComponent`

3.  **`./app`**: This is the App directory, NextJS's latest way of building apps, this is different to the Pages directory, which you may see here time to time. [App Router](https://nextjs.org/docs/app)

4.  **`./public`**: This directory is for storing assets such as fonts, images, icons or videos that you want to use inline within your application (non-dynamic data)

5.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

6.  **`.env`**: Short for "environment," is a simple text file used to store configuration settings and sensitive information for a project.

7.  **`.env`**: A configuration file used with ESLint, a popular JavaScript and TypeScript linter. ESLint is a tool that helps developers maintain consistent coding styles and identify potential errors in their code. The .eslintrc file allows developers to customize ESLint's behavior for a specific project.

8.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

9.  **`.npmrc`**: A configuration file used with npm, the package manager for JavaScript. It allows developers to customize the behavior of npm for a specific project by setting various configuration options. Typically used for activating GSAP paid plans.

10. **`deployment_guide`**: This file tells you how to deploy to AWS in complete, easy steps.

11. **`jsconfig.json`**: A configuration file used in JavaScript and TypeScript projects to specify options for the TypeScript compiler (tsc) and improve the development experience by enabling features like IntelliSense in code editors.

12. **`next-config.js`**: A configuration file used in Next.js projects to customize the default behavior of the Next.js framework. It allows developers to modify various settings, configure plugins, and define custom behaviors for their Next.js applications.

13. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

14. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

15. **`README.md`**: A text file containing useful reference information about your project.

## 🎓Learning NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
