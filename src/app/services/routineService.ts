import apiClient from "@/lib/apiClient";
import { CreateItem, Exercice, Routine } from "@/types";

export const RoutineService = {
  async getAll(): Promise<Routine[]> {
    const response = await apiClient.get("/admin/routine");

    return response.data;
  },

  async create(exercise: CreateItem): Promise<Routine> {
    console.log("AA", exercise);
    const response = await apiClient.post("/admin/routine", exercise);

    return response.data;
  },
};
