import { AntDesign } from "@expo/vector-icons";
import React, { useState,useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartOrder from "../Components/CartOrder";
import { useNavigation } from '@react-navigation/native';
import {connect} from 'react-redux'
import {deleteFromCart} from '../Redux/Action';
import AsyncStorage from "@react-native-async-storage/async-storage";



 function Cart(props) {

  const navigation = useNavigation();
  const [price, setPrice] = useState(0);
  const [cartItem, setCartItem] = useState([])

  

  var checking = 0;

  const goToPlaceOrder = async () => {
    
    const date = await AsyncStorage.getItem('date');
  const client = await AsyncStorage.getItem('client');
  console.log('--------------------------------- Date/client',date,client)
    date && client? navigation.navigate('orderSummary',{price:price,items:cartItem}): (alert('Please add Date and Field For placing Order'),navigation.navigate('Create'))
  }

  useEffect(() => {
    console.log('State.....//////////////////////?????????????????????????............',props.state)
    setCartItem(props.state);
    setPrice(0);
    console.log('Price-----------------------------------------------------------------------------------------',price)
    props.state.map(prd=>{
      console.log('prd--------------------------------------',prd)
  
      const ea = parseFloat(prd.ea_price);
      const out = parseFloat(prd.out_price)*6;
      const cartoon = parseFloat(prd.ctn_price)*24;
      const tempPrice =  (ea*prd.item)+(out*prd.alter)+(prd.cartoon*cartoon);
      console.log('prices---------------------',ea,out,cartoon)
      console.log('Price-----------------------------',tempPrice,price)
      checking = checking+tempPrice;
      setPrice(checking)
      console.log('Checking Price------------------------------------',checking)
    })
    
  }, [props.state])


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
          <Text style={styles.backText}>
            <AntDesign name="left" color="#5DBA63" size={16} /> Back
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Cart</Text>
      </View>
      {props.state.length>0 && props.state != []? <ScrollView>
        <FlatList
          data = {props.state}
          renderItem = {({item})=> <CartOrder item={item}/>}
          />
        
        <TouchableOpacity style={styles.OrderHistoryButton}>
          <Text style={styles.orderHistoryText}>Order History</Text>
        </TouchableOpacity>
        <View style={styles.priceSection}>
          <View style={styles.row}>
            <Text style={styles.price}>Subtotal</Text>
            <Text style={styles.price}>${price}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.price}>Discount</Text>
            <Text style={styles.price}>(-) 0</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>${price}</Text>
          </View>
          <TouchableOpacity onPress={goToPlaceOrder} style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      :<View style={{display:'flex',justifyContent:'center',alignItems:'center',flex:1}}><Text style={{fontSize:22,fontWeight:'700',color: '#A5A5A5'}}>No Items in the cart</Text></View>
    }
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCart: (data) => dispatch(deleteFromCart(data)),
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);
const styles = StyleSheet.create({
  OrderHistoryButton: {
    backgroundColor: "#fff",
    width: 150,
    margin: "auto",
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 8,
    marginVertical: 10,
  },
  orderHistoryText: {
    fontWeight: "600",
    fontSize: 18,
  },
  priceSection: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
  },
  totalRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "600",
  },
  checkoutButton: {
    borderRadius: 8,
    backgroundColor: "#76BE58",
    textAlign: "center",
    padding: 8,
    marginBottom: 42,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 18,
  },
  price: {
    fontSize: 16,
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
  header: {
    display: "flex",
    flexDirection: "row",
    
    marginVertical: 18,
    marginRight: 60
  },
});
