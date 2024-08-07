import { createStackNavigator } from "@react-navigation/stack";
import ServicesCustomer from '../screens/ServicesCustomer';
import { useMyContextProvider } from "../index";
import Appointment from "../screens/Appointment";
import AddCustomer from "../screens/AddCustomer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";


const Stack = createStackNavigator();

const RouterAddCustomer = ({ navigation }) => {
    const [controller] = useMyContextProvider();
    const { userLogin } = controller;

    return (
        <Stack.Navigator
            initialRouteName="AddCustomer"
            screenOptions={{
                headerTitleAlign: "left",
                headerStyle: {
                    backgroundColor: "#33CCFF"
                },
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate("ProfileCustomer")}>
                      <Image source={require('../assets/account.png')} style={{ width: 30, height: 30, margin: 20 }} />
                    </TouchableOpacity>
                  ),
            }}
        >
            <Stack.Screen options={{headerLeft: null, title:"Đăng Kí Khách Thăm", headerTitleAlign: "center",} } name="AddCustomer" component={AddCustomer} />
        </Stack.Navigator>
    )
}

export default RouterAddCustomer;
