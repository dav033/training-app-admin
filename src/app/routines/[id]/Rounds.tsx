"use client";

import { closestCenter, DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableRound from "./sortableRound";
import { Round, RoundData, RoundsProps } from "@/types";
import { RoundService } from "@/app/services/RoundService";
import useDndItems from "@/hooks/useDndRounds";

export default function Rounds({
  rounds,
  setRounds,
  deleteRound,
  exercises,
  addRoundExercise,
  removeRoundExercise,
  updateExerciseRoundRepetitions,
}: RoundsProps) {
  const { sensors, sortedItems, handleDragEnd } = useDndItems<RoundData, Round>({
    items: rounds,
    setItems: setRounds,
    updateItems: RoundService.updateRoundList,
    getId: (roundData) => roundData.round.id,
    getPosition: (roundData) => roundData.round.roundPosition,
    setPosition: (roundData, newPos) => {
      roundData.round.roundPosition = newPos;
    },
    getUpdateValue: (roundData) => roundData.round, // Mapea RoundData a Round
  });

  return (
    <div className="px-36 rounded-lg my-8">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortedItems.map((r) => r.round.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedItems.map((roundData, index) => (
            <SortableRound
              key={roundData.round.id}
              id={roundData.round.id}
              round={roundData}
              deleteRound={deleteRound}
              exercises={exercises}
              addRoundExercise={addRoundExercise}
              removeRoundExercise={removeRoundExercise}
              updateExerciseRoundRepetitions={updateExerciseRoundRepetitions}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
