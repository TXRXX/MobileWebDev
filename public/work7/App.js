import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./screens/HomeScreen";
import EventScreen from "./screens/EventScreen";
import MemberScreen from "./screens/MemberScreen";

const MainNavigator = createStackNavigator({
    Home: { screen: HomeScreen },
    Event: { screen: EventScreen },
    Member: { screen: MemberScreen },
});
const App = createAppContainer(MainNavigator);
export default App;
