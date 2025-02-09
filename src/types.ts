// src/types.ts
import React, { Dispatch, JSX, SetStateAction } from "react";

// Tipo común para el listado (se requiere id, name y description)
export type DataItem = {
  id: number;
  name: string;
  description: string;
};

// Tipo para la creación (no se envía el id, ya que lo asigna el backend)
export type CreateDataItem = Omit<DataItem, "id">;

// Los tipos específicos (por ejemplo, para ejercicios y rutinas) pueden extender de DataItem:
export interface Exercice extends DataItem {
  // Otras propiedades específicas de Exercice pueden incluirse aquí.
}

export interface Routine extends DataItem {
  trainingId?: number;
  price: number;
  localDateTime: string;
}

// Otros tipos ya existentes:
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

export type OnChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => void;

// Props para el componente DataList (ahora especializado en DataItem)
export interface DataListProps {
  initialData: DataItem[];
  service: {
    // La función create recibe un CreateDataItem y devuelve un Promise<DataItem>
    create: (newItem: CreateDataItem) => Promise<DataItem>;
  };
  renderItem: (item: DataItem) => JSX.Element;
  placeholder?: string;
  modalTitle: string;
}

// Props para el componente SearchBar
export interface SearchBarProps {
  placeholder: string;
  data: DataItem[];
  searchFuncion: OnChangeFunction;
  // La función create recibe un CreateDataItem y devuelve un Promise<DataItem>
  createFunction: (newItem: CreateDataItem) => Promise<DataItem>;
  modalTitle: string;
}

// Props para el componente CreateContentDialog  
export interface CreateContentDialogProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  title: string;
  // La función onCreate recibe un CreateDataItem y devuelve un Promise<DataItem>
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
