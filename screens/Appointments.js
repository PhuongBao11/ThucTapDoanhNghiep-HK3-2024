import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Appointments')
            .onSnapshot(querySnapshot => {
                const appointmentsData = [];
                querySnapshot.forEach(documentSnapshot => {
                    appointmentsData.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setAppointments(appointmentsData);
            });

        return () => unsubscribe();
    }, []);
    const renderItem = ({ item }) => (
        <View style={{ margin: 10, padding: 15, borderRadius: 15, marginVertical: 5, backgroundColor: '#e0e0e0' }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Chủ hộ: {item.name}</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Phòng: {item.room}</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Đã xác nhận: {item.title}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={appointments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Appointments;
