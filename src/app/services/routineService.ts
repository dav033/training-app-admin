import apiClient from "@/lib/apiClient";
import { CreateItem, Exercice, Routine, RoutineAllData } from "@/types";

export const RoutineService = {
  async getAll(): Promise<Routine[]> {
    const response = await apiClient.get("/admin/routine");

    return response.data;
  },

  async create(exercise: CreateItem): Promise<Routine> {
    const response = await apiClient.post("/admin/routine", exercise);

    return response.data;
  },

  async getAllRoutineData(id: number): Promise<RoutineAllData> {
    const response = await apiClient.get(`/admin/routine/${id}`);

    return response.data;
  },

  async updateRoutine(id: number, routine: CreateItem): Promise<Routine> {
    const response = await apiClient.put(`/admin/routine/${id}`, routine);

    return response.data;
  },
};
