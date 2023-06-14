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

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-20 grid gap-10 min-h-screen">
      <div className="bg-white p-6 rounded-3xl shadow-xl">
        <span className="font-semibold text-2xl">Select Item</span>
        <div className="flex justify-between my-2">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold">$19</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold">$19</span>
        </div>
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <div
          className="mt-5 bg-blue-500 text-white p-3
          text-center rounded-xl w-3/4 mx-auto
         "
        >
          Checkout
        </div>
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
            <div>
              <input type="radio" />
              <input type="radio" />
              <input type="radio" />
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
