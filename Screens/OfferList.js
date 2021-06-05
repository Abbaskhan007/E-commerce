import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function OfferList({item}) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: "https://cdn4.vectorstock.com/i/1000x1000/65/48/color-sport-shoes-on-transparent-background-vector-15936548.jpg",
          }}
        />
        <View>
            <Text>{item.description}</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.offerText}>Buy 150 Carton</Text>
          <Text style={styles.offerText}>GET 12 Carton free</Text>
        </View>
        <Text>500</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 50,
    resizeMode: "contain",
  },
  block: {
    display: "flex",
    flexDirection: "column",
  },
});