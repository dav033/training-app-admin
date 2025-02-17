"use client";

import { BiPlus } from "react-icons/bi";
import { Exercice, RoundData, RoundExercise, RoutineAllData } from "@/types";
import { useState } from "react";
import RoutineInformationComponent from "./RoutineInformationComponent";
import { Button } from "@/components/ui/Button";
import { RoundService } from "@/app/services/RoundService";
import Rounds from "../Rounds";

export default function RoutineData({ routine, roundData, exercises }: RoutineAllData) {
  const [rounds, setRounds] = useState<RoundData[]>(roundData || []);

  const createRound = async () => {
    try {
      const response = await RoundService.createRound({
        routineId: routine.id,
        roundPosition: rounds.length + 1,
      });
      setRounds((prevRounds) => [
        ...prevRounds,
        { round: response, roundExerciseData: [] },
      ]);
    } catch (error) {
      console.error("Error creating round:", error);
    }
  };

  const deleteRound = async (id: number) => {
    try {
      const updatedRounds = await RoundService.DeleteRound(id, routine.id);
      setRounds(() =>
        updatedRounds.map((round) => {
          const roundDataFound = roundData?.find((rd) => rd.round.id === round.id);
          return {
            round,
            roundExerciseData: roundDataFound ? roundDataFound.roundExerciseData : [],
          };
        })
      );
    } catch (error) {
      console.error("Error deleting round:", error);
    }
  };

  const addRoundExercise = (roundExercise: RoundExercise, exercise: Exercice) => {
    setRounds((prevRounds) =>
      prevRounds.map((round) =>
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
  };

  const removeRoundExercise = (roundExerciseId: number) => {
    setRounds((prevRounds) =>
      prevRounds.map((round) => ({
        ...round,
        roundExerciseData: round.roundExerciseData.filter(
          (red) => red.roundExercise.id !== roundExerciseId
        ),
      }))
    );
  };

  const updateExerciseRoundRepetitions = (roundExerciseId: number, reps: number) => {
    setRounds((prevRounds) =>
      prevRounds.map((round) => ({
        ...round,
        roundExerciseData: round.roundExerciseData.map((red) =>
          red.roundExercise.id === roundExerciseId
            ? {
                ...red,
                roundExercise: { ...red.roundExercise, repetitions: reps },
              }
            : red
        ),
      }))
    );
  };

  return (
    <div className="overflow-hidden p-2">
      <RoutineInformationComponent
        id={routine.id}
        name={routine.name}
        description={routine.description}
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

      <Button
        className="border-2 border-red-300 text-red-300"
        onClick={createRound}
      >
        <span>Agregar Ronda</span> <BiPlus />
      </Button>
    </div>
  );
}
