"use client";

import { flushSync } from "react-dom";
import {
  Exercice,
  RoundData,
  RoundExercise,
  roundExercisType,
  Routine,
  RoutineAllData,
  createDefaultRoundExercise,
} from "@/types";
import { useState, useMemo, useCallback } from "react";
import RoutineInformationComponent from "./RoutineInformationComponent";
import Rounds from "../Rounds";
import PublicRoutine from "./PublicRoutine";
import { RoutineService } from "@/app/services/routineService";
import ControlButtons from "./ControlButtons";

export default function RoutineData({
  routine,
  roundData,
  exercises,
}: RoutineAllData) {
  const [rounds, setRounds] = useState<RoundData[]>(roundData || []);
  const [routineData, setRoutine] = useState<Routine>(routine);
  const [isPublic, setIsPublic] = useState(routineData.isPublic);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [deletedRounds, setDeletedRounds] = useState<number[]>([]);
  const [deletedRoundExercises, setDeletedRoundExercises] = useState<number[]>([]);

  const isRoutineValid = useMemo(() => {
    return rounds.every((round) => round.roundExerciseData.length > 0);
  }, [rounds]);

  const canSave = useMemo(() => {
    return hasUnsavedChanges && (!routineData.isPublic || isRoutineValid);
  }, [hasUnsavedChanges, routineData.isPublic, isRoutineValid]);

  const addRoundExercise = useCallback(
    (roundExercise: RoundExercise, exercise: Exercice) => {
      const newRoundExercise = createDefaultRoundExercise({
        ...roundExercise,
        repetitions: roundExercise.repetitions || "12",
        time: roundExercise.time || 60,
        roundExerciseType:
          roundExercise.roundExerciseType || roundExercisType.REPS,
      });
      setRounds((prev) =>
        prev.map((round) =>
          round.round.id === newRoundExercise.roundId
            ? {
                ...round,
                roundExerciseData: [
                  ...round.roundExerciseData,
                  { roundExercise: newRoundExercise, exercise },
                ],
              }
            : round
        )
      );
      setHasUnsavedChanges(true);
    },
    []
  );

  const createRound = useCallback(() => {
    setRounds((prev) => {
      const newRound: RoundData = {
        round: {
          id: Date.now(), // Valor temporal interno
          roundPosition: prev.length + 1,
          routineId: routineData.id,
          isNew: true,
        },
        roundExerciseData: [],
      };
      return [...prev, newRound];
    });
    setHasUnsavedChanges(true);
  }, [routineData.id]);

  const deleteRound = useCallback((id: number) => {
    if (id > 0) {
      setDeletedRounds((prev) => [...prev, id]);
    }
    setRounds((prev) => {
      const newRounds = prev.filter((r) => r.round.id !== id);
      return newRounds.map((r, index) => ({
        ...r,
        round: { ...r.round, roundPosition: index + 1 },
      }));
    });
    setHasUnsavedChanges(true);
  }, []);

  const removeRoundExercise = useCallback((roundExerciseId: number) => {
    setRounds((prevRounds) =>
      prevRounds.map((round) => {
        const existing = round.roundExerciseData.find(
          (red) => red.roundExercise.id === roundExerciseId
        );
        if (
          existing &&
          !existing.roundExercise.temp &&
          existing.roundExercise.id > 0
        ) {
          setDeletedRoundExercises((prev) => [...prev, roundExerciseId]);
        }
        return {
          ...round,
          roundExerciseData: round.roundExerciseData.filter(
            (red) => red.roundExercise.id !== roundExerciseId
          ),
        };
      })
    );
    setHasUnsavedChanges(true);
  }, []);

  const updateExerciseRoundRepetitions = useCallback(
    (roundExerciseId: number, reps: number) => {
      setRounds((prevRounds) =>
        prevRounds.map((round) => ({
          ...round,
          roundExerciseData: round.roundExerciseData.map((red) =>
            red.roundExercise.id === roundExerciseId
              ? {
                  ...red,
                  roundExercise: {
                    ...red.roundExercise,
                    repetitions: reps.toString(),
                  },
                }
              : red
          ),
        }))
      );
      setHasUnsavedChanges(true);
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (routineData.isPublic && !isRoutineValid) {
      alert("No se puede guardar: la rutina publicada debe estar completa.");
      return;
    }

    const roundsPayload = rounds.map((r) => {
      const { id, roundPosition, routineId, isNew } = r.round;
      const roundPayload: any = isNew
        ? { roundPosition, routineId }
        : { id, roundPosition, routineId };
      roundPayload.roundExercises = r.roundExerciseData.map((item) => {
        const {
          id: reId,
          exercisePosition,
          repetitions,
          time,
          temp,
          roundExerciseType,
        } = item.roundExercise;
        const baseRoundExercise = {
          roundId: r.round.id,
          exerciseId: item.exercise.id,
          exercisePosition,
          repetitions: repetitions ?? "12",
          time: time ?? 60,
          roundExerciseType: roundExerciseType ?? roundExercisType.REPS,
        };
        return temp ? baseRoundExercise : { id: reId, ...baseRoundExercise };
      });
      return roundPayload;
    });

    const payload = {
      rounds: roundsPayload,
      deletedRounds,
      deletedRoundExercises,
    };

    console.log("Payload para guardar la rutina:", payload);

    try {
      const savedData = await RoutineService.createOrUpdateFullRoutine(payload);
      console.log("Datos guardados:", savedData);
      if (savedData.roundData) {
        setRounds(savedData.roundData);
      }
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error al guardar la rutina:", error);
    }
  }, [
    routineData.isPublic,
    isRoutineValid,
    rounds,
    deletedRounds,
    deletedRoundExercises,
  ]);

  const handleTogglePublic = useCallback(async () => {
    if (!isRoutineValid) {
      alert("No se puede publicar: la rutina tiene cambios incompletos.");
      return;
    }
    setIsPublic((prev) => !prev);
    setRoutine((prev) => ({ ...prev, isPublic: !prev.isPublic }));
  }, [isRoutineValid]);

  // Se aplica flushSync para actualizar el estado de forma sincrónica al cambiar las posiciones
  const handlePositionsChange = useCallback(() => {
    flushSync(() => {
      setHasUnsavedChanges(true);
    });
  }, []);

  return (
    <div className="overflow-hidden p-2">
      <RoutineInformationComponent
        id={routineData.id}
        name={routineData.name}
        description={routineData.description}
      />

      <PublicRoutine
        isPublic={isPublic}
        handleTogglePublic={handleTogglePublic}
        disabled={!isRoutineValid}
      />

      <Rounds
        rounds={rounds}
        setRounds={setRounds}
        deleteRound={deleteRound}
        addRoundExercise={addRoundExercise}
        exercises={exercises}
        removeRoundExercise={removeRoundExercise}
        updateExerciseRoundRepetitions={updateExerciseRoundRepetitions}
        onPositionsChange={handlePositionsChange}
      />

      <ControlButtons 
        canSave={canSave} 
        handleSave={handleSave} 
        createRound={createRound}
      />
    </div>
  );
}
