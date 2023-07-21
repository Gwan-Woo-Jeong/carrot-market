"use client";

import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

interface UseMutationOptions {
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  onSuccess?: () => void;
  onFailure?: () => void;
}

/*
    8.2 -8.3 : Clean Code

    앱 내의 POST 요청을 쉽게 구현해주는 React Hook
    url을 인자로 받아, POST 요청을 한 후 응답으로 받은 데이터를 리턴 
 */

export default function useMutation<T = any>(
  url: string,
  options?: UseMutationOptions
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: options?.method || "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => {
        setState((prev) => ({ ...prev, data }));
        if (options?.onSuccess) options.onSuccess();
      })
      .catch((error) => {
        setState((prev) => ({ ...prev, error }));
        if (options?.onFailure) options.onFailure();
      })
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }

  return [mutation, { ...state }];
}
