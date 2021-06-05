import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function CustomCard({ item }) {
  
const navigation = useNavigation();

  const category = item.description.split('-')[0]
  const name = item.description.split('-')[1]

  return (
    <TouchableOpacity onPress={()=>navigation.navigate('productDetails',{item:item,id: item.item_id})} style={{ backgroundColor: "#fff", width:'23%', margin: 4,borderRadius:8,marginBottom:12,padding:6  }}>
      
      <Image
        style={styles.images}
        source={{ uri: item.image }}
      />
      <Text style={styles.nameText}>{category?.trim()}</Text>
      <Text style={styles.nameText}>{name?.trim()}</Text>
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  discountText: {
    color: "#b0a9a9",
    fontSize: 10
  },
  nameText: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom:4
  },
  bottomRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: 12,
    fontWeight: "500",
    
  },
  images: {
    width: "100%",
    height: 85,
    backgroundColor: "transparent",
    resizeMode: "contain",
  },
});
