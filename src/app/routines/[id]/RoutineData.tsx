"use client";

import RoutineInformation from "@/components/RoutineInformation";
import RoutineInformationEdit from "@/components/RoutineInformationEdit";
import { RoutineAllData } from "@/types";
import { useState } from "react";

export default function RoutineData(props: RoutineAllData) {
  const { routine, roundsData } = props;
  const [isEditing, setIsEditing] = useState(false);

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const [name, setName] = useState(routine.name);
  const [description, setDescription] = useState(routine.description);

  const handleInformationChange = (name: string, description: string) => {
    setName(name);
    setDescription(description);
  };
  return (
    <div>
      {isEditing ? (
        <RoutineInformationEdit
          handleIsEditing={handleIsEditing}
          name={name}
          description={description}
          id={routine.id}
          handleInformationChange={handleInformationChange}
        />
      ) : (
        <RoutineInformation
          name={name}
          description={description}
          handleIsEditing={handleIsEditing}
        />
      )}
    </div>
  );
}
