import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons, AntDesign, Feather } from "@expo/vector-icons";
import Card from "../Components/CustomCard";
import Axios from "axios";
import ListItem from "../Components/ListItem";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';

function Home(props) {
  const [items, setItems] = useState([]);
  const [appView, setAppView] = useState(true);
  const [col, setCol] = useState(4);
  const [see, setSee] = useState([]);
  const [searchSee, setSearchSee] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const route = useRoute();
  const division = route.params.division;
  const navigation = useNavigation();

  const appViewToggle = () => {
    setAppView(true);
    setCol(4);
  };
  const listViewToggle = () => {
    setAppView(false);
    setCol(1);
  };

  const setShowing = () => {
    setIsShow(true);
    setSee(items);
    setSearchSee(searchResponse);
  };

  const setHiding = () => {
    setIsShow(false);
    setSee(items.slice(0, 8));
    setSearchSee(searchResponse);
  };

  const numColumns = 4;
  useEffect(() => {
    Axios.get(`http://hmt.shopcastapp.com/api/inventory/produt_list?div_id=${division}`, {
      headers: {
        Authorization: "Basic aG10QGFuZHJldzpobXRAMTIzIw==",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }).then((res) =>
      console.log(
        "Response",
        res.data.data.length,
        setItems(res.data.data),
        setSee(res.data.data.slice(0, 8))
      )
    );
  }, [division]);

  const searchItem = (value) => {
    console.log("Value---------------------------------------", value);
    setSearchResult(value);
    Axios.post(
      "http://hmt.shopcastapp.com/api/inventory/produt_search",
      { keyword: value,div_id: division },
      {
        headers: {
          Authorization: "Basic aG10QGFuZHJldzpobXRAMTIzIw==",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      }
    ).then((res) => {
      console.log(
        "Response",
        res.data.data.length,
        setItems(res.data.data),
        isShow ? setSee(res.data.data) : setSee(res.data.data.slice(0, 8))
      );
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{ margin: 10, marginTop: 30, padding: 6, marginBottom: 30 }}
      >
        <View
          style={{ display: "flex", flexDirection: "row", marginBottom: 8 }}
        >
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

        <View style={styles.offerRow}>
          <Pressable style={styles.offerButton} onPress={()=>navigation.navigate('Offers')}><Text style={styles.offerButtonText}>Ongoing Offers</Text></Pressable>
          {!isShow ? (
            <TouchableOpacity onPress={setShowing} style={styles.showButton}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#5DBA63",
                  fontWeight: "700",
                  fontSize: 12,
                }}
              >
                see all
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={setHiding} style={styles.showButton}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#5DBA63",
                  fontWeight: "700",
                  fontSize: 12,
                }}
              >
                see less
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {appView ? (
          <FlatList
            style={{ marginBottom: 40 }}
            key={"_"}
            keyExtractor={(item) => "_" + item.item_id}
            data={see}
            renderItem={({ item }) => <Card item={item} />}
            numColumns={col}
          />
        ) : (
          <FlatList
            style={{ marginBottom: 40 }}
            key={"#"}
            keyExtractor={(item) => "#" + item.item_id}
            data={see}
            renderItem={({ item }) => <ListItem item={item} />}
            numColumns={col}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  showButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 2,
    paddingVertical: 5,
    width: 70,
    marginLeft: "auto",
    textAlign: "center",
    marginBottom: 8,
    borderRadius: 4,
  },
  offerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  offerButton: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  offerButtonText: {
    color: "#5DBA63",
  },
});

export default Home;
