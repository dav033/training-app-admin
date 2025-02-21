"use client";

import { roundItemProps, RoundExercise, RoundExerciseData } from "@/types";
import { useState, useEffect, SyntheticEvent, useCallback } from "react";
import RoundHeader from "./RoundHeader";
import ExerciseRound from "./ExerciseRound";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { RoundExerciseService } from "@/app/services/roundExerciseService";
import useDndItems from "@/hooks/useDndRounds";

export default function Round({
  roundData,
  deleteRound,
  exercises,
  addRoundExercise,
  removeRoundExercise,
  updateExerciseRoundRepetitions,
  ...rest
}: roundItemProps) {
  const [isOpen, setOpen] = useState(false);
  const [isOpenCreate, setOpenCreate] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [exerciseRounds, setExerciseRounds] = useState<RoundExerciseData[]>(
    roundData.roundExerciseData
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setExerciseRounds(roundData.roundExerciseData);
  }, [roundData.roundExerciseData]);

  const { sensors, sortedItems, handleDragEnd } = useDndItems<
    RoundExerciseData,
    RoundExercise
  >({
    items: exerciseRounds,
    setItems: setExerciseRounds,
    updateItems: async (items: RoundExercise[]) => {
      await RoundExerciseService.updateExerciseRoundList(items);
    },
    getId: (data: RoundExerciseData) => data.roundExercise.id,
    getPosition: (data: RoundExerciseData) => data.roundExercise.exercisePosition,
    setPosition: (data: RoundExerciseData, newPos: number) => {
      data.roundExercise.exercisePosition = newPos;
    },
    getUpdateValue: (data: RoundExerciseData) => data.roundExercise,
  });

  const onCloseCreate = useCallback(() => setOpenCreate(false), []);
  const onClose = useCallback(() => setOpen(false), []);
  const stopPropagation = useCallback((e: SyntheticEvent) => e.stopPropagation(), []);

  const hasExercises = exerciseRounds.length > 0;

  return (
    <div
      className="w-full flex items-center align-middle p-4 rounded bg-zinc-900 mb-2 border border-zinc-800 px-6 py-4 mt-4"
      {...rest}
    >
      <div className="w-full flex flex-col">
        <RoundHeader
          roundData={roundData}
          exercises={exercises}
          deleteRound={deleteRound}
          isOpenCreate={isOpenCreate}
          setOpenCreate={setOpenCreate}
          onClose={onClose}
          setOpen={setOpen}
          onCloseCreate={onCloseCreate}
          isOpen={isOpen}
          addRoundExercise={addRoundExercise}
          removeRoundExercise={removeRoundExercise}
        />

        <div
          onPointerDown={stopPropagation}
          onMouseDown={stopPropagation}
          onDragStart={stopPropagation}
        >
          {hasExercises ? (
            mounted && (
              <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <SortableContext
                  items={sortedItems.map((item) => item.roundExercise.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {sortedItems.map((roundExerciseData) => (
                    <ExerciseRound
                      key={roundExerciseData.roundExercise.id}
                      roundExerciseData={roundExerciseData}
                      removeRoundExercise={removeRoundExercise}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )
          ) : (
            <p className="text-zinc-500 text-sm text-center py-4">
              No hay ejercicios en esta ronda. Añade algunos para comenzar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
