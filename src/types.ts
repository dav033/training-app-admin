import React, { Dispatch, JSX, SetStateAction } from "react";
import { CSS } from "@dnd-kit/utilities";

export type DataItem = {
  id: number;
  name: string;
  description: string;
};

export type CreateDataItem = Omit<DataItem, "id">;

export interface Exercice extends DataItem {}

export interface Routine extends DataItem {
  trainingId?: number;
  price: number;
  localDateTime: string;
}

// Otros tipos ya existentes:
export interface ExerciceList {
  exercices: Exercice[];
}

export interface EntityItemProps {
  id: number;
  name: string;
}

export interface ExerciseListProps {
  exercices: Exercice[];
}

export type OnChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => void;

export interface DataListProps {
  initialData: DataItem[];
  service: {
    create: (newItem: CreateDataItem) => Promise<DataItem>;
  };
  renderItem: (item: DataItem) => JSX.Element;
  placeholder?: string;
  modalTitle: string;
}

export interface SearchBarProps {
  placeholder: string;
  data: DataItem[];
  searchFuncion: OnChangeFunction;
  createFunction: (newItem: CreateDataItem) => Promise<DataItem>;
  modalTitle: string;
}

export interface CreateContentDialogProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  title: string;
  onCreate: (newItem: CreateDataItem) => Promise<DataItem>;
}

export interface Exception {
  timestamp: string;
  statusCode: number;
  message: string;
  details: string;
}

export interface CreateItem {
  name: string;
  description: string;
}

export interface RoundExercise {
  id: number;
  roundId: number;
  exerciseId: number;
  repetitions: string;
  exercisePosition: number;
}

export interface RoundExerciseData {
  roundExercise: RoundExercise;
  exercise: Exercice;
}

export interface Round {
  id: number;
  routineId: number;
  roundTypeId?: number;
  rest?: number;
  roundPosition: number;
}

export interface RoundData {
  round: Round;
  roundExerciseData: RoundExerciseData[];
}

export interface RoutineAllData {
  routine: Routine;
  roundData?: RoundData[];
}

export interface RoutineInformationProps {
  name: string;
  description: string;
  handleIsEditing: () => void;
}

export interface RoutineInformationEditProps extends RoutineInformationProps {
  name: string;
  description: string;
  id: number;
  handleIsEditing: () => void;
  handleInformationChange: (name: string, description: string) => void;
}

export interface RoutineComponentProps {
  id: number;
  name: string;
  description: string;
}

export interface CreateRound {
  routineId: number;
  roundPosition: number;
}

export interface roundItemProps {
  roundData: RoundData;
  deleteRound: (id: number) => void;
  ref: (node: HTMLElement | null) => void;
  style: {
    transform?: string;
    transition?: string;
  };
}
