import React from "react"
import { View, Image } from "react-native"
import { Text } from "react-native-paper"

const ServiceDetail = ({ route }) => {
    const { service } = route.params
    return (
        <View style={{padding: 10}}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tên: </Text>
                <Text style={{ fontSize: 20}}>{service.title}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Người Gửi: </Text>
                <Text style={{ fontSize: 20}}>{service.create}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nội Dung: </Text>
            </View>            
             <Text style={{ fontSize: 20}}>{service.price}</Text>

            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ảnh Đính Kèm: </Text>
            {service.image !== "" && (
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={{ uri: service.image }}
                        style={{ height: 300, width: '100%' }}
                        resizeMode="contain"
                    />
                </View>
            )}
        </View>
    )
}

export default ServiceDetail;
