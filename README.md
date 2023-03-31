## Project
[網址](https://dcardv2.vercel.app/)

這是一份迪卡的前端實習作業，大約從寒假開始寫，從選擇工具，到一步步想出解決問題的辦法，最後再修改掉一些警告跟錯誤，
讓我收穫到許多以前不會的技巧。我選擇用React + Next + Tailwind css來做，因為在學期間有參與一個開發者社團(GDSC)，
當時我們有一起寫一個專案就是用Vue + Nuxt + Tailwind css，想說就用類似的架構，tailwind css也已經算熟悉了，不
過還有登入、取得 token 的部分都是由 NextAuth 來完成，還有接 api 的部分是由 apollo client 來幫忙。


## Tool🌱
- React
- Next
- Tailwind
- NextAuth
- Apollo Client
- React-infinite-scroll
- Eslint
- Sentry

## Structure
![Home Image](/public/Home.svg)

![Detail Image](/public/Detail.svg)

![Modal Image](/public/Other.svg)

## 另一種infinite scroll

```
const listRef = useRef();

  useEffect(() => {
    if(session){
      window.addEventListener('scroll', onScroll);

      function onScroll() {
        if(listRef.current) {
          const { clientHeight } = listRef.current;
          if(window.scrollY + window.innerHeight > clientHeight) {
            setHasMore(true)
          }
        }
      };
    }

  }, [data])

  useEffect(() => {
    getMoreData(hasMore);
    setHasMore(false);
  }, [hasMore])
```





