import { RoutineService } from "@/app/services/routineService";
import RoutineData from "./routine/RoutineData";

interface Params {
  id: string;
}

export default async function Routine({ params }: { params: Params }) {
  const { id } = params;

  const response = await RoutineService.getAllRoutineData(parseInt(id));
  console.log(response);
  return (
    <div className="p-3">
      <RoutineData {...response} />
    </div>
  );
}
