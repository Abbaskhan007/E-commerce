import React, {useState,useEffect} from 'react'
import { View, Text,StyleSheet, Button, TouchableOpacity } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

import { EvilIcons, AntDesign, Feather } from "@expo/vector-icons";
import Axios from 'axios'

import { useRoute } from '@react-navigation/native';
export default function BarCode() {
  const route = useRoute();
  const [items, setItems] = useState({})
  const date = route.params.date;
  const client = route.params.client;

    const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const [item, setItem] = useState(false)

  useEffect(() => {
    setItem(false);
    (async () => {
      
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {

    setScanned(true);
    Axios.post('http://hmt.shopcastapp.com/api/inventory/produt_barcode_detail',{barcode: data},{
      headers: {
        Authorization: "Basic aG10QGFuZHJldzpobXRAMTIzIw==",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }).then((res) =>{
        console.log(res.data.data)
        if(res.data.flag==100){ alert('Item not found')}
        navigation.navigate('productDetails',{item:res.data.data,id:res.data.data.item_id})
        // navigation.navigate('SalesOrder',{data:res.data.data,client:client,date:date})
     }
      )
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // setItem(true);
    // navigation.navigate('SalesOrder',{barcode:data,client:client,date:date})
    
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

    return (

 <View style={{flex:1,marginVertical: 20,marginHorizontal:40}}>
            <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.goBack()}}>
          <Text style={styles.backText}>
            <AntDesign name="left" color="#5DBA63" size={16} /> Back
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Barcode </Text>
      </View>
            <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

        

    </View>

    )
}

const styles = StyleSheet.create({
 
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
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', 
},
productName: {
    borderWidth: 1,
    borderColor: '#A5A5A5',
    flex: 1,
    color: '#A5A5A5',
    padding: 12   
},
field: {
    borderColor: '#A5A5A5',
    borderWidth: 1,
    borderLeftWidth: 0,
    paddingVertical: 8,
    textAlign: 'center',
    flex: 1,
    color: '#A5A5A5' 
},
nameContainer: {
    flex: 2
},
fieldcontainer: {
    flex: 1
},
});
