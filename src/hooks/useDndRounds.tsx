// src/hooks/useDndItems.ts
"use client";

import { useEffect, useRef } from "react";
import {
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { UseDndItemsParams } from "@/types";

export default function useDndItems<T, U>({
  items,
  setItems,
  updateItems,
  getId,
  getPosition,
  setPosition,
  getUpdateValue,
}: UseDndItemsParams<T, U>) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const sortedItems = [...items].sort(
    (a, b) => getPosition(a) - getPosition(b)
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const sorted = [...items].sort((a, b) => getPosition(a) - getPosition(b));
      const oldIndex = sorted.findIndex((item) => getId(item) === active.id);
      const newIndex = sorted.findIndex((item) => getId(item) === over.id);
      const newSortedItems = arrayMove(sorted, oldIndex, newIndex);

      newSortedItems.forEach((item, index) => {
        setPosition(item, index + 1);
      });

      setItems(newSortedItems);
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      const itemsToUpdate = items.map(getUpdateValue);
      console.log("Updating items", itemsToUpdate);
      await updateItems(itemsToUpdate);
    }, 5000);
  };

  return { sensors, sortedItems, handleDragEnd };
}
