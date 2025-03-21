"use client";

import { DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useCallback, useMemo } from "react";
import SortableRound from "./sortableRound";
import { RoundData } from "@/types";
import useDndItems from "@/hooks/useDndRounds";

export interface RoundsPropsExtended {
  rounds: RoundData[];
  setRounds: (rounds: RoundData[]) => void;
  deleteRound: (id: number) => void;
  exercises: any[]; // o el tipo correspondiente
  addRoundExercise: (roundExercise: any, exercise: any) => void;
  removeRoundExercise: (roundExerciseId: number) => void;
  updateExerciseRoundRepetitions: (roundExerciseId: number, repetitions: number) => void;
  onPositionsChange?: () => void;
}

export default function Rounds({
  rounds,
  setRounds,
  deleteRound,
  exercises,
  addRoundExercise,
  removeRoundExercise,
  updateExerciseRoundRepetitions,
  onPositionsChange,
}: RoundsPropsExtended) {
  // Memorizamos el callback para actualizar la posición de los items
  const updateItemsCallback = useCallback(async (items: any[]) => {
    if (onPositionsChange) onPositionsChange();
  }, [onPositionsChange]);

  // Funciones para obtener y actualizar datos del item
  const getId = useCallback((item: RoundData) => item.round.id, []);
  const getPosition = useCallback((item: RoundData) => item.round.roundPosition, []);
  const setPosition = useCallback((item: RoundData, newPosition: number) => {
    item.round.roundPosition = newPosition;
  }, []);
  const getUpdateValue = useCallback((item: RoundData) => item.round, []);

  // Uso del hook personalizado para drag and drop
  const { sensors, sortedItems, handleDragEnd } = useDndItems<RoundData, any>({
    items: rounds,
    setItems: setRounds,
    updateItems: updateItemsCallback,
    getId,
    getPosition,
    setPosition,
    getUpdateValue,
  });

  // Memorizamos la lista de IDs para el SortableContext
  const sortedIds = useMemo(() => sortedItems.map((r) => r.round.id), [sortedItems]);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {sortedItems.map((roundData) => (
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
  );
}
