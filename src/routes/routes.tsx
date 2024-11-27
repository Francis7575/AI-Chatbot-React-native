import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../app/home-screen";
import ChatScreen from "../app/chat-screen";

export default function routes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={HomeScreen} />
      <Screen name="chat" component={ChatScreen} />
    </Navigator>
  )
}