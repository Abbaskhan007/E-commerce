import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import OfferCard from "../Components/OfferCard";
import { EvilIcons, AntDesign, Feather } from "@expo/vector-icons";
import Axios from "axios";
import OfferList from "./OfferList";

export default function Offer() {

  const [offerData, setOfferData] = useState([]);
  const [appView, setAppView] = useState(true);
  const [col, setCol] = useState(4);
  const searchItem = (value) => {
    console.log("Value---------------------------------------", value);
   
    Axios.get(`http://hmt.shopcastapp.com/api/promotions/get_offers?keyword=${value}`, {
      headers: {
        Authorization: "Basic aG10QGFuZHJldzpobXRAMTIzIw==",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }).then((res) => {
      console.log(
        "Response",
        res.data.data,
        setOfferData(res.data.data)
      );
    });
  };

  const appViewToggle = () => {
    setAppView(true);
    setCol(4);
  };
  const listViewToggle = () => {
    setAppView(false);
    setCol(1);
  };

  useEffect(() => {
    Axios.get("http://hmt.shopcastapp.com/api/promotions/get_offers", {
      headers: {
        Authorization: "Basic aG10QGFuZHJldzpobXRAMTIzIw==",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }).then(res=>setOfferData(res.data.data));
  }, []);
  console.log('Offer Data----------------------------------**',offerData)
  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", marginBottom: 8 }}>
        <View style={styles.textInputContainer}>
          <EvilIcons name="search" size={32} color="#5DBA63" />
          <TextInput
            style={styles.SearchText}
            placeholder="Enter keyword or barcode here"
            onChangeText={(value) => searchItem(value)}
          />
        </View>

        <View style={styles.sortByBox}>
          <Text>Sort by</Text>
          <Text>
            <AntDesign name="down" size={18} />
          </Text>
        </View>
        <View style={styles.viewBox}>
          <TouchableOpacity onPress={appViewToggle}>
            <Text>
              <AntDesign name="appstore-o" color="#5DBA63" size={18} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={listViewToggle}>
            <Text>
              <Feather name="menu" color="#5DBA63" size={18} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.topRow}>
        <Text>Ongoing Offers</Text>
        <Text>Date</Text>
      </View>
      {appView ? (
        <FlatList
          style={{ marginBottom: 40 }}
          key={"_"}
          keyExtractor={(item) => "_" + item.item_id}
          data={offerData}
          renderItem={({ item }) => <OfferCard item={item} />}
          numColumns={col}
        />
      ) : (
        <OfferList
          style={{ marginBottom: 40 }}
          key={"#"}
          keyExtractor={(item) => "#" + item.item_id}
          data={offerData}
          renderItem={({ item }) => <ListItem item={item} />}
          numColumns={col}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 50,
    backgroundColor: "#F7F7F7",
    flex: 1,
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 6
  },
  textInputContainer: {
    backgroundColor: "#fff",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  SearchText: {
    fontSize: 14,
    flex: 1,
  },
  sortByBox: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginRight: 8,
    width: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewBox: {
    backgroundColor: "#fff",
    width: 65,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
  },
});
