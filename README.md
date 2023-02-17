This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Production 
https://dcardv2.vercel.app/

Screen Record👇

https://user-images.githubusercontent.com/116002213/218897784-8b05d3a5-6ac7-4ad0-a32f-825e2ba7508b.mov

## ToolBox
- Framework: 
  - React: 很常使用useState, useEffect 等等 React Hook
  - Next: 原本使用SSR，但SSR不支援 useSession，也不能傳入 useState data ，所以最後還是改成client side。
- Platform: 
  - Vercel: deploy
- Package: 
  - Tailwind: css
  - NextAuth: getting token, wrap the app inside the sessionProvider
  - Apollo Client: sending query or mutation request to github graphql explorer api(client is in the `apollo-client.js` file)
  - Headless UI: Dialog(Modal) Design
  - Infinite Scroll: used as a component, called fetchMoreData() when more data need to be fetch. 

## Components Detail/Structure

![Structure Tree](/public/Tree.svg)

![Detail Image](/public/Explanation.svg)



## Flow
1. [Oauth] 先到 github 申請 oauth app，再使用 NextAuth 處理 login, logout，在 `src/_app.tsx` 中用

SessioinProvider 把 app 包住（才可以使用session）， 再將 client 放在 root directory 的

`apollo-client.js`，使用時用 import 即可。

2. [GET] 在 `src/index.js`, `src/pages/tasks/[taskSlug].tsx` 和 `src/components/SearchBar` 皆有

使用 client.query 來拿資料。

3. [MUTATION] 在 `src/pages/tasks/[taskSlug].tsx` 用 client.mutation 來刪除特定 task ，在 

`src/components/Modal` 用來更新和創造新 task 。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
