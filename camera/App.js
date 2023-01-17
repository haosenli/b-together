import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "./src/screens/CameraScreen";
import PreviewScreen from "./src/screens/PreviewScreen";

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Camera">
        <Stack.Screen name="Camera" component={CameraScreen} options={{unmountOnBlur: true}}/>
        <Stack.Screen name="Preview" component={PreviewScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
