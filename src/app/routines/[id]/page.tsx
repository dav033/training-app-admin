import { RoutineService } from "@/app/services/routineService";
import RoutineData from "./routine/RoutineData";
import { ExerciseService } from "@/app/services/exerciseService";

interface Params {
  id: string;
}

export default async function Routine({ params }: { params: Params }) {
  const { id } = await params;

  console.log("id", id);

  const response = await RoutineService.getAllRoutineData(parseInt(id));

  const exercises = await ExerciseService.getAll();
  return (
    <div className="p-3 px-6 bg-red-">
      <RoutineData {...response} exercises={exercises} />
    </div>
  );
}
