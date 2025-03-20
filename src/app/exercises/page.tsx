"use server";

import { dataItemType } from "@/types";
import { ExerciseService } from "../services/exerciseService";
import ExerciseList from "./ExerciseList";

export default async function Exercises() {
  let response = await ExerciseService.getAll();

  return (
    <div className="max-w-full container bg-blue-">
      <button>Create Exercise</button>
      <ExerciseList exercises={response} type={dataItemType.EXERCISE} />
    </div>
  );
}
