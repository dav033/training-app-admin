import apiClient from "@/lib/apiClient";
import { Exercice, Routine } from "@/types";

export const RoutineService = {
  async getAll(): Promise<Routine[]> {
    const response = await apiClient.get("/admin/routine");

    return response.data;
  },

  async create(exercise: Exercice): Promise<Routine> {
    const response = await apiClient.post("/admin/routine", exercise);

    return response.data;
  },
};
