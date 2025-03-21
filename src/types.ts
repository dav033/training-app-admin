import React, { Dispatch, JSX, SetStateAction } from "react";

export enum dataItemType {
  EXERCISE = "EXERCISE",
  ROUTINE = "ROUTINE",
}

export enum roundExercisType {
  REPS = "REPS",
  TIME = "TIME",
}

export type BaseEntity = {
  id: number;
};

export type DataItem = BaseEntity & {
  name: string;
  description: string;
  videoUrl?: string;
  thumbnailUrl?: string;
};

export type RoundBunch = Round & {
  isNew?: boolean; // se usa solo internamente para el estado
};

export type CreateDataItem = Omit<DataItem, "id">;

export interface Exercice extends DataItem {}

export interface Routine extends DataItem {
  trainingId?: number;
  price: number;
  localDateTime: string;
  isPublic: boolean;
}

// Se utiliza RoundBunch para permitir marcar la ronda como nueva (solo en estado local)
export interface Round extends BaseEntity {
  routineId: number;
  roundTypeId?: number;
  rest?: number;
  roundPosition: number;
  // Esta propiedad se usa internamente, pero no se enviará en el payload
  isNew?: boolean;
}

/**
 * RoundExercise representa un ejercicio asignado a una ronda.
 * Por defecto:
 * - roundExerciseType: roundExercisType.REPS
 * - time: 60 (segundos)
 * - repetitions: "12"
 */
export interface RoundExercise extends BaseEntity {
  roundId: number;
  exerciseId: number;
  repetitions: string;           // default "12"
  roundExerciseType: roundExercisType; // default REPS
  time: number;                  // default 60
  exercisePosition: number;
  // La propiedad temp se usa internamente para indicar objetos nuevos; no se envía en el payload
  temp?: boolean;
}

// Opcional: función helper para crear un RoundExercise con valores por defecto.
export function createDefaultRoundExercise(data: Partial<RoundExercise>): RoundExercise {
  if (data.roundId === undefined || data.exerciseId === undefined || data.exercisePosition === undefined) {
    throw new Error("roundId, exerciseId y exercisePosition son requeridos");
  }
  return {
    id: data.id ?? 0,
    roundId: data.roundId,
    exerciseId: data.exerciseId,
    repetitions: data.repetitions ?? "12",
    roundExerciseType: data.roundExerciseType ?? roundExercisType.REPS,
    time: data.time ?? 60,
    exercisePosition: data.exercisePosition,
    temp: data.temp,
  };
}

export interface RoundExerciseData {
  roundExercise: RoundExercise;
  exercise: Exercice;
}

export interface RoundData {
  round: RoundBunch;
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
  type: dataItemType;
}

export interface SearchBarProps {
  placeholder: string;
  data: DataItem[];
  searchFuncion: OnChangeFunction;
  createFunction: (newItem: CreateDataItem) => Promise<DataItem>;
  modalTitle: string;
  type: dataItemType;
}

// onUpdate se usa para agregar RoundExercise al estado (sin llamadas a API) junto con el item creado.
export interface CreateContentDialogProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  title: string;
  onCreate: (newItem: CreateDataItem) => Promise<DataItem>;
  children?: JSX.Element;
  onUpdate?: (roundExercise: RoundExercise, exercise: Exercice) => void;
  round?: RoundData;
  type: dataItemType;
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
  updateExerciseRoundRepetitions: (roundExerciseId: number, repetitions: number) => void;
}

export interface RoundsProps {
  rounds: RoundData[];
  setRounds: (rounds: RoundData[]) => void;
  deleteRound: (id: number) => void;
  exercises: Exercice[];
  addRoundExercise: (roundExercise: RoundExercise, exercise: Exercice) => void;
  removeRoundExercise: (roundExerciseId: number) => void;
  updateExerciseRoundRepetitions: (roundExerciseId: number, repetitions: number) => void;
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
  updateExerciseRoundRepetitions: (roundExerciseId: number, reps: number) => void;
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

export interface UpdateRoutine {
  name?: string;
  description?: string;
  price?: number;
  localDateTime?: string;
  isPublic?: boolean;
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

export interface ExerciseModalItemProps {
  exercise: Exercice;
  index: number;
  onClick: () => void;
  isSelected: boolean;
}

export interface EditRepetitionsTimeProps {
  repetitions: string;
  time: number;
  type: roundExercisType;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRepsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate: (value: roundExercisType) => void;
}

export interface roundItemProps {
  roundData: RoundData;
  deleteRound: (id: number) => void;
  exercises: Exercice[];
  addRoundExercise: (roundExercise: RoundExercise, exercise: Exercice) => void;
  removeRoundExercise: (roundExerciseId: number) => void;
  updateExerciseRoundRepetitions: (roundExerciseId: number, repetitions: number) => void;
  onPositionsChange?: () => void;
}