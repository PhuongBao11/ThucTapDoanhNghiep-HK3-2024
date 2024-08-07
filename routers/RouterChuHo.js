import { createStackNavigator } from "@react-navigation/stack";
import Customers from '../screens/Customers';
import { useMyContextProvider } from "../index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";


const Stack = createStackNavigator();

const RouterChuHo = ({ navigation }) => {
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
            <Stack.Screen options={{headerLeft: null, title:"Danh Sách Chủ Hộ", headerTitleAlign: "center",} } name="Customers" component={Customers} />
        </Stack.Navigator>
    )
}

export default RouterChuHo;
