import { useState, useEffect } from "react";

const KEY = "watchlist";

export function useWatchlist() {
  const [items, setItems] = useState(() => {
    try {
      // Now stores an array of objects: [{ id: 123, type: 'movie' }, ...]
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  // 'has' and 'remove' still work with just the ID
  const has = (id) => items.some((item) => item.id === id);
  const remove = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  // 'add' now accepts an object with id and type
  const add = (newItem) => {
    setItems((currentItems) => {
      // Prevent duplicates
      if (has(newItem.id)) {
        return currentItems;
      }
      return [...currentItems, newItem];
    });
  };

  return { items, has, add, remove };
}
