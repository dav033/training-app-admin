"use client";

import DataList from "@/components/DataList";
import { Routine } from "@/types";
import { RoutineService } from "../services/routineService";
import Exercise from "@/ui/Exercise";

interface RoutineProps {
  routines: Routine[];
}

export default function RoutineList({ routines }: RoutineProps) {
  return (
    <div>
      <DataList
        initialData={routines}
        service={RoutineService}
        renderItem={(routine) => <Exercise {...routine} />}
        placeholder="Search Routine"
        modalTitle="Create Routine"
      />
    </div>
  );
}
