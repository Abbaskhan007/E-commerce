import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import CategoryCart from './CategoryCart'
import Offers from './Offers'
import {connect} from 'react-redux'
import {AddToCart} from '../Redux/Action';
import {AddToAlter} from '../Redux/Action';
import {AddToCartoon} from '../Redux/Action';
import {subFromCart} from '../Redux/Action'
import {subFromAlter} from '../Redux/Action'
import {subFromCartoon} from '../Redux/Action'
import {deleteFromCart} from '../Redux/Action'
import {addOffer} from '../Redux/Action'

function CartOrder(props) {

    const item = props.item

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

      const onDeletingCart = () => {
        props.deleteCart(item);
      }

      const addingOffers = () => {
        props.addingOffer(item)
      }

      const ea = parseFloat(item.ea_price);
      const out = parseFloat(item.out_price);
      const ctn = parseFloat(item.ctn_price);

      const e = parseFloat(item.item);
      const o = parseFloat(item.alter)*6;
      const c = parseFloat(item.cartoon)*24;
     
      

      const price = (e*ea)+(o*out)+(c*ctn)
      
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemDetail}>
          <Image style={styles.images} source={{ uri: item.image }} />
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.nameText}>{item.description}</Text>
              <TouchableOpacity onPress={onDeletingCart}>
                <AntDesign name="close" color="#76BE58" size={18} />
              </TouchableOpacity>
            </View>
            <Text style={styles.grayText}>Order Taken by: Abikhan</Text>
            <Text style={styles.deliveryDateText}>
              Date of delivery: 21st Mar, 2021
            </Text>
            <Text style={styles.deliveryDateText}>
              Date of Taken: 21st Mar, 2021
            </Text>
            <View style={styles.measurmentRow}>
              <Text style={styles.nameText}>UOM (Unit of )</Text>
              <TouchableOpacity style={styles.measurementButton}>
                <Text>
                  50 gm <AntDesign name="down" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.categoryContainer}>
          <CategoryCart
            add={addingCart}
            minus={subtractingCart}
            title="Piece"
            price={item.ea_price}
            piece="1"
            qty={item.item}
            available={item.ea_qty}
          />
          <CategoryCart
            add={addingAlter}
            minus={subtractingAlter}
            title="Outer"
            price={item.out_price}
            piece="6"
            qty={item.alter}
            available={item.out_qty}
          />
          <CategoryCart
            add={addingCartoon}
            minus={subtractingCartoon}
            title="Carton"
            price={item.ctn_price}
            piece="24"
            qty={item.cartoon}
            available={item.ctn_qty}
          />
        </View>
        <Text style={styles.title}>Offer added</Text>
        <View style={styles.offerContainer}>
          {item?.offer_Details?.map((item) => (
            <Offers addingOffers={addingOffers} item={item} />
          ))}
        </View>
        <Text style={styles.title}>Remarks</Text>
        <Text style={styles.remarksText}>
          Try to deliver each type seperately for the sake of human it is very
          ncessay for all of us to do this kind of stuff{" "}
        </Text>
        <View style={styles.price}>
          <Text style={styles.priceText}>Total</Text>
          <Text style={styles.priceText}>${price}</Text>
        </View>
      </View>
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
      addCart: (data)=>dispatch(AddToCart(data)),
    addAlter: (data)=>dispatch(AddToAlter(data)),
    addCartoon: (data)=>dispatch(AddToCartoon(data)),
    subCart: (data)=>dispatch(subFromCart(data)),
    subAlter: (data)=>dispatch(subFromAlter(data)),
    subCartoon: (data)=>dispatch(subFromCartoon(data)),
    addingOffer: (data)=>dispatch(addOffer(data))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(CartOrder);

const styles = StyleSheet.create({
    images: {
        width: 110,
        height: 100,
        marginRight: 8
    },
    itemDetail: {
        display:  'flex',
        flexDirection: 'row',
        
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 14,
        marginHorizontal: 8,
        marginVertical: 12
    },
    measurmentRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    measurementButton: {
        borderWidth: 1,
        borderColor: '#A5A5A5',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginLeft: 16,
        borderRadius: 6
    },
    deliveryDateText: {
        fontWeight: '500',
        fontSize: 14
    },
    nameText: {
        fontSize: 14,
        fontWeight: '600',
        flex:1,
        marginRight:20
    },
    grayText: {
        color: '#A5A5A5',
        fontSize: 16,
        marginBottom: 6
        
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0B0C0A',
        marginVertical: 10
    },
    remarksText: {
        color: '#A5A5A5',
        marginBottom: 12,
        fontSize: 14
    },
    price: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12
    },
    priceText: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#B4B6B3',
    },
    categoryContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    offerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
})