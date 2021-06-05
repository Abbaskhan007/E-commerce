import React from "react";
import { View, Text, StyleSheet } from "react-native";


export default function OrderDetailItem({item}) {
    const ea = parseFloat(item.ea_price);
    const out = parseFloat(item.out_price);
    const cartoon = parseFloat(item.ctn_price);
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.productName}>{item.description}</Text>
      </View>
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}>-</Text>
          <Text style={styles.field}>-</Text>
          <Text style={styles.field}>-</Text>
      </View>
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}>Piece</Text>
          <Text style={styles.field}>Outer</Text>
          <Text style={styles.field}>Carton</Text>
      </View>
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}>{item.item}</Text>
          <Text style={styles.field}>{item.alter}</Text>
          <Text style={styles.field}>{item.cartoon}</Text>
      </View>
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}>{parseFloat(item.ea_price)}</Text>
          <Text style={styles.field}>{parseFloat(item.out_price)*6}</Text>
          <Text style={styles.field}>{parseFloat(item.ctn_price)*24}</Text>
      </View>
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}>-</Text>
          <Text style={styles.field}>-</Text>
          <Text style={styles.field}>-</Text>
      </View>
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}> - </Text>
          <Text style={styles.field}> - </Text>
          <Text style={styles.field}> - </Text>
      </View>
      <View style={styles.fieldcontainer}>
          <Text style={styles.field}>{ea*item.item}</Text>
          <Text style={styles.field}>{out*item.alter*6}</Text>
          <Text style={styles.field}>{cartoon*item.cartoon*24}</Text>
      </View>
      

    </View>
  );
}

const styles = StyleSheet.create({
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
