"use client";

import { roundItemProps, RoundExercise, RoundExerciseData } from "@/types";
import { useState, useEffect, SyntheticEvent, useCallback, useMemo } from "react";
import RoundHeader from "./RoundHeader";
import ExerciseRound from "./ExerciseRound";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import useDndItems from "@/hooks/useDndRounds";

export default function Round({
  roundData,
  deleteRound,
  exercises,
  addRoundExercise,
  removeRoundExercise,
  updateExerciseRoundRepetitions,
  onPositionsChange,
  ...rest
}: roundItemProps) {
  const [isOpen, setOpen] = useState(false);
  const [isOpenCreate, setOpenCreate] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [exerciseRounds, setExerciseRounds] = useState<RoundExerciseData[]>(
    roundData.roundExerciseData
  );

  // Marcar que el componente se ha montado (solo en cliente)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Actualizar el estado local cuando cambian los datos de la ronda
  useEffect(() => {
    setExerciseRounds(roundData.roundExerciseData);
  }, [roundData.roundExerciseData]);

  // Callback memorizado para actualizar posiciones
  const updateItemsCallback = useCallback(async (items: RoundExercise[]) => {
    console.log("Se actualizarían los siguientes items localmente:", items);
    if (typeof onPositionsChange === "function") {
      onPositionsChange();
    }
  }, [onPositionsChange]);

  // Funciones helper para useDndItems
  const getId = useCallback(
    (data: RoundExerciseData) => data.roundExercise.id,
    []
  );
  const getPosition = useCallback(
    (data: RoundExerciseData) => data.roundExercise.exercisePosition,
    []
  );
  const setPosition = useCallback(
    (data: RoundExerciseData, newPos: number) => {
      data.roundExercise.exercisePosition = newPos;
    },
    []
  );
  const getUpdateValue = useCallback(
    (data: RoundExerciseData) => data.roundExercise,
    []
  );

  // Uso del hook personalizado para drag & drop
  const { sensors, sortedItems, handleDragEnd } = useDndItems<
    RoundExerciseData,
    RoundExercise
  >({
    items: exerciseRounds,
    setItems: setExerciseRounds,
    updateItems: updateItemsCallback,
    getId,
    getPosition,
    setPosition,
    getUpdateValue,
  });

  const onCloseCreate = useCallback(() => setOpenCreate(false), []);
  const onClose = useCallback(() => setOpen(false), []);
  const stopPropagation = useCallback(
    (e: SyntheticEvent) => e.stopPropagation(),
    []
  );

  const hasExercises = exerciseRounds.length > 0;
  const sortedIds = useMemo(
    () => sortedItems.map((item) => item.roundExercise.id),
    [sortedItems]
  );

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
                <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
                  {sortedItems.map((roundExerciseData) => (
                    <ExerciseRound
                      key={roundExerciseData.roundExercise.id}
                      roundExerciseData={roundExerciseData}
                      removeRoundExercise={removeRoundExercise}
                      updateExerciseRoundRepetitions={updateExerciseRoundRepetitions}
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
