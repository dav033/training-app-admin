"use client";

import DataList from "@/components/common/DataList";
import { dataItemType, Routine } from "@/types";
import { RoutineService } from "../services/routineService";
import EntityItem from "@/components/common/EntityItem";

interface RoutineProps {
  routines: Routine[];
}

export default function RoutineList({ routines }: RoutineProps) {
  return (
    <div>
      <DataList
        initialData={routines}
        service={RoutineService}
        renderItem={(routine) => <EntityItem {...routine} />}
        placeholder="Search Routine"
        modalTitle="Create Routine"
        type={dataItemType.ROUTINE}
      />
    </div>
  );
}
