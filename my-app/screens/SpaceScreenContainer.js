import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import SpaceScreen from "./SpaceScreen";
import { useUser } from "../utils/AuthContext";
import { useAnimal } from "../utils/AnimalContext";

const SpaceScreenContainer = ({ navigation }) => {
  const { userData } = useUser();
  const { animalData, updateAnimalData } = useAnimal();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData && animalData) {
      setLoading(false);
    }
  }, [userData, animalData]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SpaceScreen
      navigation={navigation}
      userData={userData}
      animalData={animalData}
      updateAnimalData={updateAnimalData}
    />
  );
};

export default SpaceScreenContainer;
