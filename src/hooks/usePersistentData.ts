"use client";

import { useState } from "react";

export function usePersistentData<T>(key: string, initialData: T[]) {
  const getInitialData = () => {
    if (typeof window === "undefined") return initialData;

    const stored = localStorage.getItem(key);
    if (!stored) {
      return initialData;
    }

    try {
      return JSON.parse(stored) as T[];
    } catch {
      return initialData;
    }
  };

  const [data, setData] = useState<T[]>(getInitialData);

  const addItem = (item: any) => {
    const newData = [item, ...data];
    setData(newData);
    localStorage.setItem(key, JSON.stringify(newData));
  };

  const removeItem = (id: string) => {
    const newData = data.filter((item: any) => item.id !== id);
    setData(newData);
    localStorage.setItem(key, JSON.stringify(newData));
  };

  return { data, addItem, removeItem, setData, loading: false };
}
