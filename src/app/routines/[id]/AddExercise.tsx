"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { DialogHeader } from "@/components/ui/dialog/DialogHeader";
import { Dialog } from "@/components/ui/dialog/Dialog";
import { DialogContent } from "@/components/ui/dialog/DialogContent";
import { DialogTitle } from "@/components/ui/dialog/DialogTitle";
import { DialogTrigger } from "@/components/ui/dialog/DialogTrigger";
import { DialogFooter } from "@/components/ui/dialog/DialogFooter";
import { Input } from "@/components/ui/input/Input";
import { Dumbbell, Search } from "lucide-react";
import { AddExerciseProps, Exercice } from "@/types";
import ExerciseModalItem from "./ExerciseModalItem";
import { RoundExerciseService } from "@/app/services/roundExerciseService";
import useFilteredExercises from "@/hooks/useFilteredExercises";

export default function AddExercise({
  isOpen,
  onClose,
  setOpen,
  exercises,
  roundData,
  addRoundExercise,
}: AddExerciseProps) {
  const { filteredExercises, searchTerm, setSearchTerm } = useFilteredExercises(exercises);
  const [selectedExercise, setSelectedExercise] = useState<Exercice | null>(null);

  // Extraemos propiedades de roundData para mayor claridad
  const { round, roundExerciseData } = roundData;

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  const addExercise = useCallback(async (exercise: Exercice, index: number) => {
    const response = await RoundExerciseService.createRoundExercise({
      roundId: round.id,
      exerciseId: exercise.id,
      exercisePosition: index + 1,
    });
    addRoundExercise(response, exercise);
  }, [round.id, addRoundExercise]);

  const addSelectedExercise = useCallback(() => {
    if (!selectedExercise) return;

    const isDuplicate = roundExerciseData.some(
      (roundExercise) => roundExercise.exercise.id === selectedExercise.id
    );

    if (isDuplicate) {
      alert("El ejercicio ya ha sido agregado.");
      return;
    }

    const index = roundExerciseData.length;
    addExercise(selectedExercise, index);
    setSelectedExercise(null);
    onClose();
  }, [selectedExercise, roundExerciseData, addExercise, onClose]);

  const handleSelectExercise = useCallback((exercise: Exercice) => {
    setSelectedExercise(exercise);
  }, []);

  const stopPropagation = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  const renderedExercises = useMemo(() => {
    if (filteredExercises.length > 0) {
      return (
        <div className="max-h-[300px] overflow-y-auto">
          {filteredExercises.map((exercise, index) => (
            <ExerciseModalItem
              key={exercise.id}
              exercise={exercise}
              index={index}
              onClick={() => handleSelectExercise(exercise)}
              isSelected={selectedExercise?.id === exercise.id}
            />
          ))}
        </div>
      );
    }
    return (
      <p className="text-zinc-500 text-sm text-center py-4">
        No se encontraron ejercicios
      </p>
    );
  }, [filteredExercises, handleSelectExercise, selectedExercise]);

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
              onChange={handleSearchChange}
              className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          </div>
          {renderedExercises}
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={addSelectedExercise}>Agregar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
