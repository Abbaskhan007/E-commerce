import React from "react";
import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import { EvilIcons, AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ListItem({item}) {
 
  const navigation = useNavigation();
  const category = item.description.split('-')[0]
  const name = item.description.split('-')[1]
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('productDetails',{item:item,id: item.item_id})} style={styles.listItemContainer}>
      <Image
        style={styles.images}
        source={{
          uri: item.image}}
      />
      <View>
      <Text style={styles.nameText}>{category}</Text>
      <Text style={styles.nameText}>{name.trim()}</Text>
      </View>
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    display: "flex",
    flexDirection: "row",
    height: 70,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 12,
    marginVertical: 8,
    borderRadius: 12
  },
  images: {
    width: 60,
    height: 60,
    backgroundColor: "transparent",
    resizeMode: "contain",
    marginRight: 20
  },
  price: {
    fontSize: 14,
    fontWeight: "400",
  },
  off: {
    fontWeight: "400",
    fontSize: 14,
    color: "#777777",
  },
  nameText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
