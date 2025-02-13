import { Routine, RoutineComponentProps } from "@/types";
import { useState } from "react";
import RoutineInformation from "./RoutineInformation";
import RoutineInformationEdit from "./RoutineInformationEdit";

export default function RoutineInformationComponent(
  props: RoutineComponentProps
) {
  const { name, description, id } = props;
  const [isEditing, setIsEditing] = useState(false);

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const [routineName, setRoutineName] = useState(name);
  const [routineDescription, setRoutineDescription] = useState(description);

  const handleInformationChange = (name: string, description: string) => {
    setRoutineName(name);
    setRoutineDescription(description);
  };

  return isEditing ? (
    <RoutineInformationEdit
      handleIsEditing={handleIsEditing}
      name={routineName}
      description={routineDescription}
      id={id}
      handleInformationChange={handleInformationChange}
    />
  ) : (
    <RoutineInformation
      name={routineName}
      description={routineDescription}
      handleIsEditing={handleIsEditing}
    />
  );
}
