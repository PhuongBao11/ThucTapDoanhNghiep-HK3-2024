import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('USERS')
            .where('role', '==', 'customer')
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

    const renderItem = ({ item }) => (
        <View style={{ margin: 10, padding: 15, borderRadius: 15, marginVertical: 5, backgroundColor: '#e0e0e0' }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}> Tên Chủ Hộ: {item.fullName} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}> Số Phòng: {item.idroom} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}> Email: {item.email} </Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={customers}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Customers;
