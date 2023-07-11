import Layout from "@/components/layout";
import { readdirSync } from "fs";
import matter from "gray-matter";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse/lib";
import { unified } from "unified";

// #19.12 getStaticPaths
/*
  - 동적인 라우트(동적인 URL)을 갖는 페이지에서 getStaticProps를 사용할 때 필요 (예: [id]/page.tsx - app dir / [id].tsx - page dir)
  - 동적 경로를 사용하는 페이지에서 getStaticPaths(정적 사이트 생성)라는 함수를 export할 때, getStaticPaths로 지정한 모든 경로를 정적으로 미리 렌더링
  - SSG (getStaticProps)와 함께 사용해야함 
  - SSR (getServerSideProps)와 함께 사용 불가
  - getStaticProps도 사용하는 동적 경로에서만 export 가능
 */

// #19.13 Dynamic getStaticProps
/*
  matter.read(filepath, options)
  - 파일 시스템에서 파일을 동기적으로 읽고 front matter를 파싱
  - matter()와 동일한 객체를 반환
  - filepath에 읽을 파일의 경로를 지정
  ex) const file = matter.read('./content/blog-post.md');

  remark-html
  - HTML serializing 지원을 추가하는 remark 플러그인
 */

// #19.14 Inner HTML
/*
  dangerouslySetInnerHTML
  - 브라우저 DOM에서 innerHTML을 사용하기 위한 React의 대체 방법
  - 일반적으로 코드에서 HTML을 설정하는 것은 사이트 간 스크립팅 공격에 쉽게 노출될 수 있기 때문에 위험
*/

interface PostProps {
  params: {
    slug: string;
  };
}

const Post = async ({ params: { slug } }: PostProps) => {
  const { content, data } = matter.read(`posts/${slug}.md`);
  const { value } = await unified()
    .use(remarkParse as any)
    .use(remarkHtml as any)
    .process(content);

  return (
    <Layout title={data.title} seoTitle={data.title}>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    </Layout>
  );
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
