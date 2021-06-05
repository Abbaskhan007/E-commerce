import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {login} from "../Redux/Action";
import { connect } from "react-redux";
import Axios from 'axios';


function Login({addLogin,login,logout}) {
 
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  
  
  const loginFunction = () => {
      console.log('Login Pressed')
      Axios.post(
        "http://hmt.shopcastapp.com/api/authentication/user_login",
        { username: name, password: password},
        {
          headers: {
            Authorization: "Basic aG10QGFuZHJldzpobXRAMTIzIw==",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      ).then(res=>{
        console.log("Result data", res.data);
        if(res.data.flag == '101'){
          login();
          addLogin(
            res.data.data[0]
          );
        }
        else{
          alert('Incorrect Email and Password')
        }
      })
      
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={name}
            onChangeText={(value) => setName(value)}
            style={styles.inputField}
            placeholder="Enter username"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={true}
          />
          <Text style={styles.forgot}>Forgot password</Text>
          <Pressable style={styles.button} onPress={loginFunction}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addLogin: (data) => dispatch(login(data)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Login)

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
  label: {
    fontWeight: "900",
    fontSize: 16,
    marginTop: 12,
  },
  inputField: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontSize: 14,
    marginVertical: 10,
  },
  form: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    marginTop: -150,
    textAlign: "center",
  },
  forgot: {
    color: "#5DBA63",
    textAlign: "center",
    marginVertical: 12,
    fontSize: 13,
  },
  button: {
    backgroundColor: "#5DBA63",
    padding: 4,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 8,
  },
});
