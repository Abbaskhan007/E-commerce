import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";

export default function CategoryCart({qty,title,add,minus,piece,available,price}) {
  const pri = parseFloat(price)*piece;
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.leftColumn}>
        <View >
          <Text style={styles.categoryText}>{title}</Text>
          <View style={{display: 'flex',flexDirection:'row'}}>
          <Text style={styles.pieceNum}>{piece} Piece</Text>
          <Text style={{color: '#A5A5A5',fontWeight:'bold',marginHorizontal:6,fontStyle:'normal'}}>|</Text>
          <Text style={styles.pieceNum}>${pri}/{title}</Text>
          </View>
        </View>
        <Text style={styles.availableText}>Available: {available} {title}</Text>
      </View>
      <View style={styles.rightColumn}>
        <TouchableOpacity onPress={add} style={styles.minusButton}><AntDesign  name='plus' size={16} color='#76BE58'/></TouchableOpacity>
        <Text>{qty}</Text>
        <TouchableOpacity onPress={minus} style={styles.plusButton}><AntDesign name='minus' color='white' size={16}/></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    categoryContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderColor: '#A5A5A5',
        borderRadius: 20,
        justifyContent: 'space-between',
        width: 220,
        height: 110,
        marginVertical: 14
    },
    leftColumn: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    categoryText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom:6
    },
    availableText: {
        color: '#A5A5A5',
        fontSize: 12,
        fontWeight: '300'
    },
    pieceNum: {

    },
    rightColumn: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
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
   }
});
