import { createStackNavigator } from "@react-navigation/stack";
import CustomersAdmin from '../screens/CustomersAdmin';
import { useMyContextProvider } from "../index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import CustomerDetail from '../screens/CustomerDetail';


const Stack = createStackNavigator();

const RouterCustomers = ({ navigation }) => {
    const [controller] = useMyContextProvider();
    const { userLogin } = controller;

    return (
        <Stack.Navigator
            initialRouteName="Customers"
            screenOptions={{
                headerTitleAlign: "left",
                headerStyle: {
                    backgroundColor: "#33CCFF"
                },
            }}
        >
            <Stack.Screen options={{headerLeft: null, title:"Danh Sách Khách Thăm", headerTitleAlign: "center",} } name="CustomersAdmin" component={CustomersAdmin} />
            <Stack.Screen name="CustomerDetail" component={CustomerDetail} options={{
            title: "Thông Tin Khách Thăm",
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

export default RouterCustomers;
