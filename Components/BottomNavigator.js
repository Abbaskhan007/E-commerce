import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Text, Alert, Button } from 'react-native';
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Badge } from 'react-native-paper';
import {connect} from 'react-redux'
import SvgComponent from './Svg';

 function BottomNavigator(props){
  const [active, setActive] = useState('Home')
   console.log('Active',active)
    console.log('Props Length Cart Item',props.state.length)
   

        return (
            <View style={{   
                backgroundColor: 'grey'
            }}>
                <View style={{
                    alignSelf: 'center',
                    backgroundColor: '#F2F2F2',
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    bottom: 35,
                    zIndex: 10
               }}>

                    <TouchableWithoutFeedback onPress={()=>{props.props.navigation.navigate('Cart'),setActive('k')}}>
                        <View style={[styles.button, styles.actionBtn]}>
                        <Badge style={{backgroundColor:'#5DBA63',color: 'white'}}>{props.state.length}</Badge>

                        <SvgComponent icon='<svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.72726 23.9091C10.3298 23.9091 10.8182 23.4207 10.8182 22.8182C10.8182 22.2157 10.3298 21.7273 9.72726 21.7273C9.12477 21.7273 8.63635 22.2157 8.63635 22.8182C8.63635 23.4207 9.12477 23.9091 9.72726 23.9091Z" stroke="#5DBA63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.7273 23.9091C22.3298 23.9091 22.8182 23.4207 22.8182 22.8182C22.8182 22.2157 22.3298 21.7273 21.7273 21.7273C21.1248 21.7273 20.6364 22.2157 20.6364 22.8182C20.6364 23.4207 21.1248 23.9091 21.7273 23.9091Z" stroke="#5DBA63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 1H5.36364L8.28727 15.6073C8.38703 16.1095 8.66026 16.5607 9.05914 16.8818C9.45802 17.2029 9.95713 17.3734 10.4691 17.3636H21.0727C21.5847 17.3734 22.0838 17.2029 22.4827 16.8818C22.8816 16.5607 23.1548 16.1095 23.2545 15.6073L25 6.45455H6.45455" stroke="#5DBA63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'/>
                            
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{

                    position: 'absolute',
                    backgroundColor: 'white',
                    border: 2,
                    radius: 3,
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    shadowOffset: {

                        height: 3, width: 3
                    },
                    x: 0,
                    y: 0,
                    style: { marginVertical: 5 },
                    bottom: 0,
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    paddingVertical: 10,
                    paddingHorizontal: 25,
                    justifyContent: 'space-between',
                    flex: 1


                }}>

                    <View style={active=='Home'?{
                        backgroundColor: '#F7F7F7',padding:10,flex:1,height: 50,borderRadius:8,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'
                    }:{padding:10,flex:1,height: 50,borderRadius:8,flexDirection: 'row',alignItems: 'center'}}>
                        <TouchableOpacity onPress={()=>{props.props.navigation.navigate('Home'),setActive('Home')}}>
                        {active == 'Home'?<SvgComponent  icon='<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6 1H3.4C2.07452 1 1 2.07452 1 3.4V8.2C1 9.52548 2.07452 10.6 3.4 10.6H22.6C23.9255 10.6 25 9.52548 25 8.2V3.4C25 2.07452 23.9255 1 22.6 1Z" fill="#5DBA63" stroke="#5DBA63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.6 15.4H3.4C2.07452 15.4 1 16.4745 1 17.8V22.6C1 23.9255 2.07452 25 3.4 25H22.6C23.9255 25 25 23.9255 25 22.6V17.8C25 16.4745 23.9255 15.4 22.6 15.4Z" fill="#5DBA63" stroke="#5DBA63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.80005 5.79999H5.81205" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.80005 20.2H5.81205" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'/>:<SvgComponent icon='<svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6 1.19141H3.4C2.07452 1.19141 1 2.26173 1 3.58203V8.36328C1 9.68359 2.07452 10.7539 3.4 10.7539H22.6C23.9255 10.7539 25 9.68359 25 8.36328V3.58203C25 2.26173 23.9255 1.19141 22.6 1.19141Z" stroke="#96D89B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.6 15.5352H3.4C2.07452 15.5352 1 16.6055 1 17.9258V22.707C1 24.0273 2.07452 25.0977 3.4 25.0977H22.6C23.9255 25.0977 25 24.0273 25 22.707V17.9258C25 16.6055 23.9255 15.5352 22.6 15.5352Z" stroke="#96D89B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.80005 5.97266H5.81205" stroke="#96D89B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.80005 20.3164H5.81205" stroke="#96D89B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'/>}
                        </TouchableOpacity >
                        {active=='Home'?<Text>Home</Text>:null}
                        
                    </View>
                    
                    <View style={active=='Create'?{
                        backgroundColor: '#F7F7F7',padding:10,flex:1,height: 50,borderRadius:8,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',marginRight: 30
                    }:{padding:10,flex:1,height: 50,borderRadius:8,flexDirection: 'row',alignItems: 'center',marginRight: 30}}>

                        <TouchableOpacity
                            onPress={()=>{props.props.navigation.navigate('Create'), setActive('Create')}}
                        >
                           {active == 'Create'? <SvgComponent icon='<svg width="23" height="33" viewBox="0 0 23 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4 1H3.8C3.16348 1 2.55303 1.25286 2.10294 1.70294C1.65286 2.15303 1.4 2.76348 1.4 3.4V22.6C1.4 23.2365 1.65286 23.847 2.10294 24.2971C2.55303 24.7471 3.16348 25 3.8 25H18.2C18.8365 25 19.447 24.7471 19.8971 24.2971C20.3471 23.847 20.6 23.2365 20.6 22.6V8.2L13.4 1Z" fill="#5DBA63" stroke="#5DBA63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 1V8.2H18.2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.59998 20.2V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 32H21.2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'/>:<SvgComponent icon='<svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 1H3.4C2.76348 1 2.15303 1.25286 1.70294 1.70294C1.25286 2.15303 1 2.76348 1 3.4V22.6C1 23.2365 1.25286 23.847 1.70294 24.2971C2.15303 24.7471 2.76348 25 3.4 25H17.8C18.4365 25 19.047 24.7471 19.4971 24.2971C19.9471 23.847 20.2 23.2365 20.2 22.6V8.2L13 1Z" stroke="#96D89B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 1V8.2H20.2" stroke="#96D89B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6 20.2V13" stroke="#96D89B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 16.6001H14.2" stroke="#96D89B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'/>}
                       
                        </TouchableOpacity>
                        {active=='Create'?<Text>Create</Text>:null}
                    </View>
                    <View style={{flex:1}}></View>
              

                    <View style={active=='BarCode'?{
                        backgroundColor: '#F7F7F7',padding:10,flex:1,height: 50,borderRadius:8,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',marginLeft: 20
                    }:{padding:10,flex:1,height: 50,borderRadius:8,flexDirection: 'row',alignItems: 'center',marginLeft: 30}}>

                            <TouchableOpacity
                                onPress={()=>{props.props.navigation.navigate('BarCode',{date:'',client:''}),setActive('BarCode')}}
                            >
                                <SvgComponent icon='<svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30 4.39453H28.2423V1.75772H25.6038V0H30V4.39453Z" fill="#96D89B"/>
<path d="M1.75772 4.39453H0V0H4.39628V1.75772H1.75772V4.39453Z" fill="#96D89B"/>
<path d="M30 22.0381H25.6038V20.2804H28.2423V17.6437H30V22.0381Z" fill="#96D89B"/>
<path d="M4.39628 22.0381H0V17.6437H1.75772V20.2804H4.39628V22.0381Z" fill="#96D89B"/>
<path d="M3.76526 3.38928H5.52297V18.6488H3.76526V3.38928Z" fill="#96D89B"/>
<path d="M7.21704 3.38928H8.97476V15.1331H7.21704V3.38928Z" fill="#96D89B"/>
<path d="M10.6691 3.38928H12.4268V15.1331H10.6691V3.38928Z" fill="#96D89B"/>
<path d="M14.121 3.38928H15.8787V18.6488H14.121V3.38928Z" fill="#96D89B"/>
<path d="M17.5728 3.38928H19.3305V18.6488H17.5728V3.38928Z" fill="#96D89B"/>
<path d="M24.4766 3.38928H26.2343V18.6488H24.4766V3.38928Z" fill="#96D89B"/>
<path d="M21.0247 3.38928H22.7824V15.1331H21.0247V3.38928Z" fill="#96D89B"/>
<path d="M7.21704 16.891H8.97476V18.6488H7.21704V16.891Z" fill="#96D89B"/>
<path d="M10.6691 16.891H12.4268V18.6488H10.6691V16.891Z" fill="#96D89B"/>
<path d="M21.0247 16.891H22.7824V18.6488H21.0247V16.891Z" fill="#96D89B"/>
</svg>
'/>
                       
                            </TouchableOpacity>
                            {active=='Cart'?<Text>Cart</Text>:null}
                        </View>
                        <TouchableOpacity
                        onPress={()=>{props.props.navigation.navigate('Profile'),setActive('Profile')}} style={active=='Profile'?{
                        backgroundColor: '#F7F7F7',padding:10,flex:1,height: 50,borderRadius:8,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'
                    }:{padding:10,flex:1,height: 50,borderRadius:8,flexDirection: 'row',alignItems: 'center'}}
                    
                    >
                           
                                {active=='Profile'?<SvgComponent icon='<svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3333 25V22.3333C21.3333 20.9188 20.7714 19.5623 19.7712 18.5621C18.771 17.5619 17.4145 17 16 17H5.33333C3.91885 17 2.56229 17.5619 1.5621 18.5621C0.561903 19.5623 0 20.9188 0 22.3333V25" fill="#5DBA63"/>
<path d="M10.6666 11.6667C13.6121 11.6667 15.9999 9.27885 15.9999 6.33333C15.9999 3.38781 13.6121 1 10.6666 1C7.72107 1 5.33325 3.38781 5.33325 6.33333C5.33325 9.27885 7.72107 11.6667 10.6666 11.6667Z" fill="#5DBA63" stroke="#5DBA63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'/>:<SvgComponent icon='<svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.3333 25V22.3333C22.3333 20.9188 21.7714 19.5623 20.7712 18.5621C19.771 17.5619 18.4145 17 17 17H6.33333C4.91885 17 3.56229 17.5619 2.5621 18.5621C1.5619 19.5623 1 20.9188 1 22.3333V25" stroke="#96D89B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.6667 11.6667C14.6122 11.6667 17 9.27885 17 6.33333C17 3.38781 14.6122 1 11.6667 1C8.72119 1 6.33337 3.38781 6.33337 6.33333C6.33337 9.27885 8.72119 11.6667 11.6667 11.6667Z" stroke="#96D89B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'/>}
                            
                            {active=='Profile'?<Text>Profile</Text>:null}
                        </TouchableOpacity>

                </View>
            </View>
        );
    }

    
const mapStateToProps = (state) => {
    return {
        state
    }
}

export default  connect(mapStateToProps)(BottomNavigator)

const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'grey',
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 0,
        top: 5,
        left: 5,
        shadowOpacity: 5.0,

    },
    actionBtn: {
        backgroundColor: '#fff',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: '#fff'


    }


});