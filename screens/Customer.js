import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterServiceCustomer from "../routers/RouterServiceCustomer";
import RouterAddCustomer from "../routers/RouterAddCustomer";
import Setting from "./Setting";
import AddCustomer from "./AddCustomer";
import RouterProfileCustomer from "../routers/RouterProfileCustomer";
import { Image } from "react-native";

const Tab = createMaterialBottomTabNavigator();

const Customer = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="RouterServiceCustomer"
        component={RouterServiceCustomer}
        options={{
          title: "Trang Chủ",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/home.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Đăng kí khách thăm"
        component={RouterAddCustomer}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/appointment.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Thông tin chủ hộ"
        component={RouterProfileCustomer}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/customer.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cài Đặt"
        component={Setting}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/setting.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Customer;
