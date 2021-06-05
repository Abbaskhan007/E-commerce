import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Offers({ item,addingOffers }) {
  console.log('*************************************Offfers************************',item)
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.leftColumn}>
        <View>
          <Text style={styles.categoryText}>
            Buy {item.FOC} Get {item.target}
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.available}>Only for {item.UOM}</Text>
          </View>
        </View>
        <Text style={styles.duration}>Offer duration:</Text>
        <Text style={styles.duration}>
          `${item.start_date} to ${item.end_date}`
        </Text>
      </View>
      <View style={styles.rightColumn}>
        <TouchableOpacity onPress={addingOffers} style={styles.minusButton}>
          <AntDesign name="plus" size={16} color="#76BE58" />
        </TouchableOpacity>
        <Text>{item.qty}</Text>
        <TouchableOpacity  style={styles.plusButton}>
          <AntDesign name="minus" color="white" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderRadius: 20,
    justifyContent: "space-between",
    width: 220,
    height: 110,
    marginVertical: 14,
  },
  leftColumn: {
    display: "flex",
    justifyContent: "space-between",
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  duration: {
    color: "#777777",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14.56,
  },
  pieceNum: {},
  rightColumn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plusButton: {
    backgroundColor: "#76BE58",
    padding: 5,
    borderRadius: 6,
  },
  minusButton: {
    borderWidth: 1,
    borderColor: "#76BE58",
    padding: 2,
    borderRadius: 6,
    paddingLeft: 4,
    paddingVertical: 3,
  },
  available: {
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 13.34,
  },
});
