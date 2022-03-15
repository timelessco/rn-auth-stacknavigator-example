import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { Easing, FadeIn, FadeInDown, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import tw from "twrnc";
import { AuthStackParamList } from "../../../App";
import useToastStore, { defaultToastValues } from "../../store/useToastStore";

type LoginProps = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen: React.FC<LoginProps> = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [toastDetails, setShowToast] = useToastStore((state) => [state, state.setShowToast]);

  const {
    handleSubmit,
    formState: { errors: errorData },
    setValue,
    register,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUser = (data: any) => {
    console.log(data);
    // An API Call
  };

  const toastAnimation = useSharedValue(0);

  const onError = (errors) => {
    if (errors.email) {
      emailInputRef.current.focus();
      setShowToast({
        showToast: true,
        toastMessage: errorData.email?.message || "Invalid Email",
        toastIcon: null,
      });
    } else if (errors.password) {
      passwordInputRef.current.focus();
      setShowToast({
        showToast: true,
        toastMessage: errorData.password?.message || "Invalid Password",
        toastIcon: null,
      });
    }
  };
  useEffect(() => {
    if (errorData.email) {
      emailInputRef.current.focus();
      setShowToast({
        showToast: true,
        toastMessage: errorData.email?.message || "Invalid Email",
        toastIcon: null,
      });
    } else if (errorData.password) {
      passwordInputRef.current.focus();
      setShowToast({
        showToast: true,
        toastMessage: errorData.password?.message || "Invalid Password",
        toastIcon: null,
      });
    }
  }, [errorData.email?.message, errorData.password?.message]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (toastDetails.showToast) {
      toastAnimation.value = withTiming(1);
      timeout = setTimeout(() => {
        toastAnimation.value = withTiming(0, { easing: Easing.linear, duration: 200 }, () => {
          runOnJS(setShowToast)(defaultToastValues);
        });
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [toastDetails.showToast]);

  const toastAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(toastAnimation.value, [0, 1], [0, 1]),
      transform: [{ scale: interpolate(toastAnimation.value, [0, 1], [0.95, 1]) }],
    };
  });

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: "white", position: "relative" }}>
      <Animated.View
        style={[
          tw.style("absolute flex-1 flex-row items-center top-12 p-2 border border-red-600 mx-8 bg-red-50 rounded-md shadow-sm shadow-red-200"),
          { width: Dimensions.get("window").width - 64 },
          toastAnimatedStyle,
        ]}
      >
        <Svg height={24} width={24} fill='none' viewBox='0 0 24 24' stroke={tw.color("text-red-600")}>
          <Path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
        </Svg>
        <Animated.Text style={tw.style("flex-1 flex-wrap font-medium text-red-600 pl-1")}>{toastDetails.toastMessage}</Animated.Text>
      </Animated.View>
      <Animated.View entering={FadeInDown} style={styles.headerWrapper}>
        <Text style={{ fontWeight: "700", fontSize: 24, textAlign: "center" }}>Welcome Back!</Text>
        <Text style={{ fontWeight: "500", fontSize: 16, textAlign: "center", color: "gray", paddingTop: 12 }}>Please sign in to your account</Text>
      </Animated.View>
      <Animated.View entering={FadeIn} style={styles.formWrapper}>
        <TextInput
          style={[tw.style("px-2 py-3 rounded-lg bg-transparent my-1 mx-4 border-2 border-gray-200"), errorData.email ? tw.style("border-red-100") : {}]}
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          placeholder='email'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCompleteType='email'
          onChangeText={(text) => setValue("email", text)}
          returnKeyType='next'
          onSubmitEditing={() => passwordInputRef.current.focus()}
          ref={emailInputRef}
          autoFocus
        />
        <TextInput
          style={[tw.style("px-2 py-3 rounded-lg bg-transparent my-1 mx-4 border-2 border-gray-200"), errorData.password ? tw.style("border-red-100") : {}]}
          placeholder='password'
          {...register("password", {
            minLength: { value: 8, message: "Password should have minimum 8 characters" },
            maxLength: { value: 15, message: "Password should have maximum 8 characters" },
          })}
          onChangeText={(text) => setValue("password", text)}
          secureTextEntry
          keyboardType='visible-password'
          returnKeyType='go'
          ref={passwordInputRef}
          onSubmitEditing={handleSubmit(loginUser, onError)}
        />
        <View style={tw.style("flex flex-row justify-end items-center")}>
          <Pressable onPress={() => null} style={({ pressed }) => [tw.style("flex items-end p-1 mr-4 mt-2 rounded-md"), pressed ? tw.style("opacity-75") : {}]}>
            <Text style={tw.style("font-medium text-gray-500")}>Forgot password?</Text>
          </Pressable>
        </View>
      </Animated.View>
      <Animated.View entering={FadeInDown} style={styles.buttonsWrapper}>
        <Pressable onPress={handleSubmit(loginUser)} style={({ pressed }) => [styles.primaryButtonStyle, pressed ? styles.pressedPrimaryButtonStyle : {}]}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </Pressable>
        <Pressable onPress={() => props.navigation.push("Register")} style={({ pressed }) => [styles.secondaryButtonStyle, pressed ? styles.pressedSecondaryButtonStyle : {}]}>
          <Text style={styles.secondaryButtonText}>Dont have an account? Sign up</Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrapper: { flex: 1, alignItems: "center", justifyContent: "center" },
  formWrapper: { flex: 1, width: Dimensions.get("screen").width, paddingHorizontal: 16, justifyContent: "center" },
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

export default LoginScreen;
