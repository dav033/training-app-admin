"use client";

import { BiPlus } from "react-icons/bi";
import { Exercice, RoundData, RoundExercise, Routine, RoutineAllData } from "@/types";
import { useState, useMemo } from "react";
import RoutineInformationComponent from "./RoutineInformationComponent";
import { Button } from "@/components/ui/Button";
import { RoundService } from "@/app/services/RoundService";
import Rounds from "../Rounds";
import PublicRoutine from "./PublicRoutine";
import { RoutineService } from "@/app/services/routineService";

export default function RoutineData({
  routine,
  roundData,
  exercises,
}: RoutineAllData) {
  const [rounds, setRounds] = useState<RoundData[]>(roundData || []);
  const [routineData, setRoutine] = useState<Routine>(routine);
  const [isPublic, setIsPublic] = useState(routineData.isPublic);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Validación de integridad: rutina completa si todas las rondas tienen al menos un ejercicio
  const isRoutineValid = useMemo(() => {
    return rounds.every(round => round.roundExerciseData.length > 0);
  }, [rounds]);

  // Si la rutina no está publicada, se permite guardar incluso si está incompleta.
  // Si está publicada, se requiere que esté completa para guardar cambios.
  const canSave = useMemo(() => {
    return hasUnsavedChanges && (!routineData.isPublic || isRoutineValid);
  }, [hasUnsavedChanges, routineData.isPublic, isRoutineValid]);

  // Actualizar de forma local sin llamar a la API inmediatamente
  const createRound = () => {
    const tempId = Date.now();
    const newRound = {
      round: {
        id: tempId,
        roundPosition: rounds.length + 1,
        routineId: routineData.id,
        // Otros campos necesarios…
      },
      roundExerciseData: [],
    };
    setRounds(prevRounds => [...prevRounds, newRound]);
    setHasUnsavedChanges(true);
  };

  const deleteRound = (id: number) => {
    setRounds(prevRounds => prevRounds.filter(r => r.round.id !== id));
    setHasUnsavedChanges(true);
  };

  const addRoundExercise = (
    roundExercise: RoundExercise,
    exercise: Exercice
  ) => {
    setRounds(prevRounds =>
      prevRounds.map(round =>
        round.round.id === roundExercise.roundId
          ? {
              ...round,
              roundExerciseData: [
                ...round.roundExerciseData,
                { roundExercise, exercise },
              ],
            }
          : round
      )
    );
    setHasUnsavedChanges(true);
  };

  const removeRoundExercise = (roundExerciseId: number) => {
    setRounds(prevRounds =>
      prevRounds.map(round => ({
        ...round,
        roundExerciseData: round.roundExerciseData.filter(
          red => red.roundExercise.id !== roundExerciseId
        ),
      }))
    );
    setHasUnsavedChanges(true);
  };

  const updateExerciseRoundRepetitions = (
    roundExerciseId: number,
    reps: number
  ) => {
    setRounds(prevRounds =>
      prevRounds.map(round => ({
        ...round,
        roundExerciseData: round.roundExerciseData.map(red =>
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
  };

  // Guardar cambios pendientes: si la rutina está publicada se exige estar completa.
  const handleSave = async () => {
    if (routineData.isPublic && !isRoutineValid) {
      alert("No se puede guardar: la rutina publicada debe estar completa.");
      return;
    }
    try {
      await RoutineService.updateRoutine(routineData.id, {
        name: routineData.name,
        description: routineData.description,
      });
      await RoundService.updateRoundList(rounds.map(r => r.round));
      alert("Cambios guardados exitosamente.");
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Hubo un error al guardar. Intenta nuevamente.");
    }
  };

  // Publicar/despublicar solo si la rutina está completa.
  const handleTogglePublic = async () => {
    if (!isRoutineValid) {
      alert("No se puede publicar: la rutina tiene cambios incompletos.");
      return;
    }
    try {
      await RoutineService.updateRoutine(routineData.id, {
        isPublic: !isPublic,
      });
      setIsPublic(prev => !prev);
      setRoutine(prev => ({ ...prev, isPublic: !prev.isPublic }));
    } catch (error) {
      console.error("Error actualizando la rutina:", error);
    }
  };

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
        disabled={!isRoutineValid}  // Se deshabilita el botón de publicar si hay datos incompletos
      />

      <Rounds
        rounds={rounds}
        setRounds={setRounds}
        deleteRound={deleteRound}
        addRoundExercise={addRoundExercise}
        exercises={exercises}
        removeRoundExercise={removeRoundExercise}
        updateExerciseRoundRepetitions={updateExerciseRoundRepetitions}
      />

      <div className="flex gap-2 mt-4">
        <Button
          className="border-2 border-red-300 text-red-300"
          onClick={createRound}
        >
          <span>Agregar Ronda</span> <BiPlus />
        </Button>
        <Button
          onClick={handleSave}
          disabled={!canSave}
          className="bg-blue-500 text-white"
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
