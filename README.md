This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Introduction
這是一份 Dcard 的 frontend intern homework，原先想來拿當練習的題目增進自己的能力，剛開始寫的時候原本還沒有把握
是否可以順利完成，開始寫時才覺得其實也沒有那麼困難（功能的部分），不過想要寫出一個幾乎完美的網頁還是有一定的難度，像
是原先使用 Next 提供的 SSR（可 SEO），但為了配合 useSession 和傳入 useState，只能改回 Client side。不過在撰寫的過程中學習到很多實用的技巧，花時間寫完這份作業十分值得。

[作業資訊](https://drive.google.com/file/d/1ZlwuUafAQUKBEA_ZK6ShM5F4xLTkV_4X/view)

網址-https://dcardv2.vercel.app/

[warning! 須擁有 github 帳號](https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home)

## ToolBox
- Framework: 
  - React: 使用useState, useEffect 等等 React Hook
  - Next: 原本使用SSR，但SSR不支援 useSession，也不能傳入 useState data ，所以最後還是改成client side。
- Platform: 
  - Vercel: deploy
- Package: 
  - Tailwind: css
  - NextAuth: getting token, wrap the app inside the sessionProvider
  - Apollo Client: sending query or mutation request to github graphql explorer api(client is in the `apollo-client.js` file)
  - Headless UI: Dialog(Modal) Design
  - Infinite Scroll: used as a component, called fetchMoreData() when more data need to be fetch. 

## SEO
新增`public/robots.txt`, `public/sitemap.xml`

![search on google](/public/onGoogle.svg)

## Components Detail/Structure

![Detail Image](/public/Explanation.svg)



