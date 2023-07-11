import { readdirSync } from "fs";
import { NextPage } from "next";

// #19.12 getStaticPaths
/*
  - 동적인 라우트(동적인 URL)을 갖는 페이지에서 getStaticProps를 사용할 때 필요 (예: [id]/page.tsx - app dir / [id].tsx - page dir)
  - 동적 경로를 사용하는 페이지에서 getStaticPaths(정적 사이트 생성)라는 함수를 export할 때, getStaticPaths로 지정한 모든 경로를 정적으로 미리 렌더링
  - SSG (getStaticProps)와 함께 사용해야함 
  - SSR (getServerSideProps)와 함께 사용 불가
  - getStaticProps도 사용하는 동적 경로에서만 export 가능
 */

const Post: NextPage = () => {
  return <h1>hi</h1>;
};

export default Post;

export function getStaticPaths() {
  const files = readdirSync("./posts").map((file) => {
    const [name, extension] = file.split(".");
    return { params: { slug: name } };
  });
  return {
    paths: files,
    fallback: false,
  };
}
