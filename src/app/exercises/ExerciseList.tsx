"use client";
import { Exercice } from "@/types";
import Exercise from "@/ui/Exercise";

import { ExerciseService } from "../services/exerciseService";
import DataList from "@/components/DataList";

interface ExerciseProps {
  exercises: Exercice[];
}

export default function ExerciseList({ exercises }: ExerciseProps) {
  return (
    <div className="max-w-full container bg-blue-">
      <DataList
        initialData={exercises}
        service={ExerciseService}
        renderItem={(exercise) => <Exercise {...exercise} />}
        placeholder="Search Exercise"
        modalTitle="Create Exercise"
      />
    </div>
  );
}
