"use client";
import { dataItemType, Exercice } from "@/types";
import EntityItem from "@/components/common/EntityItem";

import { ExerciseService } from "../services/exerciseService";
import DataList from "@/components/common/DataList";

interface ExerciseProps {
  exercises: Exercice[];
  type: dataItemType;
}

export default function ExerciseList({ exercises }: ExerciseProps) {
  return (
    <div className="max-w-full container bg-blue-">
      <DataList
        initialData={exercises}
        service={ExerciseService}
        renderItem={(exercise) => <EntityItem {...exercise} />}
        placeholder="Search Exercise"
        modalTitle="Create Exercise"
        type={dataItemType.EXERCISE}
      />
    </div>
  );
}
