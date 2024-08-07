import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text ,TextInput} from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { Image, TouchableOpacity, Alert } from "react-native";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { useMyContextProvider } from "../index"


const Customers = ({navigation}) => {
    const [customers, setCustomers] = useState([]);
    const [controller, dispatch] = useMyContextProvider()
    const {userLogin} = controller

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

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ margin: 10,padding: 15, borderRadius: 15, marginVertical: 5, backgroundColor: '#e0e0e0' }}>
            <Menu>
                <MenuTrigger>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}> Tên: {item.name} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}> ID Phòng: {item.create} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}> SĐT: {item.phone} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}> Trạng Thái: {item.status} </Text>
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption onSelect={() => handleChitiet(item)}><Text>Xem Chi Tiết</Text></MenuOption>
                    <MenuOption onSelect={() => handleDetail(item)}><Text>Xác Nhận</Text></MenuOption>
                    <MenuOption onSelect={() => handleUpdate(item)}><Text>Từ Chối</Text></MenuOption>
                    <MenuOption onSelect={() => handleDelete(item)}><Text>Xóa</Text></MenuOption>
                </MenuOptions>
            </Menu>
        </TouchableOpacity>
    );
    const handleChitiet = (customers) => {
        navigation.navigate("CustomerDetail", { customers });
    }

    const handleDetail = async (customers) => {
        try {
            const unsubscribe = firestore()
            .collection('Customer')
            .doc(customers.id)
            .update({
                status: "Xác nhận"
            });        } catch (error) {
            console.error("Lỗi", error);
            return () => unsubscribe();
        }
    }
    const handleUpdate = async (customers) => {
        try {
            const unsubscribe = firestore()
            .collection('Customer')
            .doc(customers.id)
            .update({
                status: "Từ chối"
            });        } catch (error) {
            console.error("Lỗi", error);
            return () => unsubscribe();
        }
    }
    const handleDelete = (customers) => {
        Alert.alert(
            "Cảnh Báo",
            "Bạn có thực sự muốn xóa ?",
            [
                {
                    text: "Hủy Bỏ",
                    style: "cancel"
                },
                {
                    text: "Xác Nhận",
                    onPress: () => {
                        firestore()
                            .collection('Customer')
                            .doc(customers.id)
                            .delete()
                            .then(() => {
                                console.log("Dịch vụ đã được xóa thành công!");
                                // navigation.navigate("CustomersAdmin");
                            })
                            .catch(error => {
                                console.error("Lỗi khi xóa dịch vụ:", error);
                            });
                    },
                    style: "default"
                }
            ]
        )
    }
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
