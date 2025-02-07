import React, { Dispatch, SetStateAction } from "react";

export interface Exercice {
  id: number;
  name: string;
  description: string;
}

export interface ExerciceList {
  exercices: Exercice[];
}

export interface ExerciseItemProps {
  id: number;
  name: string;
}

export interface ExerciseListProps {
  exercices: Exercice[];
}

export interface OnChangeFunction {
  (e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface SearchBarProps {
  placeholder: string;
  data: Exercice[];
  searchFuncion: OnChangeFunction;
  createFunction: CreateFunction;
}

interface CreateFunction {
  (exercise: CreateExercise): void;
}

export interface SearchProps {
  placeholder: string;
  searchFunction: OnChangeFunction;
}

export interface CreateContentDialogProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  title: string;
  onCreate: CreateFunction;
}

export interface Exception {
  timestamp: string;
  statusCode: number;
  message: string;
  details: string;
}

export interface CreateExercise {
  name: string;
  description: string;
}
