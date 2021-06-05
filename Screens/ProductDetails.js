import React, {useState,useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity ,Image,ScrollView, TextInput} from 'react-native'
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';
import Axios from 'axios'
import {connect} from 'react-redux';
import {AddToCart} from '../Redux/Action';
import {AddToAlter} from '../Redux/Action';
import {AddToCartoon} from '../Redux/Action';
import {subFromCart} from '../Redux/Action'
import {subFromAlter} from '../Redux/Action'
import {subFromCartoon} from '../Redux/Action'
import {addOffer1} from '../Redux/Action'
import {subOffer1} from '../Redux/Action'
import {delOffer1} from '../Redux/Action'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';


function ProductDetails(props) {

   const navigation = useNavigation();
    const route = useRoute();
    const [piece, setPiece] = useState(0);
    const [alter, setAlter] = useState(0);
    const [cartoon, setCartoon] = useState(0);
    const [offers, setOffers] = useState([]);
    const item = route.params.item
    const id = route.params.id;
    const [product, setProduct] = useState({})
    const [offer1, setOffer1] = useState(0)
    
    console.log('PArams',route.params.item)

    const addingCart = () => {
      props.addCart(item)
    }

    const subtractingCart = () => {
      props.subCart(item);
    }

    const addingAlter = () => {
      props.addAlter(item)
    }

    const subtractingAlter = () => {
      props.subAlter(item);
    }

    const addingCartoon = () => {
      props.addCartoon(item)
    }

    const subtractingCartoon = () => {
      props.subCartoon(item);
    }

    const deleting1 = () => {
      props.del1(item)
    }

    const adding1 = () => {
      props.add1(item)
    }

    const subtracting1 = () => {
      props.sub1(item)
    }

    console.log('updating------------------------------------',piece,alter,cartoon)

    const [current, setCurrent] = useState({item:0,alter:0,cartoon:0,ea_qty:item.ea_qty,out_qty:item.out_qty,ctn_qty:item.ctn_qty,ea_price:item.ea_price,out_price:item.out_price,ctn_price:item.ctn_price})
    const isFocused = useIsFocused();

    // useEffect(() => {
    //   const currentItems = props.state.filter(prd => prd.item_id == route.params.id);
      
    //     currentItems.length>0? setCurrent(currentItems[0]): current
    //     console.log('Current Items',currentItems[0])
      
    //   console.log('Route ID',route.params.id)
        
    //   }, [props.state,isFocused,route.params.id]);

    useFocusEffect(
      React.useCallback(() => {
        const currentItems = props.state.filter(prd => prd.item_id == route.params.id);
      currentItems.length>0? setCurrent(currentItems[0]): setCurrent({item:0,alter:0,cartoon:0,ea_qty:item.ea_qty,out_qty:item.out_qty,ctn_qty:item.ctn_qty,ea_price:item.ea_price,out_price:item.out_price,ctn_price:item.ctn_price})
        console.log('Current Items',currentItems[0])
      
      console.log('Route ID',route.params.id)
  
        
      }, [props.state,route.params.id,navigation])
    );

    const e = parseFloat(current.ea_price);
    const o = parseFloat(current.out_price)*6;
    const c = parseFloat(current.ctn_price)*24;

    return (
        <SafeAreaView style={{ flex: 1,margin: 8,marginRight: 0 }}>
          <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
          <Text style={styles.backText}>
            <AntDesign name="left" color="#5DBA63" size={16} /> Back
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Product Details</Text>
      </View>
        <ScrollView>
         <View style={{flex: 1}}>
            <View style={styles.conatiner}>
            <Image
        style={styles.images}
        source={{ uri:item.image }}
      />
      <Text style={styles.name}>{item.description}</Text>
      </View>
      <Text style={styles.title}>Packaging Size</Text>
      <View style={styles.parentDisplay} >
      <View style={styles.categoryContainer}>
            <View style={styles.topRow}>
              <View>
                <Text>Piece</Text>
                <Text>1 Piece</Text>
              </View>
              <Image
                style={styles.categoryImages}
                source={{ uri:item.image }}/>

            </View>
            <Text style={{color:'#5DBA63',fontWeight:'700',marginBottom:4}}>${e}/piece</Text>
          <Text style={{textAlign: 'center'}}>Available {current.ea_qty} Piece</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={addingCart} style={styles.minusButton}><AntDesign name='plus' size={16} color='#76BE58'/></TouchableOpacity>
            <Text>{current.item}</Text>
            <TouchableOpacity onPress={subtractingCart} style={styles.plusButton}><AntDesign name='minus' color='white' size={16}/></TouchableOpacity>
          </View>
      </View>
      {//-------------------------------------------------------------------
      }
      <View style={styles.categoryContainer}>
            <View style={styles.topRow}>
              <View>
                <Text>Outer</Text>
                <Text>6 Piece</Text>
              </View>
              <Image
                style={styles.categoryImages}
                source={{ uri:item.image }}
                />

            </View>
            <Text style={{color:'#5DBA63',fontWeight:'700',marginBottom:4}}>${o}/outer</Text>
          <Text style={{textAlign: 'center'}}>Available {current.out_qty} Outer</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={addingAlter} style={styles.minusButton}><AntDesign name='plus' size={16} color='#76BE58'/></TouchableOpacity>
            <Text>{current.alter}</Text>
            <TouchableOpacity onPress={subtractingAlter} style={styles.plusButton}><AntDesign name='minus' color='white' size={16}/></TouchableOpacity>
          </View>
      </View>
      {//----------------------------------------------------------------
      }
      <View style={styles.categoryContainer}>
            <View style={styles.topRow}>
              <View>
                <Text>Carton</Text>
                <Text>24 Piece</Text>
              </View>
              <Image
                style={styles.categoryImages}
                source={{ uri:item.image }}
               />

            </View>
            <Text style={{color:'#5DBA63',fontWeight:'700',marginBottom:4}}>${c}/carton</Text>
          <Text style={{textAlign: 'center'}}>Available {current.ctn_qty} Carton</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={addingCartoon} style={styles.minusButton}><AntDesign name='plus' size={16} color='#76BE58'/></TouchableOpacity>
            <Text>{current.cartoon}</Text>
            <TouchableOpacity onPress={subtractingCartoon} style={styles.plusButton}><AntDesign name='minus' color='white' size={16}/></TouchableOpacity>
          </View>
          

      </View>
        </View>
        <Text style={styles.title}>Ongoing offers</Text>
      <View style={styles.parentDisplay} >
        <View style={styles.categoryContainer}>
            <Text style={styles.saveText}>Save $16</Text>
            <Image
                style={styles.offerImages}
                source={{ uri:item.image }}
                />
            <Text>Buy 10 Get 1</Text>
            <Text style={styles.saveText}>offer duration</Text>
            <Text style={styles.saveText}>1st JAN to 15th FEB, 2021</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={adding1} style={styles.minusButton}><AntDesign name='plus' size={16} color='#76BE58'/></TouchableOpacity>
            <Text>{offer1}</Text>
            <TouchableOpacity onPress={subtracting1} style={styles.plusButton}><AntDesign name='minus' color='white' size={16}/></TouchableOpacity>
          </View>
        </View>
        {//-----------------------------------------------------------------
        }
        <View style={styles.categoryContainer}>
            <Text style={styles.saveText}>Save $16</Text>
            <Image
                style={styles.offerImages}
                source={{ uri:item.image }}
                />
            <Text>Buy 10 Get 1</Text>
            <Text style={styles.saveText}>offer duration</Text>
            <Text style={styles.saveText}>1st JAN to 15th FEB, 2021</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={adding1} style={styles.minusButton}><AntDesign name='plus' size={16} color='#76BE58'/></TouchableOpacity>
            <Text>{offer1}</Text>
            <TouchableOpacity onPress={subtracting1} style={styles.plusButton}><AntDesign name='minus' color='white' size={16}/></TouchableOpacity>
          </View>
        </View>
        {//-----------------------------------------------------
        }
        <View style={styles.categoryContainer}>
            <Text style={styles.saveText}>Save $16</Text>
            <Image
                style={styles.offerImages}
                source={{ uri:item.image }}
                />
            <Text>Buy 10 Get 1</Text>
            <Text style={styles.saveText}>offer duration</Text>
            <Text style={styles.saveText}>1st JAN to 15th FEB, 2021</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity  style={styles.minusButton}><AntDesign name='plus' size={16} color='#76BE58'/></TouchableOpacity>
            <Text>0</Text>
            <TouchableOpacity  style={styles.plusButton}><AntDesign name='minus' color='white' size={16}/></TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.discountPercentage}>
      <TextInput placeholder='Write discount percentage' style={styles.input}/>
      <TouchableOpacity style={styles.buttonApply}><Text style={styles.buttonText}>Apply</Text></TouchableOpacity>
      </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}


const mapStateToProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCart: (data)=>dispatch(AddToCart(data)),
    addAlter: (data)=>dispatch(AddToAlter(data)),
    addCartoon: (data)=>dispatch(AddToCartoon(data)),
    subCart: (data)=>dispatch(subFromCart(data)),
    subAlter: (data)=>dispatch(subFromAlter(data)),
    subCartoon: (data)=>dispatch(subFromCartoon(data)),
    del1: (data)=>dispatch(delOffer1(data)),
    add1: (data)=>dispatch(addOffer1(data)),
    sub1: (data)=>dispatch(subOffer1(data)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails)

const styles = StyleSheet.create({
    conatiner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    images: {
        width: 200,
        height: 150,
        borderRadius: 12,
        marginBottom: 10
    },
    name: {
        fontSize: 20,
        fontWeight: '400',
        marginBottom:12
    },
    price: {
        color: '#7C7C7C',
        fontWeight: '400',
        fontSize: 16,
        marginVertical: 2
    },
    discountText: {
        color: '#5DBA63',
        fontSize: 15,
        fontWeight: '700',
        
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        marginVertical: 10

    },
    topRow: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    categoryContainer: {
        display: 'flex',
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        flex: 1,
        marginRight: 8,
        borderRadius: 8
    },
    buttonContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 8
    },
    parentDisplay: {
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    categoryImages: {
        width: 60,
        height: 60,
    },
    offerImages: {
        width: 60,
        height: 40,
        marginVertical: 6,
        alignSelf: 'center'
    },
    plusButton: {
        backgroundColor: '#76BE58',
        padding: 5,
        borderRadius: 6
    },
   minusButton:{
       borderWidth: 1,
       borderColor: '#76BE58',
       padding: 2,
       borderRadius: 6,
       paddingLeft: 4,
       paddingVertical: 3
   },
   saveText: {
       fontSize: 12,
       color: '#7C7C7C'
   },
   input: {
       backgroundColor: '#fff',
       padding: 8,
       fontSize: 14,
       borderWidth: 0,
       flex: 1,
       borderTopLeftRadius: 6,
       borderBottomLeftRadius: 6
       
   },
   buttonApply: {
       backgroundColor: '#5DBA63',
       height: '100%',
       display: 'flex',
       justifyContent: 'center',
       paddingHorizontal: 12,
       borderTopRightRadius: 6,
       borderBottomRightRadius: 6
   },
   buttonText: {
       color: '#fff',
       fontSize: 10
   },
   discountPercentage: {
       display: 'flex',
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'center',
       width: 400,
       marginBottom: 30,
       marginTop: 12,
       height: 35,
       flex: 1,
       marginHorizontal: 'auto',
       
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

})