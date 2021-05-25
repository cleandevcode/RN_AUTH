import { createSwitchNavigator, createAppContainer } from "react-navigation";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";

const AppNavigator = createSwitchNavigator(
    {
        SignIn: {screen: SignIn},
        Home: {screen: Home}
    },
    {
        initialRouteName: "SignIn"
      }
);

export default createAppContainer(AppNavigator)