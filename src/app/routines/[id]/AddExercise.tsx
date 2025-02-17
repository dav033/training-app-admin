"use client";

import { Button } from "@/components/ui/Button";
import { DialogHeader } from "@/components/ui/dialog/DialogHeader";
import { Dialog } from "@/components/ui/dialog/Dialog";
import { DialogContent } from "@/components/ui/dialog/DialogContent";
import { DialogTitle } from "@/components/ui/dialog/DialogTitle";
import { DialogTrigger } from "@/components/ui/dialog/DialogTrigger";
import React, { useMemo } from "react";
import { AddExerciseProps, Exercice} from "@/types";
import { Dumbbell, Search } from "lucide-react";
import ExerciseModalItem from "./ExerciseModalItem";
import { RoundExerciseService } from "@/app/services/roundExerciseService";
import { DialogFooter } from "@/components/ui/dialog/DialogFooter";
import { Input } from "@/components/ui/input/Input";

export default function AddExercise({
  isOpen,
  onClose,
  setOpen,
  exercises,
  roundData,
  addRoundExercise,
}: AddExerciseProps) {
  const [selectedExercise, setSelectedExercise] =
    React.useState<Exercice | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [exercises, searchTerm]);

  const addExercise = async (exercise: Exercice, index: number) => {
    const response = await RoundExerciseService.createRoundExercise({
      roundId: roundData.round.id,
      exerciseId: exercise.id,
      exercisePosition: index + 1,
    });
    addRoundExercise(response, exercise);
  };

  const addSelectedExercise = () => {
    if (selectedExercise) {
      const index = roundData.roundExerciseData.length;
      addExercise(selectedExercise, index);
      setSelectedExercise(null);
      onClose();
    }
  };

  const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10"
        >
          <Dumbbell className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[425px] bg-zinc-900 text-zinc-100 border-zinc-700"
        onMouseDown={stopPropagation}
        onTouchStart={stopPropagation}
        onDragStart={stopPropagation}
        onPointerDown={stopPropagation}
      >
        <DialogHeader>
          <DialogTitle>Agregar Ejercicio</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Buscar ejercicio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          </div>
          {filteredExercises.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto">
              {filteredExercises.map((exercise, index) => (
                <ExerciseModalItem
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  onClick={() => setSelectedExercise(exercise)}
                  isSelected={selectedExercise?.id === exercise.id}
                />
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm text-center py-4">
              No se encontraron ejercicios
            </p>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={addSelectedExercise}>Agregar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
