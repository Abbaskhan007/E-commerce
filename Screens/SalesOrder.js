import React,{useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios'
import { SafeAreaView } from "react-native-safe-area-context";

import { useRoute } from '@react-navigation/native';

import { EvilIcons, AntDesign, Feather } from "@expo/vector-icons";
import OrderDetailItem from '../Components/OrderDetailItem';

export default function SalesOrder() {
    const navigation = useNavigation();
    const route = useRoute();
    const date = route.params.date;
    const client = route.params.client;
    const data = route.params.data
    const [item, setItem] = useState('')
    
  const [barcode, setBarcode] = useState(9.55519E+12)

//http://hmt.shopcastapp.com/api/inventory/produt_barcode_detail

console.log('Data...................................',data)
    
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
          <Text style={styles.backText}>
            <AntDesign name="left" color="#5DBA63" size={16} /> Back
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Sales Order</Text>
      </View>
      
      <View style={styles.orderDetailsContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 14
            }}
          >
            <Text>Order ID</Text>
            <Text>Delivery Date</Text>
          </View>
          <View style={styles.headers}>
            <Text style={[styles.entity]}>Order Date</Text>
            <Text style={styles.entity}>Barcode</Text>
            <Text style={styles.entity}>Product Code</Text>
            <Text style={styles.entity}>UOM</Text>
            <Text style={styles.entity}>Format</Text>
            <Text style={styles.entity}>Quantity</Text>
            <Text style={styles.entity}>Current Quantity</Text>
            <Text style={styles.entity}>Discount </Text>
            <Text style={styles.entity}> Total</Text>
          </View>
          <View style={styles.container}>
      <View style={styles.fieldcontainer}>
        <Text style={styles.productName}>{date}</Text>
      </View>
      
     
      
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}>{data?.barcode}</Text>
          <Text style={styles.field}>{data?.barcode}</Text>
          <Text style={styles.field}>{data?.barcode}</Text>
      </View>
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}>{data?.item_id}</Text>
          <Text style={styles.field}>{data?.item_id}</Text>
          <Text style={styles.field}>{data?.item_id}</Text>
      </View>
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}>50 gm</Text>
          <Text style={styles.field}>80 gm</Text>
          <Text style={styles.field}>120 gm</Text>
      </View>
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}>Pieces</Text>
          <Text style={styles.field}>Alter</Text>
          <Text style={styles.field}>Cartoon</Text>
      </View>
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}>10</Text>
          <Text style={styles.field}>2</Text>
          <Text style={styles.field}>1</Text>
      </View>
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}></Text>
          <Text style={styles.field}></Text>
          <Text style={styles.field}></Text>
      </View>
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}> 20%</Text>
          <Text style={styles.field}>20%</Text>
          <Text style={styles.field}>20%</Text>
      </View>
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}>{parseFloat(data?.ea_price)}</Text>
          <Text style={styles.field}>{parseFloat(data?.out_price)*6}</Text>
          <Text style={styles.field}>{parseFloat(data?.ctn_price)*24}</Text>
      </View>
      

    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonApprove}><Text style={styles.buttonText}>Approve</Text></TouchableOpacity>
      <TouchableOpacity style={styles.buttonReject}><Text style={styles.buttonText}>Reject</Text></TouchableOpacity>
    </View>
          
          
        </View>
        

    
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
  
  backButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
   
  },
  backText: {
    fontSize: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "500",
    flex: 1,
    textAlign: 'center'
  },
  headers: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: "#A5A5A5",
    borderWidth: 1,
    justifyContent: "space-between",
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
},
productName: {
  borderWidth: 1,
  borderColor: '#A5A5A5',
  flex: 1,
  color: '#A5A5A5',
  padding: 12,
  fontSize: 13 
},
field: {
  borderColor: '#A5A5A5',
  borderWidth: 1,
  borderLeftWidth: 0,
  textAlign: 'center',
  flex: 1,
  fontSize:10,
  color: '#A5A5A5',
  height:50,
  flex:1
},
nameContainer: {
  flex: 2
},
fieldcontainer: {
  height: 130,
  flex: 1
},
entity: {
  borderRightWidth: 1,
  borderRightColor: "#A5A5A5",
  flex: 1,
  textAlign: "center",
  paddingTop: 12,
  color: "#000",
},
buttonApprove: {
  backgroundColor: '#5DBA63',
  paddingHorizontal:12,
  paddingVertical:8,
  marginRight:12,
  borderRadius: 4
},
buttonReject: {
  backgroundColor: 'red',
  paddingHorizontal:12,
  paddingVertical:8,
  marginRight:12,
  borderRadius: 4
},
buttonText: {
  color:'#fff',
  fontSize: 12
},
buttonContainer: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginVertical:15
}
});



