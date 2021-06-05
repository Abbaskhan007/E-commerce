import React, {useEffect,useState} from 'react'
import { View, Text } from 'react-native'
import Route from './Routing'
import {Provider} from 'react-redux'
import {store} from './Redux/Store'
import Login from './Screens/Login'
import Division from "./Screens/Division";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {connect} from 'react-redux'
import Offer from './Screens/Offer'
import Carousel from './Carousel'

function  App() {
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState({});
  
  console.log('User: ',user);
  const getItem = async () => {
    const item = await AsyncStorage.getItem("user");
    console.log("Async Item", item);
    if(item){
      setLogin(true)
    }
    setUser(item);
  };

  const logout = () => {
    AsyncStorage.removeItem("user");
    setLogin(false);
    console.log('Checking--------------==================----------------------')
  }

  const onLogin = () => {
    setLogin(true);
  }
  useEffect(()=>{
    getItem();
  },[login]);

  console.log('Login----------------------------',login)
// return login ? (
//   <Provider store={store}>
//     {console.log("Inside user------------------", login)}
//     <Route logout={logout} />
//   </Provider>
// ) : (
//   <Provider store={store}>
//     <Login login={onLogin} />
//   </Provider>
// );

return (
  <Carousel/>
)

}
// const mapStateToProps = (state) => {
//   return {
//     state: state,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
    
//   };
// };

export default App