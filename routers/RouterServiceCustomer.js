import { createStackNavigator } from "@react-navigation/stack";
import ServicesCustomer from '../screens/ServicesCustomer';
import { useMyContextProvider } from "../index";
import Appointment from "../screens/Appointment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";


const Stack = createStackNavigator();

const RouterServiceCustomer = ({ navigation }) => {
    const [controller] = useMyContextProvider();
    const { userLogin } = controller;

    return (
        <Stack.Navigator
            initialRouteName="ServicesCustomer"
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
            <Stack.Screen options={{headerLeft: null, title: (userLogin != null) && (userLogin.fullName)}} name="ServicesCustomer" component={ServicesCustomer} />
            <Stack.Screen name="Appointment" component={Appointment} options={{
            title: "Thông Báo",
             tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/home.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}/>
        </Stack.Navigator>
    )
}

export default RouterServiceCustomer;
