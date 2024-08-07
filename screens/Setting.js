import {View} from "react-native"
import {Button} from "react-native-paper"
import { logout, useMyContextProvider } from "../index"
import { useEffect } from "react"
import { TouchableOpacity } from "react-native-gesture-handler";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';


const Setting = ({navigation}) => {
    const [controller, dispatch] = useMyContextProvider();
    const {userLogin} = controller
    useEffect(()=>{
        if(userLogin==null)
            navigation.navigate("Login")
    }, [userLogin])

    const handleLogout = () => {
        logout(dispatch);
    };

    return(
        <View style={{ padding:40, flex:1, justifyContent:"center"}}>
        <TouchableOpacity onPress={() => navigation.navigate("Transaction")}>
       <Button style={{margin: 10}}
            buttonColor="#33CCFF"
            textColor="black"
            mode="contained"
        >
            Gửi ý kiến phản ánh
        </Button>
        </TouchableOpacity>
            <Button style={{margin: 10}}
                buttonColor="#33CCFF"
                textColor="black"
                mode="contained"
                onPress={handleLogout}
            >
                Đăng Xuất
            </Button>
        </View>
        
    )
}

export default Setting