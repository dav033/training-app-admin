"use client";
import { useState } from "react";
import { CreateExercise, ExerciseListProps } from "@/types";
import Exercise from "@/ui/Exercise";
import SearchBar from "@/components/SearchBar";
import apiClient from "@/lib/apiClient";
import axios from "axios";

export default function ExerciseList(props: ExerciseListProps) {
  const { exercices: initialExercices } = props;
  const [busqueda, setBusqueda] = useState("");
  const [exercices, setExercices] = useState(initialExercices);
  const ejerciciosFiltrados = exercices.filter((exercice) =>
    exercice.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const createExercise = async (exercise: CreateExercise) => {
    try {
      const response = await apiClient.post("/admin/exercise", exercise);
      setExercices([...exercices, response.data]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          alert("Este ejercicio ya existe. Intenta con otro nombre.");
        } else {
          alert("Ocurrió un error al crear el ejercicio. Inténtalo más tarde.");
        }
      } else {
        console.error("Error desconocido:", error);
        alert("Ocurrió un error inesperado.");
      }
    }
  };

  return (
    <section className="flex flex-col items-center px-4 py-8 w-full">
      <SearchBar
        placeholder="Buscar ejercicio..."
        data={exercices}
        searchFuncion={(e) => setBusqueda(e.target.value)}
        createFunction={createExercise}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
        {ejerciciosFiltrados.map((exercice) => (
          <div key={exercice.id} className="flex justify-center">
            <Exercise {...exercice} />
          </div>
        ))}
      </div>
    </section>
  );
}
