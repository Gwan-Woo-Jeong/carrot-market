import { User } from "@prisma/client";
import useSWR from "swr";

/*
  #10.3 SWR
  Next.js 팀이 만든 React Data Fetching 라이브러리
  먼저 캐시로부터 데이터를 반환한 후, fetch 요청(재검증)을 하고, 최종적으로 최신화된 데이터를 가져옴
  컴포넌트가 자동으로 데이터 변경을 자동으로 감지, 이에 따라 UI를 빠르게 변경

  npm i swr

  사용법
  1. 네이티브 fetch의 단순한 래퍼인 fetcher 함수를 생성
  ex) const fetcher = (...args) => fetch(...args).then(res => res.json())

  2. useSWR을 import하고, 함수 컴포넌트 내에서 사용
  ex) const { data, error } = useSWR('/api/user/123', fetcher)

  일반적으로, 세 가지 요청 상태가 가능: 
  "loading", "ready", "error". data와 error 값을 사용해 현재 요청의 상태를 알아내고, 해당하는 UI를 반환
 */

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>("/api/users/me");

  return { user: data?.profile, isLoading: !data && !error };
}
