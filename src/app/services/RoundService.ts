import apiClient from "@/lib/apiClient";
import { CreateRound, Round } from "@/types";

export const RoundService = {
  async createRound(round: CreateRound): Promise<Round> {
    const response = await apiClient.post("/admin/round", round);

    return response.data;
  },

  async DeleteRound(id: number, routineId: number): Promise<Round[]> {
    const response = await apiClient.delete(`/admin/round/${id}`, {
      data: { routineId },
    });

    return response.data;
  },

  async updateRoundList(rounds: Round[]) {
    const response = await apiClient.put("/admin/round/list", { rounds });

    return response.data;
  },
};
