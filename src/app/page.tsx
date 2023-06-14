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

const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-2  p-5 ">
      <p className="first-letter:text-7xl first-letter:hover:text-purple-400">
        Hello everyone!
      </p>
    </div>
  );
};

export default Home;
