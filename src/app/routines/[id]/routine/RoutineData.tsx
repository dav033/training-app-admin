"use client";

import { BiPlus } from "react-icons/bi";
import { RoundData, RoutineAllData } from "@/types";
import { useState, useRef, useEffect } from "react";
import RoutineInformationComponent from "./RoutineInformationComponent";
import Round from "../Round";
import { Button } from "@/components/ui/Button";
import { RoundService } from "@/app/services/RoundService";
import Rounds from "../Rounds";

export default function RoutineData(props: RoutineAllData) {
  const { routine, roundData } = props;
  const [rounds, setRounds] = useState<RoundData[]>(roundData ? roundData : []);

  const createRound = async () => {
    const response = await RoundService.createRound({
      routineId: routine.id,
      roundPosition: rounds.length + 1,
    });

    setRounds([
      ...rounds,
      {
        round: response,
        roundExerciseData: [],
      },
    ]);
  };

  const deleteRound = async (id: number) => {
    const updatedRounds = await RoundService.DeleteRound(id, routine.id);

    setRounds(() => {
      return updatedRounds.map((round) => {
        const roundDataFound = props.roundData?.find(
          (roundData) => roundData.round.id === round.id
        );
        return {
          round,
          roundExerciseData: roundDataFound
            ? roundDataFound.roundExerciseData
            : [],
        };
      });
    });
  };

  return (
    <div className=" overflow-x-hidden overflow-y-hidden p-2">
      <RoutineInformationComponent
        id={routine.id}
        name={routine.name}
        description={routine.description}
      />

      <Rounds rounds={rounds} setRounds={setRounds} deleteRound={deleteRound} />

      <Button
        className="border-2 border-red-300 text-red-300"
        onClick={createRound}
      >
        <span>Agregar Ronda</span> <BiPlus />
      </Button>
    </div>
  );
}
