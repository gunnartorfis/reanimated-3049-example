import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Home from "./screens/Home";
import Story from "./screens/Story";
import { StoryType } from "./types/story";

const Stack = createSharedElementStackNavigator();

export type StackParams = {
  Home: {};
  Story: {
    story: StoryType;
  };
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
          cardOverlayEnabled: true,
          cardStyle: { backgroundColor: "transparent" },
          presentation: "modal",
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Story"
          component={Story}
          sharedElements={(route) => {
            const { id } = route.params.story;
            return [id];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
