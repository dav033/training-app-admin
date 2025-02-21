import { RoutineComponentProps } from "@/types";
import { useState, useCallback } from "react";
import RoutineInformation from "./RoutineInformation";
import RoutineInformationEdit from "./RoutineInformationEdit";

export default function RoutineInformationComponent({
  name,
  description,
  id,
}: RoutineComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [routineName, setRoutineName] = useState(name);
  const [routineDescription, setRoutineDescription] = useState(description);

  const toggleEditing = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const handleInformationChange = useCallback(
    (newName: string, newDescription: string) => {
      setRoutineName(newName);
      setRoutineDescription(newDescription);
    },
    []
  );

  return isEditing ? (
    <RoutineInformationEdit
      handleIsEditing={toggleEditing}
      name={routineName}
      description={routineDescription}
      id={id}
      handleInformationChange={handleInformationChange}
    />
  ) : (
    <RoutineInformation
      name={routineName}
      description={routineDescription}
      handleIsEditing={toggleEditing}
    />
  );
}
