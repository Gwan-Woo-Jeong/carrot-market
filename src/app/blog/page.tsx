import Layout from "@/components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import Link from "next/link";

// #19.10 getStaticProps
/*
   - 항상 서버에서 실행되고 클라이언트에서는 실행 X 
   - 정적 HTML을 생성하므로 들어오는 request(예: 쿼리 매개변수 또는 HTTP 헤더)에 액세스할 수 없음
   - SSG 페이지가 빌드 시 미리 렌더링되면 페이지 HTML 파일 외 실행 결과를 포함하는 JSON 파일을 생성

    gray-matter
    문자열 또는 파일에서 front-matter을 파싱

    SSR (getServerSideProps) : 유저의 요청이 발생할 때마다 일어남
    SSG (getStaticProps) : 페이지가 빌드되고, nextjs가 해당 페이지를 export 한 후 일반 html로 될 때, 딱 한 번만 실행됨
 */

interface Post {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const getPosts = () => {
  // 디렉토리의 내용을 읽음
  return readdirSync("posts/").map((file) => {
    const content = readFileSync(`posts/${file}`, "utf-8"); // path의 내용을 반환
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug } as Post;
  });
};

const posts = getPosts().reverse();

export default function Blog() {
  return (
    <Layout title="Blog" seoTitle="Blog">
      <h1 className="font-semibold text-center text-xl mt-5 mb-10">
        Latest Posts:
      </h1>
      {posts.map((post, index) => (
        <div key={index} className="mb-5">
          <Link href={`/blog/${post.slug}`}>
            <span className="text-lg text-red-500">{post.title}</span>
            <div>
              <span>
                {post.date} / {post.category}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </Layout>
  );
}
