"use client"

import { RoundData } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Round from "./Round";

interface SortableItemProps {
  id: number | string;
  round: RoundData;
  index: number;
  deleteRound: (id: number) => void;
}

export default function SortableRound({
  id,
  round,
  index,
  deleteRound,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="mb-4 flex items-center">
      <span className="w-24">Round {index + 1}</span>
      <Round
        roundData={round}
        deleteRound={deleteRound}
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      />
    </div>
  );
}
