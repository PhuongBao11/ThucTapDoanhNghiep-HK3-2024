import { createStackNavigator } from "@react-navigation/stack";
import Appointments from '../screens/Appointments';
import { useMyContextProvider } from "../index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";


const Stack = createStackNavigator();

const RouterAppointments = ({ navigation }) => {
    const [controller] = useMyContextProvider();
    const { userLogin } = controller;

    return (
        <Stack.Navigator
            initialRouteName="Appointments"
            screenOptions={{
                headerTitleAlign: "left",
                headerStyle: {
                    backgroundColor: "#33CCFF"
                },
            }}
        >
            <Stack.Screen options={{headerLeft: null, title:"Danh Sách Chủ Hộ", headerTitleAlign: "center",} } name="Appointments" component={Appointments} />
        </Stack.Navigator>
    )
}

export default RouterAppointments;
