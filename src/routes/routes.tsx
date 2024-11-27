import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../app/(screens)/home-screen";
import ChatScreen from "../app/(screens)/chat-screen";

export default function routes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="home-screen">
      <Screen name="home-screen" component={HomeScreen} />
      <Screen name="chat-screen" component={ChatScreen} />
    </Navigator>
  )
}