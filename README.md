This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Production 
https://dcardv2.vercel.app/

簡介影片👇
https://user-images.githubusercontent.com/116002213/218897784-8b05d3a5-6ac7-4ad0-a32f-825e2ba7508b.mov

## Main Tool use
React ✖️ Next ✖️ Tailwind
Connect To Github Oauth 👉 NextAuth
Connect To Github GraphQL API 👉 Apollo Client

## Other package use
Infinite Scroll 👉 react-infinite-scroll-component
Dialog(Modal) Design 👉 Headless UI

## 困難
開發遇到最主要的困難：
  -用explorer時，原先是使用query + user + repo 去搜尋資料，做到Search Bar時才發現這樣沒有依內文搜尋的功能，
要用 query + search 才行，於是整個砍掉重做。
  -因為Next有 getServerSideProps, getStaticProps, getStaticPaths 的額外功能，原先是用getServerSideProps來
來資料，用 getStaticProps 和 getStaticPaths 來拿特定task的資料，但是server side 都無法將 useState 的 data傳
入，getSession（來拿到token）也不支援，於是改成全部都用 client-side + React Hook 來做。

## 參考
-Next Document 
-Stack Overflow
-DEV website
  
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
