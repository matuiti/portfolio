"use client";

import { useSyncExternalStore } from "react";

// 空の関数
const subscribe = () => () => {};

export function useIsMounted() {
  // サーバーサイドでは false、クライアントサイドでは true を返す
  return useSyncExternalStore(
    subscribe,
    () => true, // クライアント側
    () => false, // サーバー側
  );
}
