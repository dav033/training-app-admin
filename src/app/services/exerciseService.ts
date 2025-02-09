import apiClient from "@/lib/apiClient";
import { CreateItem, Exception, Exercice } from "@/types";

export const ExerciseService = {
  async getAll(): Promise<Exercice[]> {
    const response = await apiClient.get("/admin/exercise");
    return response.data;
  },

  async create(exercise: CreateItem): Promise<Exercice> {
    const response = await apiClient.post("/admin/exercise", exercise);
    return response.data;
  },
};
