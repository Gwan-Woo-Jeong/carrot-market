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

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-20 grid gap-10 min-h-screen">
      <div className="bg-white p-6 rounded-3xl shadow-xl">
        <span className="font-semibold text-2xl">Select Item</span>
        <ul>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex justify-between my-2 odd:bg-blue-50 even:bg-yellow-50 first:bg-teal-50 last:bg-amber-50"
            >
              <span className="text-gray-500">Grey Chair</span>
              <span className="font-semibold">$19</span>
            </div>
          ))}
        </ul>
        <ul>
          {["a", "b", "c", ""].map((c, i) => (
            <li className="bg-red-500 py-2 empty:hidden" key={i}>
              {c}
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <button
          className="mt-5 bg-blue-500 text-white p-3
          text-center rounded-xl w-3/4 block mx-auto 
          hover:bg-teal-500 hover:text-black
          active:bg-yellow-500 focus:bg-red-500
          "
        >
          Checkout
        </button>
      </div>
      <div className="bg-white overflow-hidden rounded-3xl shadow-xl">
        <div className="bg-blue-500 p-6 pb-14">
          <span className="text-white text-2xl">Profile</span>
        </div>
        <div className="rounded-3xl p-6 bg-white relative -top-5">
          <div className="flex relative -top-16 items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 bg-zinc-300 rounded-full" />
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
      <div className="bg-white p-6 rounded-3xl shadow-xl">
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
