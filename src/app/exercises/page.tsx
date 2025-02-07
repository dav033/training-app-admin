"use server";

import DataList from "@/components/DataList";
import { ExerciseService } from "../services/exerciseService";
import ExerciseList from "./ExerciseList";
import { Exception, Exercice } from "@/types";
import Exercise from "@/ui/Exercise";

export default async function Exercises() {
  let response = await ExerciseService.getAll();

  return (
    <div className="max-w-full container bg-blue-">
      <button>Create Exercise</button>
      <ExerciseList exercises={response} />
    </div>
  );
}
