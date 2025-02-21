import apiClient from "@/lib/apiClient";
import { CreateItem, Exercice, Routine, RoutineAllData, UpdateRoutine } from "@/types";

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

    console.log(response.data);

    return response.data;
  },

  async updateRoutine(id: number, routine: UpdateRoutine): Promise<Routine> {
    const response = await apiClient.put(`/admin/routine/${id}`, routine);

    return response.data;
  },
};
