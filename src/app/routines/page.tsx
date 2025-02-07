"use server";

import { RoutineService } from "../services/routineService";
import RoutineList from "./RoutineList";

export default async function Routines() {
  let response = await RoutineService.getAll();

  return (
    <div className="max-w-full container bg-blue-">
      <button>Create Exercise</button>
      <RoutineList routines={response}/>
    </div>
  );
}
