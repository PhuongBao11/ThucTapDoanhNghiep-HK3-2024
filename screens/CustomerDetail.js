import React from "react"
import { View, Image } from "react-native"
import { Text } from "react-native-paper"

const CustomerDetail = ({ route }) => {
    const { customers } = route.params
    return (
        <View style={{padding: 10}}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tên: </Text>
                <Text style={{ fontSize: 20}}>{customers.name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Năm sinh: </Text>
                <Text style={{ fontSize: 20}}>{customers.birth}</Text>           
            </View> 
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Giới tính: </Text>
                <Text style={{ fontSize: 20}}>{customers.gioitinh}</Text>           
            </View>  
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Phòng đăng kí: </Text>
                <Text style={{ fontSize: 20}}>{customers.create}</Text>
            </View>

            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ảnh Đính Kèm: </Text>
            {customers.image !== "" && (
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={{ uri: customers.image }}
                        style={{ height: 300, width: '100%' }}
                        resizeMode="contain"
                    />
                </View>
            )}
        </View>
    )
}

export default CustomerDetail;
