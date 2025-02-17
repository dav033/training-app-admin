import apiClient from "@/lib/apiClient";
import { CreateRoundExercise, RoundExercise } from "@/types";

export const RoundExerciseService = {
  async createRoundExercise(
    roundExercise: CreateRoundExercise
  ): Promise<RoundExercise> {
    const response = await apiClient.post(
      "/admin/round-exercise",
      roundExercise
    );

    return response.data;
  },

  async deleteRoundExercise(roundExerciseId: number): Promise<void> {
    await apiClient.delete(`/admin/round-exercise/${roundExerciseId}`);
  },

  async updateRoundExercise(
    roundExercise: RoundExercise
  ): Promise<RoundExercise> {
    const response = await apiClient.put(
      `/admin/round-exercise/${roundExercise.id}`,
      roundExercise
    );

    return response.data;
  },

  async updateExerciseRoundList(roundExercises: RoundExercise[]) {
    const response = await apiClient.put("/admin/round-exercise/list", {
      roundExercises,
    });

    return response.data;
  },
};
