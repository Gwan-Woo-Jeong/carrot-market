import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/*
  #10.2 useUser Hook
  router.push() : 이전 페이지에 대한 히스토리를 남김
  router.replace() : 남기지 않음 (히스토리 스택에 새 URL 추가 방지)
 */

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          return router.replace("/enter");
        }
        setUser(data.profile);
      });
  }, []);

  return user;
}
