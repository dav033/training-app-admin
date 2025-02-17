import React, { Dispatch, JSX, SetStateAction } from "react";

export type BaseEntity = {
  id: number;
};

export type DataItem = BaseEntity & {
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

export interface Round extends BaseEntity {
  routineId: number;
  roundTypeId?: number;
  rest?: number;
  roundPosition: number;
}

export interface RoundExercise extends BaseEntity {
  roundId: number;
  exerciseId: number;
  repetitions?: number;
  exercisePosition: number;
}

export interface RoundExerciseData {
  roundExercise: RoundExercise;
  exercise: Exercice;
}

export interface RoundData {
  round: Round;
  roundExerciseData: RoundExerciseData[];
}

export interface RoutineAllData {
  routine: Routine;
  roundData?: RoundData[];
  exercises: Exercice[];
}

export type OnChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => void;

export interface EntityItemProps {
  id: number;
  name: string;
}

export interface ExerciceList {
  exercices: Exercice[];
}

export interface ExerciseListProps {
  exercices: Exercice[];
}

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
  children?: JSX.Element;
}

export interface RoutineInformationProps {
  name: string;
  description: string;
  handleIsEditing: () => void;
}

export interface RoutineInformationEditProps extends RoutineInformationProps {
  id: number;
  handleInformationChange: (name: string, description: string) => void;
}

export interface RoutineComponentProps extends DataItem {}

export interface roundItemProps {
  roundData: RoundData;
  deleteRound: (id: number) => void;
  exercises: Exercice[];
  addRoundExercise: (roundExercise: RoundExercise, exercise: Exercice) => void;
  removeRoundExercise: (roundExerciseId: number) => void;
  updateExerciseRoundRepetitions: (
    roundExerciseId: number,
    repetitions: number
  ) => void;
}

export interface RoundsProps {
  rounds: RoundData[];
  setRounds: (rounds: RoundData[]) => void;
  deleteRound: (id: number) => void;
  exercises: Exercice[];
  addRoundExercise: (roundExercise: RoundExercise, exercise: Exercice) => void;
  removeRoundExercise: (roundExerciseId: number) => void;
  updateExerciseRoundRepetitions: (
    roundExerciseId: number,
    repetitions: number
  ) => void;
}

export interface RoundHeaderProps {
  roundData: RoundData;
  exercises: Exercice[];
  deleteRound: (id: number) => void;
  isOpenCreate: boolean;
  setOpenCreate: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onCloseCreate: () => void;
  isOpen: boolean;
  addRoundExercise: (roundExercise: RoundExercise, exercise: Exercice) => void;
  removeRoundExercise: (roundExerciseId: number) => void;
}

export interface SortableItemProps {
  id: number | string;
  round: RoundData;
  deleteRound: (id: number) => void;
  exercises: Exercice[];
  addRoundExercise: (roundExercise: RoundExercise, exercise: Exercice) => void;
  removeRoundExercise: (roundExerciseId: number) => void;
  updateExerciseRoundRepetitions: (
    roundExerciseId: number,
    reps: number
  ) => void;
}

export interface AddExerciseProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  exercises: Exercice[];
  roundData: RoundData;
  addRoundExercise: (roundExercise: RoundExercise, exercise: Exercice) => void;
}

export interface CreateItem extends CreateDataItem {}

export interface CreateRound {
  routineId: number;
  roundPosition: number;
}

export interface CreateRoundExercise {
  roundId: number;
  exerciseId: number;
  repetitions?: string;
  exercisePosition: number;
}

export interface Exception {
  timestamp: string;
  statusCode: number;
  message: string;
  details: string;
}

export interface UseDndItemsParams<T, U> {
  items: T[];
  setItems: (items: T[]) => void;
  updateItems: (items: U[]) => Promise<void>;
  getId: (item: T) => number | string;
  getPosition: (item: T) => number;
  setPosition: (item: T, newPosition: number) => void;
  getUpdateValue: (item: T) => U;
}
