import { createStackNavigator } from "@react-navigation/stack";
import Profile from '../screens/Profile';
import { useMyContextProvider } from "../index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";


const Stack = createStackNavigator();

const RouterReflect= ({ navigation }) => {
    const [controller] = useMyContextProvider();
    const { userLogin } = controller;

    return (
        <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={{
                headerTitleAlign: "left",
                headerStyle: {
                    backgroundColor: "#33CCFF"
                },
            }}
        >
            <Stack.Screen options={{headerLeft: null, title:"Danh Sách Phản Ánh", headerTitleAlign: "center",} } name="Profile" component={Profile} />
        </Stack.Navigator>
    )
}

export default RouterReflect;
