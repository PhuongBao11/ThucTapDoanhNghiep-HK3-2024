import { createStackNavigator } from "@react-navigation/stack";
import Services from '../screens/Services';
import AddNewService from '../screens/AddNewService';
import ServiceDetail from '../screens/ServiceDetail';
import ServiceUpdate from "../screens/ServiceUpdate";
import CustomerDetail from "../screens/CustomerDetail"
import { useMyContextProvider } from "../index";
import { Text, IconButton } from "react-native-paper";
import { Menu, MenuTrigger, MenuOption, MenuOptions } from "react-native-popup-menu";
import { Alert, Image } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();

const RouterService = ({ navigation }) => {
    const [controller] = useMyContextProvider();
    const { userLogin } = controller;

    const handleDelete = (service) => {
        Alert.alert(
            "Warning",
            "Are you sure you want to delete this service? This operation cannot be returned",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        firestore()
                            .collection('Services')
                            .doc(service.id)
                            .delete()
                            .then(() => {
                                console.log("Dịch vụ đã được xóa thành công!");
                                navigation.navigate("Services");
                            })
                            .catch(error => {
                                console.error("Lỗi khi xóa dịch vụ:", error);
                            });
                    },
                    style: "default"
                }
            ]
        );
    };

    return (
        <Stack.Navigator
            initialRouteName="Services"
            screenOptions={{
                headerTitleAlign: "left",
                headerStyle: {
                    backgroundColor: "#33CCFF"
                },
                headerRight: (props) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Services")}>
                      <Image source={require('../assets/account.png')} style={{ width: 30, height: 30, margin: 20 }} />
                    </TouchableOpacity>
                  ),
                  
            }}
        >
            <Stack.Screen options={{headerLeft: null, title: (userLogin != null) && (userLogin.fullName)}} name="Services" component={Services} />
            <Stack.Screen name="AddNewService" component={AddNewService} 
            options={{
                title: "Thêm Thông Báo Mới",
                 tabBarIcon: ({ color }) => (
                <Image
                  source={require("../assets/home.png")}
                  style={{ width: 24, height: 24, tintColor: color }}
                />
            ),
            }}/>
            {/* <Stack.Screen name="CustomerDetail" component={CustomerDetail} /> */}
            <Stack.Screen
                name="ServiceDetail"
                component={ServiceDetail}
                options={({ route  }) => ({
                    title: "Thông Báo Chi Tiết",
                    headerRight: () => (
                        <Menu>
                            <MenuTrigger>
                            <Image source={require('../assets/dots.png')} style={{ width: 30, height: 30, margin: 20 }} />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => navigation.navigate("ServiceUpdate", { service: route.params.service })}>
                                    <Text>Chỉnh Sửa</Text>
                                </MenuOption>
                                <MenuOption onSelect={() => handleDelete(route.params.service)}>
                                    <Text>Xóa Thông Báo</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    )
                })}
            />
            <Stack.Screen name="ServiceUpdate" component={ServiceUpdate} 
            options={{
                title: "Cập Nhật Thông Báo Mới",
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

export default RouterService;
