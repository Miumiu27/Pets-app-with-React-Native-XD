import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../components/constants/profil";
import { StatusBar } from "expo-status-bar";
import { useUser } from "../utils/AuthContext";
import { API_URL } from '@env';
import { ActivityIndicator } from "react-native";
import bg from "../assets/bg.png";
import BackButton from "../components/shared/BackButton";

const Profile = ({ navigation }) => {
  const { userData , logout} = useUser();
  const handleLogout = async () => {
    await logout(); 
    navigation.navigate('LoginScreen'); 
  };
  console.log(userData);

  if (!userData) {
    return <ActivityIndicator />;
  }

  const imageUrl = userData.profile_image.replace(/\\/g, "/");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor={COLORS.gray} />
      <View style={{ position: "relative" }}>
        <Image
          source={bg}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
        <BackButton onPress={() => navigation.goBack()} />
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={{ uri: `${API_URL}/${imageUrl}` }}
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: COLORS.primary,
            borderWidth: 2,
            marginTop: -90,
          }}
        />

        <Text
          style={{
            fontSize:20,
            color: COLORS.primary,
            marginVertical: 8,
            fontWeight: "bold",
          }}
        >
          {userData.name} {userData.firstname}
          <hr></hr>
        </Text>

        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            fontSize: 20,
            marginVertical: 8,
          }}
        >
          {" "}
          <Text style={{ padding: 20 }}>Email: </Text>
          {userData.email}
          <hr></hr>
        </Text>

        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            fontSize: 20,
            marginVertical: 8,
          }}
        >
          {" "}
          <Text style={{ padding: 20 }}>Telephone: </Text>
          {userData.tel} <hr></hr>
        </Text>
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.body4,
            fontSize: 20,
          }}
        ></Text>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            fontSize: 20,
            marginVertical: 6,
          }}
        >
          <Text style={{ padding: 20 }}>Adresse: </Text>
          {userData.adresse}
          <hr></hr>
        </Text>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            fontSize: 20,
            marginVertical: 8,
          }}
        >
          {" "}
          <Text style={{ padding: 20 }}>Prefence: </Text>
          {userData.preference} <hr></hr>
        </Text>
      </View>

      <View
        style={{
          paddingVertical: 8,
          marginLeft: -20,
          marginBottom: 50,
          flexDirection: "row",
        }}
      >
        <View style={{ flexDirection: "row", marginLeft: 130 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfileScreen");
            }}
            style={{
              marginTop : 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderWidth: 1,
              backgroundColor: "#075eec",
              borderColor: "#075eec",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                lineHeight: 26,
                fontWeight: "600",
                color: "#fff",
              }}
            >
              Modifier le profil
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              marginTop : 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderWidth: 1,
              backgroundColor: "#075eec",
              borderColor: "#075eec",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                lineHeight: 26,
                fontWeight: "600",
                color: "#fff",
              }}
            >Se déconnecter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
