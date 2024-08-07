import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text ,TextInput} from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { Image, TouchableOpacity, Alert } from "react-native";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

const Reflect = ({navigation}) => {
    const [reflect, setReflect] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Reflect')
            .onSnapshot(querySnapshot => {
                const reflectData = [];
                querySnapshot.forEach(documentSnapshot => {
                    reflectData.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setReflect(reflectData);
            });

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ margin: 10,padding: 15, borderRadius: 15, marginVertical: 5, backgroundColor: '#e0e0e0' }}>
            <Menu>
                <MenuTrigger>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}> Tiêu đề: {item.name} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}> Nội dung: {item.content} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}> Trạng Thái: {item.status} </Text>
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption onSelect={() => handleDetail(item)}><Text>Xác Nhận</Text></MenuOption>
                    <MenuOption onSelect={() => handleUpdate(item)}><Text>Từ Chối</Text></MenuOption>
                    <MenuOption onSelect={() => handleDelete(item)}><Text>Xóa</Text></MenuOption>
                </MenuOptions>
            </Menu>
        </TouchableOpacity>
    );
    const handleDetail = async (reflect) => {
        try {
            const unsubscribe = firestore()
            .collection('Reflect')
            .doc(reflect.id)
            .update({
                status: "Xác nhận"
            });        } catch (error) {
            console.error("Lỗi", error);
            return () => unsubscribe();
        }
    }
    const handleUpdate = async (reflect) => {
        try {
            const unsubscribe = firestore()
            .collection('Reflect')
            .doc(reflect.id)
            .update({
                status: "Từ chối"
            });        } catch (error) {
            console.error("Lỗi", error);
            return () => unsubscribe();
        }
    }
    const handleDelete = (reflect) => {
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
                            .collection('Reflect')
                            .doc(reflect.id)
                            .delete()
                            .then(() => {
                                console.log("Dịch vụ đã được xóa thành công!");
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
                data={reflect}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Reflect;
