import React, { useState } from "react"
import { View, Image } from "react-native"
import { Text, TextInput, Button } from "react-native-paper"
import { TouchableOpacity } from "react-native-gesture-handler"
import firestore from '@react-native-firebase/firestore'
import storage from "@react-native-firebase/storage"
import DatePicker from "react-native-date-picker"
import RouterServiceCustomer from "../routers/RouterServiceCustomer";
import ImagePicker from "react-native-image-crop-picker"
import { useMyContextProvider } from "../index"


const AddCustomer = ({navigation}) => {
    const [controller, dispatch] = useMyContextProvider()
    const {userLogin} = controller
    const [imagePath, setImagePath] = useState('')
    const [name, setname] = useState('')
    const [open, setOpen] = useState(false)
    const [gioitinh, setgioitinh] = useState('')
    const [birth, setbirth] = useState('')
    const [date, setdate] = useState(new Date())
    const [phone, setphone] = useState('')
    const [status, setstatus] = useState('')
    const [image, setImage] = useState('')
    const Customer = firestore().collection("Customer")
    const handleAddCustomer = () => {
        Customer.add({
            name,
            gioitinh,
            birth,
            phone,
            date,
            status: "Chưa xác nhận",
            create: userLogin.idroom
        })
        .then(response =>{
            const refImage = storage().ref("/customer/" + response.id + ".png")
            refImage.putFile(imagePath)
            .then(
                ()=>
                    refImage.getDownloadURL()
                    .then(link =>
                        {
                            Customer.doc(response.id).update({
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

    return (
        <View style={{ padding: 10 }}>
            {/* <Text style={{ padding: 15, fontSize: 25, fontWeight: "bold", textAlign:"center"}}>Đăng Kí Khách Thăm</Text> */}
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tên Khách Thăm *</Text>
            <TextInput
                placeholder="Input a name"
                value={name}
                onChangeText={setname}
                style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc' }}
            />
               <Button textColor="black" buttonColor="#33CCFF" style={{margin: 10}} mode="contained" onPress={handleUploadImage}>
                Upload Image
            </Button>
            {((imagePath!= "")&&
            <Image source={{uri: imagePath}}
                style={{height: 100}}
            />
            )}
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Giới Tính *</Text>
            <TextInput
                placeholder="..."
                value={gioitinh}
                onChangeText={setgioitinh}
                style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc' }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Năm Sinh *</Text>
            <TextInput
                placeholder="..."
                value={birth}
                onChangeText={setbirth}
                style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc' }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Số Điện Thoại *</Text>
            <TextInput
                placeholder="..."
                value={phone}
                onChangeText={setphone}
                style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc' }}
            />
            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setdate(date)
                }}
                onCancel={()=>{
                    setOpen(false)
                }}
            />
            <TouchableOpacity
                onPress={()=> setOpen(true)}            
                style={{flexDirection:"row", justifyContent: "space-between"}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Chọn Thời Gian Đến: </Text>
                <Text style={{ fontSize: 20}}>{date.toDateString()}</Text>
            </TouchableOpacity>
            <Button buttonColor="#33CCFF" textColor="black" mode="contained" onPress={handleAddCustomer}>Đăng Kí</Button>
        </View>
        
    );
};

export default AddCustomer;
