import { createStackNavigator } from "@react-navigation/stack";
import ProfileCustomer from '../screens/ProfileCustomer';
import { useMyContextProvider } from "../index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";


const Stack = createStackNavigator();

const RouterProfileCustomer = ({ navigation }) => {
    const [controller] = useMyContextProvider();
    const { userLogin } = controller;
    
    return (
        <Stack.Navigator
            initialRouteName="ProfileCustomer"
            screenOptions={{
                headerTitleAlign: "left",
                headerStyle: {
                    backgroundColor: "#33CCFF"
                },
            }}
        >
            <Stack.Screen options={{headerLeft: null, title:"Thông Tin Chủ Hộ", headerTitleAlign: "center",} } name="ProfileCustomer" component={ProfileCustomer} />
        </Stack.Navigator>
    )
}

export default RouterProfileCustomer;
