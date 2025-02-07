import { getExercises } from "../../lib/fetchData";
import ExerciseList from "./ExerciseList";

export default async function routines() {
  const response = await getExercises();

  console.log(response);
  return (
    <div className="max-w-full container bg-blue-">
      <button>Create Exercise</button>

      <ExerciseList exercices={response} />
    </div>
  );
}
