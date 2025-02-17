"use client";

import CreateContentDialog from "@/components/common/CreateContentDialog";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";
import AddExercise from "./AddExercise";
import { Exercice, RoundData, RoundExercise, RoundHeaderProps } from "@/types";
import { ExerciseService } from "@/app/services/exerciseService";
import { Dispatch, SetStateAction } from "react";

export default function RoundHeader({
  roundData,
  exercises,
  deleteRound,
  isOpenCreate,
  setOpenCreate,
  onClose,
  setOpen,
  onCloseCreate,
  isOpen,
  addRoundExercise,
  removeRoundExercise,
}: RoundHeaderProps) {
  return (
    <div className="flex w-full justify-between items-center">
      <h1 className="text-xl font-bold text-zinc-100">
        Round {roundData.round.roundPosition}
      </h1>
      <div className="flex items-center space-x-2">
        <CreateContentDialog
          isOpen={isOpenCreate}
          setOpen={setOpenCreate}
          onClose={onCloseCreate}
          title="Agregar Ejercicio"
          onCreate={ExerciseService.create}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </CreateContentDialog>

        <AddExercise
          isOpen={isOpen}
          onClose={onClose}
          setOpen={setOpen}
          exercises={exercises}
          roundData={roundData}
          addRoundExercise={addRoundExercise}
        />

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
          onClick={() => deleteRound(roundData.round.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
