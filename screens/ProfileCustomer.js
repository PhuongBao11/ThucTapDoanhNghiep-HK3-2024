import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useMyContextProvider } from "../index";
import React, { useState, useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import { FlatList } from "react-native";



const ProfileCustomer = () =>{
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;
    const [customers, setCustomers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Customer')
            .onSnapshot(querySnapshot => {
                const customersData = [];
                querySnapshot.forEach(documentSnapshot => {
                    customersData.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setCustomers(customersData);
            });

        return () => unsubscribe();
    }, []);
    const renderItem = ({ item }) => {
        if(item.create==userLogin?.idroom)
        return(
        <View style={{ margin: 10, padding: 15, borderRadius: 15, marginVertical: 5, backgroundColor: '#e0e0e0' }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name} - {item.birth} - {item.status}</Text>
        </View>)
        else
        return    

    
    };

    return(
        <View style={{ flex: 1 }}>
         <Text style={{  fontSize: 25, fontWeight: "bold", textAlign:"center"}}>Thông Tin</Text>
            {userLogin !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Email: </Text>
                    <Text style={{ fontSize: 20}}>{userLogin.email}</Text>
                </View>
            )}
            {userLogin !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Họ và tên: </Text>
                    <Text style={{ fontSize: 20}}>{userLogin.fullName}</Text>
                </View>
            )}
            {userLogin !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Địa chỉ: </Text>
                    <Text style={{ fontSize: 20}}>{userLogin.address}</Text>
                </View>
            )}
            {userLogin !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Số điện thoại: </Text>
                    <Text style={{ fontSize: 20}}>{userLogin.phone}</Text>
                </View>
            )}
            {userLogin !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Số phòng: </Text>
                    <Text style={{ fontSize: 20}}>{userLogin.idroom}</Text>
                </View>
            )}
            <Text style={{ padding: 15, fontSize: 25, fontWeight: "bold", textAlign:"center"}}>Danh sách khách đến thăm</Text>
            <FlatList
                data={customers}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>    
           
    )
    
    
}


export default ProfileCustomer;
