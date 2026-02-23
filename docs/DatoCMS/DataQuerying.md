# Next.js + DatoCMS Overview

Next.js is an exceptional tool for building modern, universal frontend applications with the power of React. It lets you get started without having to write much boilerplate code and with a set of sane defaults upon which you can build.

Vercel is the easiest way to deploy a production-ready, highly available Next.js website, with static assets being served through the CDN automatically and built-in support for Next.js' automatic static optimization and API routes.

DatoCMS is the perfect companion to Next.js since it offers content, images and videos on a globally-distributed CDN, much like Vercel does for the static assets of your website. With this combo, you can have an infinitely scalable website, ready to handle prime-time TV traffic spikes, at a fraction of the regular cost.

## Quick Start

## Fetching content from DatoCMS

When it comes to fetching data, Next recommends the following:

-   Perform the fetch on the Server, to reduce the back-and-forth communication between client and server
-   Use Next.js fetch API, and call it whenever you need it, be it a layout, a page or a specific component

Let's start by installing `@datocms/cda-client`, a lightweight, TypeScript-ready package that offers various helpers around the native Fetch API to perform GraphQL requests towards DatoCMS Content Delivery API:

```bash
npm install --save @datocms/cda-client
```

### Creating a DatoCMS Client

Inside of our `utils` directory, add a file called `datocms.js`. This will contain a reusable function for fetching content from DatoCMS that can be used across all components:

```javascript
import { executeQuery } from '@datocms/cda-client';

export const performRequest = (query, options) => {
    return executeQuery(query, {
        ...options,
        token: process.env.NEXT_DATOCMS_API_TOKEN,
        environment: process.env.NEXT_DATOCMS_ENVIRONMENT,
    });
};
```

You can see that to build the right authentication header, we're using an environment variable prefixed by `NEXT_`. To create the API token for a DatoCMS project:

1. Go to the "Settings > API Tokens" section
2. Create a new token with permissions for:
    - Content Delivery API
    - Content Delivery API with draft content

Next.js > Next.js + DatoCMS Overview
Next.js + DatoCMS Overview
Next.js is an exceptional tool for building modern, universal frontend applications with the power of React. It lets you get started without having to write much boilerplate code and with a set of sane defaults upon which you can build.

Vercel is the easiest way to deploy a production-ready, highly available Next.js website, with static assets being served through the CDN automatically and built-in support for Next.js’ automatic static optimization and API routes.

DatoCMS is the perfect companion to Next.js since it offers content, images and videos on a globally-distributed CDN, much like Vercel does for the static assets of your website. With this combo, you can have an infinitely scalable website, ready to handle prime-time TV traffic spikes, at a fraction of the regular cost.

Still using the old Pages Router?
If you're still using the Pages Router — that is, the features available under /pages — please follow this documentation instead.

Project starters
Our marketplace features different demo projects on Next, so you can learn and get started easily:

Next.js Starter Kit
Try this demo »

✅
Official
Next 14
website template next.js
Marketing Website
Try this demo »

ecommerce template next.js
Ecommerce Website
Try this demo »

Tutorials
Our Community has also created many great video tutorials you can follow:

Next.js + Headless CMS + GraphQL - Next.js tutorial for beginners (part 2)
Next.js + DatoCMS tutorial for beginners
Play video »

Build a Dynamic Course Landing Page with Next.js, Tailwind CSS, and DatoCMS
Build a dynamic landing page with Next.js and Tailwind CSS
Play video »

Next.js On-Demand ISR // Full tutorial
How to use Next.js On-Demand ISR with DatoCMS webhooks
Play video »

Quick start
First, create a new Next.js application using create-next-app, which sets up everything automatically for you.

To create a project, run the following command and follow the wizard:

Terminal window
npx create-next-app@latest

Then enter the project directory and start the development server:

Terminal window
cd my-app
npm run dev

Fetching content from DatoCMS
When it comes to fetching data, Next recommends the following:

perform the fetch on the Server, to reduce the back-and-forth communication between client and server;

use Next.js fetch API, and call it whenever you need it, be it a layout, a page or a specific component.

Let's start by installing @datocms/cda-client, a lightweight, TypeScript-ready package that offers various helpers around the native Fetch API to perform GraphQL requests towards DatoCMS Content Delivery API:

Terminal window
npm install --save @datocms/cda-client

We can now create a function we can use in all of our components that need to fetch content from DatoCMS: Create a new directory called lib, and inside of it, add a file called datocms.js:

lib/datocms.js
import { executeQuery } from '@datocms/cda-client';

export const performRequest = (query, options) => {
return executeQuery(query, {
...options,
token: process.env.NEXT_DATOCMS_API_TOKEN,
environment: process.env.NEXT_DATOCMS_ENVIRONMENT,
});
}

### Enhanced Data Fetching

While the above function works for simple cases, we strongly suggest to take a look at the next section, where we cover more details about data fetching, and introduce a more flexible and optimized `performRequest()`.

You can see that to build the right authentication header, we're using an environment variable prefixed by `NEXT_`. To create the API token for a DatoCMS project:

1. Go to the "Settings > API Tokens" section
2. Create a new token with permissions for:
    - Content Delivery API
    - Content Delivery API with draft content

Next, go to `app/page.js` — that is, the component that renders the homepage of our project — define the GraphQL query to be executed, and in the component use the `performRequest()` function to perform the request:

```javscript
import { performRequest } from 'lib/datocms';

const PAGE_CONTENT_QUERY = `
  query Home {
    homepage {
      title
      description {
        value
      }
    }
  }`;

export default async function Home() {
  const { homepage } = await performRequest(PAGE_CONTENT_QUERY);

  // [...]
}
```

The `PAGE_CONTENT_QUERY` is the GraphQL query that will fetch data from your DatoCMS project. The specific fields and models available in the query will depend on how you've structured your content in DatoCMS.

To learn more about building GraphQL queries for DatoCMS, refer to their [Content Delivery API documentation](https://www.datocms.com/docs/content-delivery-api).
