import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParamList } from "../../../App";

type OnboardingProps = NativeStackScreenProps<AuthStackParamList, "Onboarding">;

const OnboardingScreen: React.FC<OnboardingProps> = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
      <Animated.View entering={FadeInDown} style={styles.headerWrapper}>
        <Text style={{ fontWeight: "500", fontSize: 16, textAlign: "center" }}>Keep Finance</Text>
        <Text style={{ fontWeight: "700", fontSize: 48, textAlign: "center" }}>at Your{"\n"} Fingertip</Text>
      </Animated.View>
      <Animated.View entering={FadeIn} style={styles.imageWrapper}>
        <Image style={{ height: "100%", width: "100%" }} source={require("../../../assets/savings.png")} />
      </Animated.View>
      <Animated.View entering={FadeInDown} style={styles.buttonsWrapper}>
        <Pressable onPress={() => props.navigation.push("Register")} style={({ pressed }) => [styles.primaryButtonStyle, pressed ? styles.pressedPrimaryButtonStyle : {}]}>
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </Pressable>
        <Pressable onPress={() => props.navigation.push("Login")} style={({ pressed }) => [styles.secondaryButtonStyle, pressed ? styles.pressedSecondaryButtonStyle : {}]}>
          <Text style={styles.secondaryButtonText}>Already have an account? Login</Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrapper: { flex: 1, alignItems: "center", justifyContent: "center" },
  imageWrapper: { flex: 1, width: Dimensions.get("screen").width, aspectRatio: 1, alignItems: "center" },
  buttonsWrapper: { flex: 1, width: "100%", justifyContent: "flex-end", paddingHorizontal: 16, paddingBottom: 16 },
  primaryButtonStyle: {
    paddingHorizontal: 8,
    backgroundColor: "#6569A5",
    margin: 16,
    minHeight: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  pressedPrimaryButtonStyle: {
    backgroundColor: "#3d3f68",
  },
  secondaryButtonStyle: {
    paddingHorizontal: 8,
    backgroundColor: "white",
    margin: 16,
    minHeight: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  pressedSecondaryButtonStyle: {
    backgroundColor: "#e6e6f0",
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#6569A5",
  },
});

export default OnboardingScreen;
