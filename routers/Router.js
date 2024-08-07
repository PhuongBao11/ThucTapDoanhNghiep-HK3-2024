import {createStackNavigator} from "@react-navigation/stack"
import Login from "../screens/Login"
import Register from "../screens/Register"
import Admin from "../screens/Admin"
import Customer from "../screens/Customer"
import ServicesCustomer from "../screens/ServicesCustomer"
import ForgotPassword from "../screens/ForgotPassword"
import ProfileCustomer from "../screens/ProfileCustomer"
import Profile from "../screens/Profile"
import Transaction from "../screens/Refect"
import CustomerDetail from "../screens/CustomerDetail"


const Stack = createStackNavigator()

const Router = () =>{
    return(
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Admin" component={Admin}/>
            <Stack.Screen name="Customer" component={Customer}/>
            <Stack.Screen name="ServicesCustomer" component={ServicesCustomer}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
            <Stack.Screen name="Transaction" component={Transaction}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="ProfileCustomer" component={ProfileCustomer}/>
            <Stack.Screen name="CustomerDetail" component={CustomerDetail}/>



        </Stack.Navigator>
    )
}

export default Router;