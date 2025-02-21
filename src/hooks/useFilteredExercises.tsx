// hooks/useFilteredExercises.ts
import { useMemo, useState } from "react";
import { Exercice } from "@/types";

export default function useFilteredExercises(exercises: Exercice[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [exercises, searchTerm]);

  return { filteredExercises, searchTerm, setSearchTerm };
}
