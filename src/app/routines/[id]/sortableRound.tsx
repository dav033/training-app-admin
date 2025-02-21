"use client";

import { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableItemProps } from "@/types";
import Round from "./Round";

export default function SortableRound({
  id,
  round,
  deleteRound,
  exercises,
  addRoundExercise,
  removeRoundExercise,
  updateExerciseRoundRepetitions,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = useMemo(
    () => ({
      transform: CSS.Translate.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }),
    [transform, transition, isDragging]
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4 flex items-center"
    >
      <Round
        roundData={round}
        deleteRound={deleteRound}
        exercises={exercises}
        addRoundExercise={addRoundExercise}
        removeRoundExercise={removeRoundExercise}
        updateExerciseRoundRepetitions={updateExerciseRoundRepetitions}
      />
    </div>
  );
}
