import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from 'axios'
import {connect} from 'react-redux'
import {logout} from '../Redux/Action'
import { useRoute } from "@react-navigation/native";

function Division({ removeUser, logouts }) {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const route = useRoute();

  console.log(
    "*********************************parsms********************",
    route.params,
    logouts
  );

  const onDivisionPress = (div) => {
    navigation.navigate("Home", { division: div });
  };

  const getUser = async () => {
    var userData = await AsyncStorage.getItem("user");
    setUser(JSON.parse(userData));
  };

  useEffect(() => {
    getUser();
  }, []);

  const loggingOut = () => {
    removeUser();
    logouts();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Division</Text>
      <Pressable style={styles.logoutButton} onPress={loggingOut}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
      <View style={styles.buttonContainer}>
        {user?.DIVA == "o" ? (
          <Pressable style={styles.button} onPress={() => onDivisionPress(1)}>
            <Text style={styles.buttonText}>Division A</Text>
          </Pressable>
        ) : (
          <Text></Text>
        )}
        {user?.DIVB == "o" ? (
          <Pressable style={styles.button} onPress={() => onDivisionPress(2)}>
            <Text style={styles.buttonText}>Division B</Text>
          </Pressable>
        ) : (
          <Text></Text>
        )}
        {user?.DIVC == "o" ? (
          <Pressable style={styles.button} onPress={() => onDivisionPress(3)}>
            <Text style={styles.buttonText}>Division C</Text>
          </Pressable>
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: () => dispatch(logout())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Division)

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    marginTop: -75,
  },
  button: {
    backgroundColor: "#5DBA63",
    padding: 4,
    borderRadius: 8,
    marginVertical: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 8,
    fontWeight: "200",
  },
  logoutButton: {
    backgroundColor: "#5DBA63",
    
    borderRadius: 8,
    marginVertical: 12,
    width: 110
  },
});
