This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Introduction
這是一份 Dcard 出的 frontend intern homework，原先想來拿當練習的題目增進前端的能力，剛開始寫的時候還沒有把握
是否可以完成，在撰寫的過程中需要花很多心力思考，不過我覺得最重要的是 user experience，像是在 update 的部分我
一直希望可以把更新前的資料放在更新的欄位之中，使用者就不需要完全重打內容，但有點可惜一直做不到這點，最後是用 
placeholder 取代。

網址在這～https://dcardv2.vercel.app/

! [須擁有 github 帳號](https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home)

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



