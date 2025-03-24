"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RoundExerciseData, roundExercisType } from "@/types";
import Image from "next/image";
import image from "../../../../public/ejercicios-basicos-de-gimnasio.webp";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import EditRepetitionsTime from "./EditRepetitionsTime";

interface ExerciseRoundProps {
  roundExerciseData: RoundExerciseData;
  removeRoundExercise: (id: number) => void;
  updateExerciseRoundRepetitions: (
    roundExerciseId: number,
    repetitions: number
  ) => void;
}

function ExerciseRound({
  roundExerciseData,
  removeRoundExercise,
  updateExerciseRoundRepetitions,
}: ExerciseRoundProps) {
  const {
    roundExercise: { id, repetitions, roundExerciseType, time },
    exercise: { name },
  } = roundExerciseData;

  // Valores por defecto si son null o undefined
  const initialType = roundExerciseType ?? roundExercisType.REPS;
  const initialReps = repetitions && repetitions !== "" ? repetitions : "12";
  const initialTime = time ?? 60;

  const [currentType, setCurrentType] = useState<roundExercisType>(initialType);
  const [currentReps, setCurrentReps] = useState<string>(initialReps);
  const [currentTime, setCurrentTime] = useState<number>(initialTime);

  // Verifica que currentType no sea null, asignando el default si es necesario
  useEffect(() => {
    if (currentType == null) {
      setCurrentType(roundExercisType.REPS);
    }
  }, [currentType]);

  const onUpdate = useCallback((value: roundExercisType) => {
    setCurrentType(value ?? roundExercisType.REPS);
    console.log("Actualizando tipo a:", value ?? roundExercisType.REPS);
  }, []);

  // En ExerciseRound.tsx

  // Modificar la función onRepsChange
  const onRepsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newReps = e.target.value; // Eliminar el || "12"
      setCurrentReps(newReps);
      const repsNumber = parseInt(newReps, 10) || 0; // Convertir vacío a 0
      updateExerciseRoundRepetitions(
        roundExerciseData.roundExercise.id,
        repsNumber
      );
    },
    [updateExerciseRoundRepetitions, roundExerciseData.roundExercise.id]
  );

  // Modificar la función onTimeChange
  const onTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTime = Number(e.target.value) || 0; // Asegurar número válido
      setCurrentTime(newTime);
      // Si existe una función para actualizar el tiempo, llamarla aquí
      // updateExerciseRoundTime(id, newTime);
    },
    [
      /* updateExerciseRoundTime, id */
    ]
  );

  // Actualización local con debounce (500ms)
  const updateRoundExercise = useCallback(() => {
    const updatedData = {
      ...roundExerciseData.roundExercise,
      repetitions: currentReps,
      time: currentTime,
      roundExerciseType: currentType ?? roundExercisType.REPS,
    };
    console.log("Datos actualizados para el round exercise:", updatedData);
  }, [roundExerciseData.roundExercise, currentReps, currentTime, currentType]);

  useEffect(() => {
    const timeout = setTimeout(updateRoundExercise, 500);
    return () => clearTimeout(timeout);
  }, [updateRoundExercise]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = useMemo(
    () => ({
      transform: CSS.Translate.toString(transform),
      transition,
    }),
    [transform, transition]
  );

  const deleteRoundExercise = useCallback(() => {
    console.log("Eliminando round exercise con id:", id);
    removeRoundExercise(id);
  }, [id, removeRoundExercise]);

  return (
    <div
      className="bg-zinc-800 border-zinc-700 hover:bg-zinc-750 transition-colors mb-2 rounded"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="p-2 flex items-center space-x-3">
        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={image.src}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-sm font-medium text-zinc-100">{name}</h3>
          <EditRepetitionsTime
            repetitions={currentReps}
            time={currentTime}
            type={currentType}
            onTimeChange={onTimeChange}
            onRepsChange={onRepsChange}
            onUpdate={onUpdate}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-zinc-400 hover:text-red-300 hover:bg-red-400/10"
          onClick={deleteRoundExercise}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default React.memo(ExerciseRound);
