import { AntDesign } from "@expo/vector-icons";
import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, ScrollView,TouchableOpacity,Alert, Modal,TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderDetailItem from "../Components/OrderDetailItem";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Axios from 'axios';
import {connect} from 'react-redux';
import {emptyCart} from '../Redux/Action'
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from '@react-navigation/native';
import { color } from "react-native-reanimated";

function OrderSummary(props) {
 
  const [modalVisible, setModalVisible] = useState(false);
  const [payment, setPayment] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [client, setClient] = useState({})
  const route = useRoute();
  const togglePayment = () => {
    setPayment(!payment);
  };
  const toggleInvoice = () => {
    setInvoice(!invoice);
  };
  
  const price = route.params.price;
  const items = route.params.items;
  const [salesData, setSalesData] = useState([])
  const [delivery, setDelivery] = useState('')
  const [date, setDate] = useState('')

  

  const navigation = useNavigation();
  console.log('Logs-------------------------------',items,'price',price)


  const makeSaleRequest = () => {

    setSalesData([]);

    items.map(item=>{
       item.item?salesData.push({item_id: item.item_id,quantity: item.item,packing_format: 'ea',uom_qty:1,uom_price:item.ea_price*1,discount:0,discount_value:0,markup:0}):''
       item.alter?salesData.push({item_id: item.item_id,quantity: item.alter,packing_format: 'out',uom_qty:6,uom_price:item.out_price*6,discount:0,discount_value:0,markup:0}):''
       item.cartoon
         ? salesData.push({
             item_id: item.item_id,
             quantity: item.cartoon,
             packing_format: "ctn",
             uom_qty: 24,
             uom_price: item.ctn_price*24,
             discount: 0,
             discount_value: 0,
             markup: 0,
           })
         : "";
       console.log('------------------',{item_id: item.item_id,quantity: item.cartoon,packing_format: 'ctn',uom_qty:item.cartoon,uom_price:item.ctn_price,discount:0,discount_value:0,markup:0})
    })
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const delDate = `${day}-${month}-${year}`;
    
    console.log('DAte/???????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',delDate);
    const data = {
      customer_id: client?.customer_id,
      date: delDate,
      remark: 'This is Api test',
      deposit: 0,
      discount: 0,
      items: salesData
    }

    console.log('SalesData----------------------------******(((((()))))),',data)

    Axios.post('http://hmt.shopcastapp.com/api/sales_order/save_so',data,{
      headers: {
        Authorization: "Basic aG10QGFuZHJldzpobXRAMTIzIw==",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }).then(res=>{console.log('response...........................Add sales----------------',res.data)
      if(res.data.flag==101){console.log("TRue"),
        setModalVisible(true),
        navigation.navigate("division"),
        props.deleteCart(),
        setSalesData([]);};
  })

  }

  // useEffect(()=>{
  //   AsyncStorage.getItem('Date').then(res=>{
  //     console.log('Date',date,setDate(JSON.parse(res)))
  //   })
  //   AsyncStorage.getItem('client').then(res=>{
  //     console.log('RESponse Order Summart==========================',res,setClient(JSON.parse(res)))
      
  //   })
  // },[])


  useFocusEffect(
    
    React.useCallback(() => {


      AsyncStorage.getItem('date').then(res=>{
        console.log('Date****************************???????????????????//////',res,setDate(res))
      })
      AsyncStorage.getItem('client').then(res=>{
        console.log('RESponse Order Summart==========================',res,setClient(JSON.parse(res)))
      })
    }, [navigation])
  );





  console.log('Client------------------------------',client)
  return (
    <SafeAreaView style={{ flex: 1, margin: 12,marginBottom:22 }}>
      <ScrollView>
      
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>The Order of {client?.name} is completed</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#5DBA63' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Thanks</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>



      <View style={styles.headers}>
        <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
          <Text style={styles.backText}>
            <AntDesign name="left" color="#5DBA63" size={16} /> Back
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Summary</Text>
      </View>
        <Text style={styles.title}>Deliver To</Text>
        <View style={styles.deliverContainer}>
          <View style={[styles.row, { borderTopWidth: 1 }]}>
            <Text style={styles.field}>Customer</Text>
            <Text style={styles.value}>{client?.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.field}>Outlet</Text>
            <Text style={styles.value}>{client?.outlet}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.field}>Address</Text>
            <Text style={styles.value}>{client?.address}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.field}>Contact Person</Text>
            <Text style={styles.value}>{client?.contactPerson}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.field}>Phone</Text>
            <Text style={styles.value}>{client?.phone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.field}>Email</Text>
            <Text style={styles.value}>{client?.email}</Text>
          </View>
        </View>
        <Text style={styles.title}>Order Details</Text>
        <View style={styles.orderDetailsContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 14
            }}
          >
            <Text>Order ID: <Text style={{color:'#A5A5A5'}}>1232213</Text></Text>
            <Text>Delivery Date:<Text style={{color:'#A5A5A5'}}> {date}</Text></Text>
          </View>
          <View style={styles.header}>
            <Text style={[styles.entity, { flex: 2 }]}>Product</Text>
            <Text style={styles.entity}>UOM</Text>
            <Text style={styles.entity}>Packing Format</Text>
            <Text style={styles.entity}>Quantity</Text>
            <Text style={styles.entity}>Unit Price</Text>
            <Text style={styles.entity}>Offer</Text>
            <Text style={styles.entity}>Discount</Text>
            <Text style={styles.entity}>Amount</Text>
          </View>
          {items?.map(item=><OrderDetailItem key={item.item_id} item={item} date={date}/>)}
          
          <View style={styles.bottomRow}>
            <Text style={styles.text}>Subtotal</Text>
            <Text
              style={[
                styles.text,
                { borderLeftWidth: 1, borderLeftColor: "#777777", width: 85 },
              ]}
            >
              ${price}
            </Text>
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.text}>Fair Trade Tax</Text>
            <Text
              style={[
                styles.text,
                { borderLeftWidth: 1, borderLeftColor: "#777777", width: 85 },
              ]}
            >
              $0
            </Text>
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.text}>Sale Tax</Text>
            <Text
              style={[
                styles.text,
                { borderLeftWidth: 1, borderLeftColor: "#777777", width: 85 },
              ]}
            >
              $0
            </Text>
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.total}>Total</Text>
            <Text
              style={[
                styles.total,
                { borderLeftWidth: 1, borderLeftColor: "#777777", width: 85 },
              ]}
            >
              ${price}
            </Text>
          </View>
        </View>
        <Text style={styles.title}>Payment</Text>
        <View style={styles.boxContainer}>
          <View style={styles.paymentBox}>
            <View style={styles.cashRow}>
              <Text>Cash</Text>
              <TouchableOpacity onPress={togglePayment} style={styles.check}>
                {payment && (
                  <AntDesign
                    name="check"
                    color="#fff"
                    style={{ backgroundColor: "#5DBA63" }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.paymentDoneText}>Payment Done!</Text>
            <Text style={styles.paymentDescription}>
              Handover to representative
            </Text>
          </View>
          <View style={styles.invoiceBox}>
            <View style={styles.cashRow}>
              <Text style={styles.boxTitle}>{`Customer Code: ${client.ac}`}</Text>
              <TouchableOpacity onPress={toggleInvoice} style={styles.check}>
                {invoice && (
                  <AntDesign
                    name="check"
                    color="#fff"
                    style={{ backgroundColor: "#5DBA63" }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.invoiceText}>Super Market</Text>
            <Text style={styles.invoiceText}>ID:</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: "#5DBA63",
              borderRadius: 12,
              padding: 12,
              textAlign: "center",
              color: "white",
              marginBottom: 12,
            }}
          >
            <Text onPress={makeSaleRequest} style={{ color: "white", fontSize: 16, fontWeight: "400" }}>
              Place Order
            </Text>
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>
            By continuing,you agree to the Terms and policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const mapStateToProps = state => {
  return {
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCart: ()=>dispatch(emptyCart())
  }
}

export default  connect(mapStateToProps,mapDispatchToProps)(OrderSummary)



const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 20,
    color: "#202020",
    marginVertical: 12,
  },
  deliverContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
  },
  row: {
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderTopWidth: 0,
    display: "flex",
    flexDirection: "row",
  },
  field: {
    borderRightWidth: 1,
    borderRightColor: "#A5A5A5",
    paddingHorizontal:8,
    paddingVertical: 8,
    fontSize: 16,
    width:90
  },
  value: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 13,
    color: "#A5A5A5",
    flex:1
    
  },
  header: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: "#A5A5A5",
    borderWidth: 1,
    justifyContent: "space-between",
  },
  entity: {
    borderRightWidth: 1,
    borderRightColor: "#A5A5A5",
    flex: 1,
    textAlign: "center",
    paddingTop: 12,
    color: "#000",
  },
  orderDetailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
  },
  bottomRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderTopWidth: 0,
    paddingHorizontal: 8,
  },
  total: {
    color: "#777777",
    fontSize: 16,
    fontWeight: '700',
    height: 30,
    paddingTop: 4,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: "#777777",
    height: 30,
    paddingTop: 4,
    textAlign: "center",
  },
  payment: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#202020",
  },
  check: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#777777",
    overflow: "hidden",
  },
  cashRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentBox: {
    backgroundColor: "#fff",
    textAlign: "center",
    padding: 12,
    borderRadius: 12,
    width: 300,
    marginRight: 12,
  },
  invoiceBox: {
    backgroundColor: "#fff",
    marginRight: 12,
    padding: 12,
    borderRadius: 12,
    width: 300,
  },
  paymentDoneText: {
    color: "#5DBA63",
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 8,
  },
  paymentDescription: {
    color: "#777777",
    fontWeight: "400",
    fontSize: 12,
    marginBottom: 6,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#202020",
  },
  invoiceText: {
    fontWeight: "400",
    fontSize: 14,
  },
  boxContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 14,
  },
  buttonContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginVertical: 12
  },
  orderButton: {
    textAlign: "center",
    backgroundColor: "#000",
    backgroundColor: 12,
  },
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
    
    marginVertical: 18,
    marginRight: 60
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
