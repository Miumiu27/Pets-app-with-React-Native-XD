import React, { useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import CardPets from "../components/MySpace/CardPets";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useUser } from "../utils/AuthContext";
import { useAnimal } from "../utils/AnimalContext";
import COLORS from "../components/constants/config/COLORS";
import SPACING from "../components/constants/config/SPACING";
import Ionicons from "@expo/vector-icons/Ionicons";
import SECTION from "../components/constants/config/SECTION";
import SearchInput from "../components/Search/SearchInput";
import { API_URL } from '@env';
const WIDTH = Dimensions.get("screen").width;

const HomeScreen = ({
  navigation
}) => {
  const { userData } = useUser();
  const { animalData, updateAnimalData } = useAnimal();
  const [activeCategory, setActiveCategory] = useState(0);

  const handleDeletePet = async (id) => {
    try {
      const response = await fetch(`${API_URL}/animals/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Deleted successfully");
        updateAnimalData(animalData.filter((animal) => animal._id !== id));
      } else {
        console.error("Failed to delete:", response.status);
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} vertical>
        <View style={{ padding: SPACING * 1.5, backgroundColor: "#F4F9FF" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: SPACING * 2,
                fontWeight: "bold",
                color: COLORS.dark,
              }}
            >
              {userData && userData.name ? `Bienvenue ${userData.name}` : "Bienvenue"}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ProfileScreen")}
            >
              {userData && userData.profile_image && (
                <Image
                  style={{
                    height: SPACING * 5,
                    width: SPACING * 5,
                    borderRadius: SPACING * 5,
                  }}
                  source={{
                    uri: `${API_URL}/${userData.profile_image.replace(
                      /\\/g,
                      "/"
                    )}`,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>

          <ScrollView style={{ marginVertical: SPACING * 2 }} horizontal>
            {SECTION.map((section, index) => (
              <TouchableOpacity
                onPress={() => setActiveCategory(index)}
                style={{ marginRight: SPACING }}
                key={section.id}
              >
                <Text
                  style={[
                    {
                      fontSize: SPACING * 1.2,
                      color: "#fff",
                      backgroundColor: "#3B91F9",
                      padding: 8,
                      borderRadius: 15,
                    },
                    activeCategory === index && { backgroundColor: "#F05D82" },
                  ]}
                >
                  {section.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={WIDTH * 0.7}
            decelerationRate="fast"
            pagingEnabled
            style={{ marginVertical: SPACING * 0.7 }}
          >
            {SECTION[activeCategory].pets.map((pet, index) => (
              <TouchableOpacity
                style={{
                  width: WIDTH * 0.7,
                  height: WIDTH * 0.9,
                  overflow: "hidden",
                  borderRadius: SPACING * 2,
                  marginRight: SPACING * 2,
                }}
                key={index}
              >
                <View
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    height: "100%",
                    width: "100%",
                    backgroundColor: COLORS.transparent,
                    justifyContent: "space-between",
                    padding: SPACING,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignSelf: "flex-end",
                      padding: SPACING / 2,
                      backgroundColor: COLORS.white,
                      borderRadius: SPACING * 4,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="heart-outline"
                      color={COLORS.primary}
                      size={SPACING * 2}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: SPACING * 1.5,
                      color: COLORS.white,
                      fontWeight: "700",
                      marginLeft: SPACING,
                    }}
                  >
                    {pet.title}
                  </Text>
                </View>
                <Image
                  source={pet.image}
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <SearchInput />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: SPACING * 1.4,
                fontWeight: "bold",
                color: COLORS.dark,
                marginBottom: SPACING * 1.4,
              }}
            >
              Trouve ici toutes tes animaux
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: SPACING * 1,
                  fontWeight: "500",
                  color: COLORS.primary,
                }}
              >
                Show all
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={animalData}
            renderItem={({ item }) => (
              <CardPets
                pet={item}
                navigation={navigation}
                onDelete={() => handleDeletePet(item._id)}
              />
            )}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
