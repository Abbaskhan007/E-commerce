import { AntDesign } from "@expo/vector-icons";
import React, { useState,useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView  } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import Axios from 'axios'
import Autocomplete from 'react-native-autocomplete-input'
import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateOrder() {
  const [expandedClient, setExpandedClient] = useState(false);
  const handlePressClient = () => setExpandedClient(!expandedClient);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [client, setclient] = useState('')
  const [clientData, setClientData] = useState([])
  const [data, setdata] = useState([])

  useEffect(()=>{
    Axios.get("http://hmt.shopcastapp.com/api/customer/customer_list", {
      headers: {
        Authorization: "Basic aG10QGFuZHJldzpobXRAMTIzIw==",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }).then((res) =>{
      console.log(
        "Response Client data"
        
      )
      setdata(res.data.data)
      setClientData(res.data.data)}
    );
  },[])

  //  useFocusEffect(
  //   Axios.get("http://hmt.shopcastapp.com/api/customer/customer_list", {
  //     headers: {
  //       Authorization: "Basic aG10QGFuZHJldzpobXRAMTIzIw==",
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //     },
  //   }).then((res) =>{
  //     console.log(
  //       "Response Client data"
        
  //     )
  //     setClientData(res.data.data)}
  //   );

      
  //   }, [props.state,route.params.id,navigation])
  // );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    
    // const dates = date+'';
    // console.log('Date',(dates.split('T')[0]).substring(4,15))
    // setdate((dates.split('T')[0]).substring(4,15));
    // const dt = JSON.stringify(dates.split('T')[0].substring(4,15))
    // console.log('dt******************************************',dt)
    const tempData = (date+'').substring(4,15)
    AsyncStorage.setItem('date',JSON.stringify(tempData));
    hideDatePicker();
  };

  const navigation = useNavigation();

  const updateClient = (text) => {
    Keyboard.dismiss();
    setclient(text.name)
    setShow(true);
    console.log('Created Selected Text-------------------------',text)
    AsyncStorage.setItem('client',JSON.stringify(text));
  }

  //http://hmt.shopcastapp.com/api/customer/customer_search

  const changingText = (text) => {
    console.log('Item==========================',text)
    Axios.post("http://hmt.shopcastapp.com/api/customer/customer_search",{keyword: text},{
      headers: {
        Authorization: "Basic aG10QGFuZHJldzpobXRAMTIzIw==",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }).then((res) =>{
      console.log(
        "Response Client data",
        setClientData(res.data.data)
        
      )}
    );
    
    setclient(text.name);
    setShow(false);
  }

  const [show, setShow] = useState(true)
  console.log('Client..........................................................',client);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     Keyboard.dismiss();
  //     setShow(true);
  //     Axios.get("http://hmt.shopcastapp.com/api/customer/customer_list", {
  //     headers: {
  //       Authorization: "Basic aG10QGFuZHJldzpobXRAMTIzIw==",
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //     },
  //   }).then((res) =>{
  //     console.log(
  //       "Response Client data"
        
  //     )
  //     setClientData(res.data.data)}
  //   );

      
  //   }, [navigation])
  // );
  
  return (
    
     <TouchableWithoutFeedback style={{flex:1}} onPress={()=>{setShow(true),Keyboard.dismiss()}} >
       <SafeAreaView  style={{ flex: 1 }}>
     <View  style={{flex:1}}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.goBack(),Keyboard.dismiss()}}>
          <Text style={styles.backText}>
            <AntDesign name="left" color="#5DBA63" size={16} /> Back
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Create Order</Text>
      </View>
      <View style={styles.container}>
        {/* <TextInput
        onChangeText={value=>setclient(value)}
         placeholder='Enter Client Name' style={{backgroundColor:'#fff',padding: 8,fontSize:14,flex:1,marginHorizontal:12,height:40,marginVertical:'auto'}}/> 
            */}
           

<View  style={styles.autocompleteContainer}>
<Autocomplete
      placeholder='Enter the Client name'
      hideResults={show}
      data={clientData}
      keyboardShouldPersistTaps='always'
      defaultValue={client}
      inputContainerStyle={{margin:10}}
      onChangeText={text => changingText(text)}
      
      renderItem={({ item, i }) => (
        <TouchableOpacity style={{borderTopWidth:1,borderColor:'#A5A5A5',padding:8,flex:1}} onPress={() =>updateClient(item)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
      </View>
      
        <View
          style={{  borderRadius: 12, width: "30%" }}
        >
          <TouchableOpacity  onPress={showDatePicker} style={styles.topRow}>
            <Text style={styles.topRowText}>Delivery Date</Text>
            <Text>
              <AntDesign  name="down" size={20} />
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </View>
      <View style={styles.barCodeContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate('BarCode',{date,date,client:client})}>
        <Text style={styles.barCodeIcon}>
          <MaterialCommunityIcons
            name="barcode-scan"
            color="#5DBA63"
            size={34}
          />
        </Text>
        </TouchableOpacity>
        <Text style={styles.option}>Scan product</Text>
        <Text style={styles.or}>or</Text>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Home')}>
          <Text style={styles.option}>Start Browsing</Text>
        </TouchableOpacity>
      </View>
      </View >
      </SafeAreaView>
      </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex:1
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor:'#fff',
    borderRadius:8
  },
  topRowText: {
    fontSize: 15,
    fontWeight: "500",
  },
  item: {
    borderTopColor: "#b0a9a9",
    borderTopWidth: 1,
    padding: 8,
  },
  itemText: {
    fontSize: 20,
    fontWeight: "500",
  },
  barCodeIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 14,
    backgroundColor: "#fff",
    textAlign: "center",
    paddingTop: 35,
    marginBottom: 12,
  },
  barCodeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginVertical: "auto",
  },
  option: {
    fontSize: 16,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  or: {
    fontWeight: "400",
    fontSize: 12,
    marginVertical: 18,
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
    textAlign: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",

    marginVertical: 18,
    marginRight: 60,
  },
  autocompleteContainer: {
    flex: 1,
    zIndex: 1,
  }
});
