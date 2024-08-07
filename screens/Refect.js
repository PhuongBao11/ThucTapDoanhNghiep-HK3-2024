import React, { useState } from "react"
import { View, Image } from "react-native"
import { Text, TextInput, Button } from "react-native-paper"
import { TouchableOpacity } from "react-native-gesture-handler"
import firestore from '@react-native-firebase/firestore'
import storage from "@react-native-firebase/storage"
import DatePicker from "react-native-date-picker"
import ImagePicker from "react-native-image-crop-picker"
import { useMyContextProvider } from "../index"
import RouterServiceCustomer from "../routers/RouterServiceCustomer";


const AddReflect = ({navigation}) => {
    const [controller, dispatch] = useMyContextProvider()
    const {userLogin} = controller
    const [imagePath, setImagePath] = useState('')
    const [name, setname] = useState('')
    const [open, setOpen] = useState(false)
    const [content, setcontent] = useState('')
    const [status, setstatus] = useState('')
    const [image, setImage] = useState('')
    const Reflect = firestore().collection("Reflect")
    const handleAddReflect = () => {
        Reflect.add({
            name,
            content,
            status: "Chưa xác nhận",
            create: userLogin.idroom
        })
        .then(response =>{
            const refImage = storage().ref("/reflect/" + response.id + ".png")
            refImage.putFile(imagePath)
            .then(
                ()=>
                    refImage.getDownloadURL()
                    .then(link =>
                        {
                            Reflect.doc(response.id).update({
                                id: response.id, 
                                image: link
                            })
                            navigation.navigate("RouterServiceCustomer")
                        }
                    )
                )
            .catch(e => console.log(e.message))
        })
    }
        
    const handleUploadImage = () =>{
        ImagePicker.openPicker({
            mediaType: "photo",
            width: 400,
            height: 300
        })
        .then(image =>
            setImagePath(image.path)
        )
        .catch(e=> console.log(e.message))
    }
    return(
        <View style={{ padding: 10 }}>
            <Text style={{ padding: 15, fontSize: 25, fontWeight: "bold", textAlign:"center"}}>Phản ánh, kiến nghị</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tiêu đề*</Text>
            <TextInput
                placeholder="Input a name"
                value={name}
                onChangeText={setname}
                style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc' }}
            />     
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nội dung phản ánh *</Text>
            <TextInput
                placeholder="..."
                value={content}
                onChangeText={setcontent}
                style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc' }}
            />
               <Button textColor="black" buttonColor="#33CCFF" style={{margin: 10}} mode="contained" onPress={handleUploadImage}>
                Thêm ảnh
            </Button>
            {((imagePath!= "")&&
            <Image source={{uri: imagePath}}
                style={{height: 300}}
            />
            )}
       
            <Button buttonColor="#33CCFF" textColor="black" mode="contained" onPress={handleAddReflect}>Gửi phản ánh </Button>
        </View>
        
    );
};

export default AddReflect;
