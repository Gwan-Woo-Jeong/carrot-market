import type { NextPage } from "next";

/*
    # 4.1 Test Drive part One

    bg-색상이름-채도 : 백그라운드 컬러 설정
    p-크기 : padding
    px(y)-크기 : 가로(x축) 세로(y축) padding

    * 크기 : 단위가 rem이다 (rem은 document의 폰트 사이즈 기준 - 브라우저마다 다를 수 있음) 따라서, rem을 사용하면 반응형 디자인을 하기 용이
    
    rounded-크기: border-radius 크기(s,m,l,xl...)
    
    자동완성이 뜨지 않는 경우 : win - ctrl + space / mac - command + i 

    (helper funciton : 하나의 CSS 속성이 아닌 하나의 function을 실행하여 CSS 설정을 쉽게 해줌)
    space-방향-크기 : 요소 사이의 margin을 준다

    절대 크기가 아닌 상대 크기로 설정이 가능하다. ex) w-2/4 = width : 50%

    (+) Tailwind를 Styled Component와 같이 사용하기
    https://www.npmjs.com/package/tailwind-styled-components
  */

/*
    # 4.2 Test Drive part Two
    relative = position : relative
    요소의 상대적인 위치로 위치 조정 가능

    음수 값 설정 가능
    ex ) -mt-10 = margin-top : -2.5rem

    동그라미 만들기
    h-24  w-24 rounded-full = border-radius : 99999px 
  */

/*
    # 4.3 Test Drive part Three
    space-x = margin-left + margin-right (자식 요소들의 크기를 계산하여 좌우 margin을 줌)
    aspect-square = aspect-ratio: 1 / 1 (정사각형 비율로 맞춰줌)
    aspect-video =	aspect-ratio: 16 / 9 (16:9 비디오 화면 비율로 맞춰줌)
*/

/*
  # 4.4 Modifiers
   Modifier (해당 동작을 했을 시): CSS 속성 (변화)

   예시 )
   hover:bg-teal-500 hover:text-black
   (마우스를 올렸을 때, 해당 색상으로 요소가 변함)

  (+)
  Tailwind가 기본적으로 포함하는 단일 Modifier 목록
  (~일 때, CSS 속성 적용)
  
  hover (&:hover)
  focus (&:focus)
  active (&:active)
  first (&:first-child)
  disabled (&:disabled)
  sm (@media (min-width: 640px))
  md ( @media (min-width: 768px))
  lg (@media (min-width: 1024px))
  dark (@media (prefers-color-scheme: dark))
 */

/*
  # 4.5 Transitions
  ring : 요소 주위로 shadow를 링 모양으로 설정 (offset으로 간격 설정 가능)

  Modifier를 설정하면 해당 요소를 변수로 처리하기 때문에, 다른 CSS까지 modifier를 붙일 필요없다.
  
  transition : 한 요소의 CSS 속성에 변화하는 애니메이션 효과를 줄 수 있음
  transition-none	: 효과 주지 않기

  transition-all : 모든 효과 주기	
치
  transition-colors : 색상 효과	
  transition-opacity : 투명도 효과
  transition-shadow	: 그림자 효과
  transition-transform : 위치 효과

  하나의 클래스 이름을 주는 것만으로 완성된 transition 효과를 줄 수 있다
  ex ) transition-color는 다음과 같은 css 속성들을 한 번에 적용시킴
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
 */

/*
  # 4.6 Modifiers for Lists
  데이터 목록을 map을 통해 리스트 형태로 보여줄 때, 유용하게 쓰이는 modifier (selector)

  first: - 목록의 첫 번째 요소
  last: - 목록의 마지막 요소
  only: - 유일한 자식 요소
  odd: - 홀수 번째 요소 
  even: - 짝수 번째 요소

  empty (Tailwind 기능 X, CSS selector)
  empty modifier를 사용하여 콘텐츠가 없는 경우 스타일을 지정
  콘텐츠가 없는 경우 = 빈 텍스트, undefined, null등과 같이 값이 없을 때
  (+) empty:hidden은 display: none과 같음
 */

/*
  #4.7 Modifiers for Forms 
  group
  상위(부모) 요소와 상호작용 했을 때, 스타일을 지정
  일부 부모 요소의 상태를 기반으로 요소의 스타일을 변경하는 경우 부모 클래스에 group을 표시한 후
  group-hover와 같은 group-* 수정자를 사용하여 대상 요소의 스타일을 지정
  (+) group-focus, group-active, group-odd와 같은 모든 유사 클래스 수정자와 함께 작동함

  ** 아래 modifier들은 Tailwind 기능 X, 일반 CSS selector
  focus-within: 
  form 태그 내의 인풋이 focus 될 때, 스타일 지정

  required: 
  form 태그 내의 필수 입력 인풋에게 스타일 지정

  invalid: 
  form 태그 내의 인풋의 값이 없을 때, 스타일 지정 (<-> valid : 값이 있을 때)

  placeholder-shown: 
  form 태그 내의 인풋의 placeholder가 보여질 때, 스타일 지정

  placeholder: 
  form 태그 내의 인풋의 placeholder에게 스타일 지정

  peer 
  형제 요소와 상호작용 했을 때, 스타일 지정
  형제 요소의 상태를 기반으로 요소의 스타일을 지정해야 하는 경우 형제 클래스에 peer를 표시하고 
  peer-invalid와 같은 peer-* 수정자를 사용하여 대상 요소의 스타일을 지정 
  (+) peer-focus, peer-required, peer-disabled와 같은 모든 유사 클래스 수정자와 함께 작동함
  
  ex) 
  < input class="peer"/ >
  < p class="peer-invalid:visible">Please fill in</p>
 */

/*
  #4.8 More Modifiers
  details
  details 태그는 "열림" 상태일 때만 내부 정보를 보여주는 위젯을 생성함 
  요약이나 레이블은 summary 태그로 보여줄 수 있었는데 레이블 옆의 작은 삼각형이 돌아가면서 열림/닫힘 상태를 나타냈다.
  details 요소의 첫 번째 자식이 summary 요소라면, summary의 콘텐츠를 위젯의 레이블로 사용한다.

  ex)
  < details>
  < summary>Details
  Something small enough to escape casual notice.
  < /details>

  ** 아래 modifier들은 Tailwind 기능 X, 일반 CSS selector
  open:
  summary가 열렸을 때 스타일 지정

  selection:
  텍스트를 커서로 드래그 했을 때 스타일을 지정

  list-보여줄 목록 형태:
  - decimal : 숫자 ex) 1.\
  - disc : 점
  
  marker:
  위 리스트 표시에 스타일을 지정

  first-letter:
  콘텐츠 텍스트의 첫 번째 글자에 스타일을 지정

  File input buttons
  파일 수정자를 사용하여 파일 입력의 버튼 스타일 지정
  ex) file:mr-4 file:py-2 file:px-4

  ::file-selector-button
  ::file-selector-button CSS 의사 요소는 type="file"의 input 버튼을 나타냄
  ex) input[type=file]::file-selector-button

  modifier는 중첩이 가능함
  ex) file:hover:text-purple-400 
  = 파일 입력 버튼 위에 커서를 올렸을 때, 텍스트 색상을 보라색으로 적용
*/

/*
  #4.9 Responsive Modifiers
  보통 데스크탑 -> 모바일 반응형 적용
  Tailwind는 반대 모바일로 만든 후, 큰 화면을 위한 (데스크탑) modifier를 적용
  = Mobile First

  기본적으로 Tailwind는 Bootstrap과 같은 다른 프레임워크에서 사용하는 것과 유사한 모바일 우선 breakpoint 시스템을 사용
  즉, 접두사가 붙지 않은 유틸리티는 모든 화면 크기에 적용되는 반면 
  접두사가 붙은 유틸리티(ex. uppercase)는 지정된 breakpoint 이상에서만 적용

  모바일용 CSS는 접두사가 없음. 사이즈는 다음과 같음.
  모바일 -> sm(작은 화면, 모바일 X) -> md(중간 화면) -> lg(큰 화면) -> xl -> 2xl 

  실제 픽셀 사이즈
  sm 640px @media (min-width: 640px) { ... }
  md 768px @media (min-width: 768px) { ... }
  lg 1024px @media (min-width: 1024px) { ... }
  xl 1280px @media (min-width: 1280px) { ... }
  2xl 1536px @media (min-width: 1536px) { ... }
*/

/*

/*
  #4.11 Dark Mode

  dark 모드가 활성화되어 있을 때 사이트 스타일을 다르게 지정
  현재 사용 중인 컴퓨터에서 설정한 라이트/다크 모드에 따라 dark가 자동으로 적용

  ex) dark:bg-slate-900

  수동으로 다크 모드 전환
  기본 설정 대신 수동으로 다크 모드로 전환하려면 media 대신 class을 사용

  tailwind.config.js에서 다음과 같이 설정
  module.exports = {
  // 클래스를 기준으로 다크모드 적용 (최상위 부모에 dark 클래스 지정)
  darkMode: 'class',

  // @media(prefers-color-scheme)를 기준으로 다크모드 적용 (기본 값)
  darkMode: "media",
  }

  prefers-color-scheme
  사용자의 시스템이 라이트나 다크 테마를 사용하는지 탐지하는 데에 사용

  ex)
  @media (prefers-color-scheme: light) {
    .themed {
    background: white;
    color: black;
    }
  }

*/

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 xl:place-content-center py-20 px-20 grid gap-10 lg:grid-cols-2 xl:grid-cols-3 min-h-screen">
      <div className="bg-white dark:bg-black flex flex-col justify-between p-6 rounded-3xl shadow-xl">
        <span className="font-semibold dark:text-white text-2xl">
          Select Item
        </span>
        <ul>
          <div className="flex justify-between my-2 ">
            <span className="text-gray-500 dark:text-gray-100">Grey Chair</span>
            <span className="font-semibold dark:text-white">$19</span>
          </div>
          <div className="flex justify-between my-2 ">
            <span className="text-gray-500 dark:text-gray-100">Grey Chair</span>
            <span className="font-semibold dark:text-white">$19</span>
          </div>
        </ul>

        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <button
          className="mt-5 bg-blue-500 dark:bg-black dark:border-white dark:border text-white p-3
          text-center rounded-xl w-3/4 block mx-auto 
          dark:hover:bg-white hover:bg-teal-500 hover:text-black 
          active:bg-yellow-500 focus:bg-red-500
          "
        >
          Checkout
        </button>
      </div>
      <div className="bg-white overflow-hidden rounded-3xl shadow-xl group">
        <div className="portrait:bg-indigo-600 landscape:bg-teal-500 p-6 pb-14 xl:pb-40">
          <span className="text-white text-2xl">Profile</span>
        </div>
        <div className="rounded-3xl p-6 bg-white relative -top-5">
          <div className="flex relative -top-16 items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 bg-zinc-300 rounded-full group-hover:bg-red-300 transition-colors" />
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500">Spent</span>
              <span className="font-medium">$340</span>
            </div>
          </div>
          <div className="relative  flex flex-col items-center -mt-14 -mb-5">
            <span className="text-lg font-medium">Tony Molloy</span>
            <span className="text-sm text-gray-500">미국</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-xl lg:col-span-2 xl:col-span-1">
        <div className="flex mb-5 justify-between items-center">
          <span>⬅️</span>
          <div className="space-x-3">
            <span>⭐️ 4.9</span>
            <span className="shadow-xl p-2 rounded-md">💖</span>
          </div>
        </div>
        <div className="bg-zinc-400 h-72 mb-5" />
        <div className="flex flex-col">
          <span className="font-medium text-xl">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex justify-between items-center">
            <div className="space-x-2">
              <button className="w-5 h-5 rounded-full bg-yellow-500 focus:ring-2 ring-offset-2 ring-yellow-500 transition" />
              <button className="w-5 h-5 rounded-full bg-indigo-500 focus:ring-2 ring-offset-2 ring-indigo-500 transition" />
              <button className="w-5 h-5 rounded-full bg-teal-500 focus:ring-2 ring-offset-2 ring-teal-500 transition" />
            </div>
            <div className="flex items-center space-x-5">
              <button className=" rounded-lg bg-blue-200 flex justify-center items-center aspect-square w-8 text-xl text-gray-500">
                -
              </button>
              <span>1</span>
              <button className=" rounded-lg bg-blue-200 flex justify-center items-center aspect-square w-8 text-xl text-gray-500">
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-2xl">$450</span>
            <button className="bg-blue-500 py-2 px-8 text-center text-xs text-white rounded-lg">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
