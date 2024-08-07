import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterService from "../routers/RouterService";
import RouterChuHo from "../routers/RouterChuHo";
import RouterAppointments from "../routers/RouterAppointments";
import RouterCustomers from "../routers/RouterCustomers";
import RouterReflect from "../routers/RouterReflect";
import Transaction from "./Refect";
import Setting from "./Setting";
import Customers from "./Customers";
import Appointments from "./Appointments";
import Profile from "./Profile";
import { Image } from "react-native";
import CustomersAdmin from "./CustomersAdmin";


const Tab = createMaterialBottomTabNavigator();

const Admin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="RouterService"
        component={RouterService}
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
        name="Danh sách xác nhận"
        component={RouterAppointments}
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
        name="Danh sách khách"
        component={RouterCustomers}
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
        name="Danh sách chủ hộ"
        component={RouterChuHo}
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
        name="Danh sách phản ánh"
        component={RouterReflect}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/account.png")}
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

export default Admin;
