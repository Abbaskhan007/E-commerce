
import { StatusBar } from "expo-status-bar";
import React, { Profiler, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Screens/Home";
import CreateOrder from "./Screens/CreateOrder";
import Profile from "./Screens/Profile";
import Cart from "./Screens/Cart";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import OrderSummary from "./Screens/OrderSummary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {connect} from 'react-redux'
import {AddToCart, logout} from './Redux/Action'
import BottomNavigator from "./Components/BottomNavigator";
import BarCode from "./Screens/BarCode";
import ProductDetails from "./Screens/ProductDetails";
import SalesOrder from "./Screens/SalesOrder";
import Division from "./Screens/Division";
import Offer from "./Screens/Offer";
import Login from "./Screens/Login";


 function Route(props) {
  const Tab = createBottomTabNavigator();
  const {logout} = props;
  useEffect(() =>{
    AsyncStorage.removeItem('date');
    AsyncStorage.removeItem('client');


    AsyncStorage.getItem("cartData").then(async(res) => {
      console.log('Response...',res)
      if (res && res.length>0) {
        console.log('Response...//////////////////....',res.length)
        props.upDateCart(JSON.parse(res));
      } else {
        console.log('Else Routing.............')
        const jsonvalue = JSON.stringify([]);
        AsyncStorage.setItem("cartData", jsonvalue);
      }
    });

  }, []);


 console.log('------------------------Logout---------------------------',props.logout)
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="division"
          tabBar={(props) => <BottomNavigator props={props} />}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={{ margin: 22 }}>
                  <TouchableOpacity style={{ backgroundColor: "red" }}>
                    <Ionicons name="menu" size={32} />
                    <Text>yes</Text>
                  </TouchableOpacity>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Create"
            component={CreateOrder}
            options={{
              tabBarIcon: ({ focused }) => <Feather name="file-plus" />,
            }}
          />
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              tabBarIcon: ({ focused }) => <AntDesign name="barcode" />,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ focused }) => <Ionicons name="person-outline" />,
            }}
          />
          <Tab.Screen
            name="orderSummary"
            component={OrderSummary}
            options={{
              tabBarIcon: ({ focused }) => <Ionicons name="person-outline" />,
            }}
          />
          <Tab.Screen
            name="Offers"
            component={Offer}
            options={{
              tabBarIcon: ({ focused }) => <Ionicons name="person-outline" />,
            }}
          />
          <Tab.Screen
            name="BarCode"
            component={BarCode}
            options={{
              tabBarIcon: ({ focused }) => <Feather name="file-plus" />,
            }}
          />
          <Tab.Screen
            name="SalesOrder"
            component={SalesOrder}
            options={{
              tabBarIcon: ({ focused }) => <Feather name="file-plus" />,
            }}
          />
          <Tab.Screen
            name="productDetails"
            component={ProductDetails}
            options={{
              tabBarIcon: ({ focused }) => <Feather name="file-plus" />,
            }}
          />

          <Tab.Screen name="division">
            {(props) => <Division {...props} logouts={logout} />}
          </Tab.Screen>
          <Tab.Screen name="login" component={Login} />

          {/* <Tab.Screen
            name="bottom"
            component={BottomNavigator}
            options={{
              tabBarIcon: ({ focused }) => <Ionicons name="person-outline" />,
            }}
          /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = state => {
  console.log('State......',state)
  return {
    state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upDateCart: (data) => dispatch(AddToCart(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Route);