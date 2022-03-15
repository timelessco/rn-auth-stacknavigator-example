// In App.js in a new project

import BottomSheet from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { View } from "react-native";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import OnboardingScreen from "./src/screens/Auth/OnboardingScreen";
import RegisterScreen from "./src/screens/Auth/RegisterScreen";
import useToastStore, { defaultToastValues } from "./src/store/useToastStore";

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  FancySlider: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function App() {
  //  Zustand Toast Store
  const [toastDetails, setShowToast] = useToastStore((state) => [state, state.setShowToast]);
  //  hooks for the bottom sheet
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const handleComponent: React.FC = () => <View />;
  //  variables for the bottom sheet
  const snapPoints = React.useMemo(() => ["12%"], []);
  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (toastDetails.showToast) {
      bottomSheetRef.current?.expand();
      timeout = setTimeout(() => {
        bottomSheetRef.current?.close();
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [setShowToast, toastDetails.showToast]);
  const bottomSheetOnChange = (value: number) => {
    if (value === 0) {
      setShowToast(defaultToastValues);
    }
  };
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName='FancySlider'>
        <AuthStack.Screen options={{ headerShown: false }} name='Onboarding' component={OnboardingScreen} />
        <AuthStack.Screen options={{ headerShown: false }} name='Register' component={RegisterScreen} />
        <AuthStack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
