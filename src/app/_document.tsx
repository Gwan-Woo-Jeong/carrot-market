/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-document-import-in-page */

import Document, { Head, Html, Main, NextScript } from "next/document";

// #19.4 _document and Fonts
/*
    - 페이지를 랜더링하는 데 사용되는 html 및 body 태그를 업데이트
    - 서버에서만 랜더링되므로 onClick과 같은 이벤트 핸들러는 _document에서 사용할 수 없음
    - Html, Head, Main 및 NextScript는 페이지가 제대로 랜더링되는 데 필요
    - _document는 서버에서 Next 앱의 HTML 뼈대를 만드는 역할을 함. 고로, 서버 사이드에서 한번만 실행

    폰트 최적화
    - 서버에서 HTML 파일 빌드 시, link로 연결된 구글폰트 주소로부터 폰트를 다운받아 CSS를 생성 (구글 폰트만 가능)
    - 로딩 시간이 획기적으로 감소

 */

class CustomDocument extends Document {
  render(): JSX.Element {
    console.log("DOCUMENT IS RUNNING");
    return (
      <Html lang="ko">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
