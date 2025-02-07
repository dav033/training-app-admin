import React, { Dispatch, JSX, SetStateAction } from "react";

export interface Exercice {
  id: number;
  name: string;
  description: string;
}

export interface Routine {
  id: number;
  name: string;
  description: string;
  trainingId?: number;
  price: number;
  localDateTime: string;
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

export interface DataListProps<T> {
  initialData: T[];
  service: any;
  renderItem: (item: T) => JSX.Element;
  placeholder?: string;
  modalTitle: string;
}

export interface SearchBarProps<T> {
  placeholder: string;
  data: T[];
  searchFuncion: OnChangeFunction;
  createFunction: (newItem: T) => Promise<void>;
  modalTitle: string;
}

interface CreateFunction {
  (exercise: CreateExercise): void;
}

export interface SearchProps {
  placeholder: string;
  searchFunction: OnChangeFunction;
}

export interface CreateContentDialogProps<T> {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  title: string;
  onCreate: (newItem: T) => Promise<void>;
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
