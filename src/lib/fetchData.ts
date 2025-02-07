import apiClient from "./apiClient";
import { Exception, Exercice, ExerciceList } from "../types";

const getExercises = async (): Promise<Exercice[]> => {
  const response = await apiClient.get("/admin/exercise");
  return response.data;
};

const createExercise = async (
  exercise: Exercice
): Promise<Exercice | Exception> => {
  const response = await apiClient.post("/admin/exercise", exercise);
  return response.data;
};

export { getExercises, createExercise };
