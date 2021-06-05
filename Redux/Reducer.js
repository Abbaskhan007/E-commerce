import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialState = [];

export const reducer = (state = initialState, action) => {
  console.log("State Reducer", state);
  console.log("Action Payload", action.payload);
  switch (action.type) {
    case "deleteCart": {
      const item = action.payload;
      const newState = state.filter((prd) => prd.item_id != item.item_id);
      console.log(
        "DeleteCart-------------------------------------------",
        newState
      );
      AsyncStorage.setItem("cartData", JSON.stringify(newState));
      return newState;
    }
    case "subCart": {
      const item = action.payload;
      const newState = state.map((prd) => {
        console.log("Prd-------------------------@@@@", prd);
        if (prd.item_id == item.item_id) {
          if (prd.item == 1 && prd.alter == 0 && prd.cartoon == 0) return null;
          if (prd.item == 0) return prd;
          return {
            ...prd,
            item: parseInt(prd.item) - 1,
            ea_qty: parseInt(prd.ea_qty) + 1,
          };
        }
        return prd;
      });
      const updatedState = newState.filter((prd) => prd != null);
      AsyncStorage.setItem("cartData", JSON.stringify(updatedState));
      return updatedState;
    }

    case "subAlter": {
      const item = action.payload;
      const newState = state.map((prd) => {
        if (prd.item_id == item.item_id) {
          if (prd.alter == 1 && prd.item == 0 && prd.cartoon == 0) return null;
          if (prd.alter == 0) return prd;
          return {
            ...prd,
            alter: parseInt(prd.alter) - 1,
            out_qty: parseInt(prd.out_qty) + 1,
          };
        }
        return prd;
      });
      console.log("Deleted--------------------------------", newState);
      const updatedState = newState.filter((prd) => prd != null);
      AsyncStorage.setItem("cartData", JSON.stringify(updatedState));
      return updatedState;
    }

    case "subOffer1": {
      const item = action.payload;
      const newState = state.map((prd) => {
        if (prd.item_id == item.item_id) {
          if (prd.offer < 1 || prd.offer == "") return null;

          return { ...prd, offer: parseInt(prd.offer) - 1 };
        }
      });
      const updatedState = newState.filter((prd) => prd != null);
      AsyncStorage.setItem("cartData", JSON.stringify(updatedState));
      return updatedState;
    }

    case "subCartoon": {
      const item = action.payload;
      const newState = state.map((prd) => {
        if (prd.item_id == item.item_id) {
          if (prd.cartoon == 1 && prd.alter == 0 && prd.item == 0) return null;
          if (prd.cartoon == 0) return prd;
          return {
            ...prd,
            cartoon: parseInt(prd.cartoon) - 1,
            ctn_qty: parseInt(prd.ctn_qty) + 1,
          };
        }
        return prd;
      });
      const updatedState = newState.filter((prd) => prd != null);
      AsyncStorage.setItem("cartData", JSON.stringify(updatedState));
      return updatedState;
    }
    case "addCart": {
      console.log(
        "Lengths------------------------------------???????????????",
        action.payload?.length,
        state.length
      );

      const findItem = state.filter(
        (prd) => prd.item_id == action.payload.item_id
      );

      if (findItem[0]?.ea_qty == 0) {
        return state;
      }

      console.log(
        "Find Item----------------------------------============-----------++++",
        findItem
      );

      if (action.payload == []) {
        console.log("111111111111111111111111111111");
        return state;
      }
      if (state.length == 0) {
        console.log("2222222222222222222222222", action.payload);
        const item = Array.isArray(action.payload)
          ? action.payload
          : [
              {
                ...action.payload,
                alter: 0,
                cartoon: 0,
                ea_qty: parseFloat(action.payload.ea_qty) - 1,
              },
            ];

        AsyncStorage.setItem("cartData", JSON.stringify(item));
        console.log("After checking array");
        return item;
      }
      const oldItem = state.filter(
        (item) => item.item_id == action.payload.item_id
      );
      if (oldItem.length == 0) {
        console.log("old Item-----------------------------------", oldItem);

        state.push({
          ...action.payload,
          alter: 0,
          cartoon: 0,
          ea_qty: parseFloat(action.payload.ea_qty) - 1,
        });
        console.log("Storage Data", [...state]);
        console.log("--------------------------------------------------------");
        AsyncStorage.setItem("cartData", JSON.stringify(state));
        return [...state];
      } else {
        const newData = state.map((item) => {
          console.log("///////////////////////////////////////////////");
          if (action.payload.ea_qty == 0)
            console.log(
              "true============================================================"
            );
          if (item.item_id == action.payload.item_id) {
            if (item.item == 0)
              return { ...item, item: 1, ea_qty: parseFloat(item.ea_qty) - 1 };
            return {
              ...item,
              item: parseInt(item.item) + 1,
              ea_qty: parseFloat(item.ea_qty) - 1,
            };
          }
          return item;
        });
        console.log("New Data ...........", newData);
        AsyncStorage.setItem("cartData", JSON.stringify(newData));
        return newData;
      }
    }
    //---------------------------------------------------------------------------------
    case "addAlter": {
      const findItem = state.filter(
        (prd) => prd.item_id == action.payload.item_id
      );

      if (findItem[0]?.out_qty == 0) {
        return state;
      }

      if (action.payload == []) {
        return state;
      }
      if (state.length == 0) {
        const item = Array.isArray(action.payload)
          ? action.payload
          : [
              {
                ...action.payload,
                cartoon: 0,
                item: 0,
                out_qty: parseFloat(action.payload.out_qty) - 1,
              },
            ];
        AsyncStorage.setItem("cartData", JSON.stringify(item));
        console.log("After checking array");
        return item;
      }
      const oldItem = state.filter(
        (item) => item.item_id == action.payload.item_id
      );
      if (oldItem.length == 0) {
        state.push({
          ...action.payload,
          item: 0,
          cartoon: 0,
          out_qty: parseFloat(action.payload.out_qty) - 1,
        });
        console.log("Storage Data", [...state]);
        console.log("--------------------------------------------------------");
        AsyncStorage.setItem("cartData", JSON.stringify(state));
        return [...state];
      } else {
        const newData = state.map((item) => {
          if (item.item_id == action.payload.item_id) {
            if (item.alter == 0)
              return {
                ...item,
                alter: 1,
                out_qty: parseFloat(item.out_qty) - 1,
              };
            return {
              ...item,
              alter: parseInt(item.alter) + 1,
              out_qty: parseFloat(item.out_qty) - 1,
            };
          }
          return item;
        });
        console.log("New Data ...........", newData);
        AsyncStorage.setItem("cartData", JSON.stringify(newData));
        return newData;
      }
    }
    //----------------------------------------------------------------------
    case "addCartoon": {
      console.log(
        "Lengths------------------------------------",
        action.payload?.length,
        state.length
      );

      const findItem = state.filter(
        (prd) => prd.item_id == action.payload.item_id
      );
      if (findItem[0]?.ctn_qty == 0) {
        return state;
      }
      if (action.payload == []) {
        console.log("111111111111111111111111111111");
        return state;
      }
      if (state.length == 0) {
        console.log("2222222222222222222222222", action.payload);
        const item = Array.isArray(action.payload)
          ? action.payload
          : [
              {
                ...action.payload,
                item: 0,
                alter: 0,
                ctn_qty: parseFloat(action.payload.ctn_qty) - 1,
              },
            ];

        AsyncStorage.setItem("cartData", JSON.stringify(item));
        console.log("After checking array");
        return item;
      }
      const oldItem = state.filter(
        (item) => item.item_id == action.payload.item_id
      );
      if (oldItem.length == 0) {
        console.log("old Item-----------------------------------", oldItem);

        state.push({
          ...action.payload,
          item: 0,
          alter: 0,
          ctn_qty: parseFloat(action.payload.ctn_qty) - 1,
        });
        console.log("Storage Data", [...state]);
        console.log("--------------------------------------------------------");
        AsyncStorage.setItem("cartData", JSON.stringify(state));
        return [...state];
      } else {
        const newData = state.map((item) => {
          console.log("///////////////////////////////////////////////");
          if (item.item_id == action.payload.item_id) {
            if (item.cartoon == 0)
              return {
                ...item,
                cartoon: 1,
                ctn_qty: parseFloat(item.ctn_qty) - 1,
              };
            return {
              ...item,
              cartoon: parseInt(item.cartoon) + 1,
              ctn_qty: parseFloat(item.ctn_qty) - 1,
            };
          }
          return item;
        });
        console.log("New Data ...........", newData);
        AsyncStorage.setItem("cartData", JSON.stringify(newData));
        return newData;
      }
    }
    case "emptyCart": {
      AsyncStorage.removeItem("cartData");

      return [];
    }

    case "login": {
      console.log("Login Reducer.........");
      AsyncStorage.setItem("user", JSON.stringify(action.payload));
    }

    case "addOffer": {
      console.log("Adding offer ***********************", action.payload);
      const findItem = state.filter(
        (prd) => prd.item_id == action.payload.item_id
      );
      if (!findItem || findItem.length < 1) {
        console.log('11111111111111111111111111111111111')
        if (action.payload.offer_Details.UOM == "Piece") {
          if (
            action.payload.ea_qty >
            action.payload.offer_Details.FOC +
              action.payload.offer_Details.target 
          ) {
            state.push({
              ...action.payload,
              item: 0,
              alter: 0,
              cartoon: 0,
              offer_Details: [{ ...action.payload.offer_Details, qty: 1 }],
            });
          }
        } else if (action.payload.offer_Details.UOM == "Outer") {
          console.log("22222222222222222222222222222222");
          if (
            action.payload.out_qty >
            action.payload.offer_Details.FOC +
              action.payload.offer_Details.target
          ) {
            console.log("33333333333333333333333333333333");
            state.push({
              ...action.payload,
              item: 0,
              alter: 0,
              cartoon: 0,
              offer_Details: [{ ...action.payload.offer_Details, qty: 1 }],
            });
          }
        } else if (action.payload.offer_Details.UOM == "Carton") {
          if (
            action.payload.ctn_qty >
            action.payload.offer_Details.FOC +
              action.payload.offer_Details.target
          ) {
            state.push({
              ...action.payload,
              item: 0,
              alter: 0,
              cartoon: 0,
              offer_Details: [{ ...action.payload.offer_Details, qty: 1 }],
            });
          }
        }} else {
          console.log('*************************1')
          const newState = state.map((item) => {
            console.log("*************************2");
            if (item.item_id == action.payload.item_id) {
              console.log("*************************3");
              if (
                item.ea_qty >
                  action.payload.offer_Details.FOC +
                    action.payload.offer_Details.FOC &&
                action.payload.offer_Details.UOM == "Piece"
              ) {
                const newOfferDetails = item.offer_Details.map((offer) => {
                  if (offer.item_id == action.payload.offer_Details.item_id && action.payload.offer_Details.UOM=='Piece') {
                    return { ...offer, qty: offer.qty + 1 };
                  }
                  return offer;
                });
                return { ...item, offer_Details: newOfferDetails };
              }
              if (
                item.out_qty >
                  action.payload.offer_Details.FOC +
                    action.payload.offer_Details.FOC &&
                action.payload.offer_Details.UOM == "Outer"
              ) {
                console.log('----11111111111111111111111111111111')
                const newOfferDetails = item.offer_Details.map((offer) => {
                  if (
                    offer.item_id == action.payload.offer_Details.item_id &&
                    action.payload.offer_Details.UOM == "Outer"
                  ) {
                    console.log("----22222222222222222222222222222222");
                    return { ...offer, qty: offer.qty + 1 };
                  }
                  console.log("----3333333333333333333333333333333333");
                  return offer;
                });
                return { ...item, offer_Details: newOfferDetails };
              }
              if (
                item.ctn_qty >
                  action.payload.offer_Details.FOC +
                    action.payload.offer_Details.FOC &&
                action.payload.offer_Details.UOM == "Carton"
              ) {
                const newOfferDetails = item.offer_Details.map((offer) => {
                  if (
                    offer.item_id == action.payload.offer_Details.item_id &&
                    action.payload.offer_Details.UOM == "Carton"
                  ) {
                    return { ...offer, qty: offer.qty + 1 };
                  }
                  return offer;
                });
                return { ...item, offer_Details: newOfferDetails };
              }
            } else {
              return item;
            }
          });
          return newState;
        }
      
    }

    // case  "addOffer1": {
    //   console.log('Lengths------------------------------------',action.payload?.length,state.length)

    //   if(action.payload == []){
    //     console.log('111111111111111111111111111111')
    //       return state;
    //   }
    //   if(state.length==0){

    //     console.log('2222222222222222222222222',action.payload)
    //     const item =  Array.isArray(action.payload)?action.payload:[action.payload]

    //     AsyncStorage.setItem('cartData',JSON.stringify(item));
    //     console.log('After checking array')
    //     return item;
    //   }
    //   const oldItem = state.filter(
    //     (item) => item.item_id == action.payload.item_id
    //   );
    //   if(oldItem.length==0){
    //     console.log('old Item-----------------------------------',oldItem)

    //     state.push(action.payload);
    //     console.log('Storage Data',[...state]);
    //     console.log('--------------------------------------------------------');
    //     AsyncStorage.setItem("cartData", JSON.stringify(state));
    //     return [...state];
    //   }
    //   else{

    //   const newData = state.map(item=>{
    //     console.log('///////////////////////////////////////////////')
    //       if(item.item_id == action.payload.item_id){
    //         if(item.offer=='') return {...item,offer: 1}
    //           return {...item,offer: parseInt(item.offer)+1}
    //       }
    //       return item
    //   })
    //   console.log('New Data ...........',newData)
    //   AsyncStorage.setItem('cartData',JSON.stringify(newData))
    //   return newData;}

    // }

    // case 'delOffer1': {
    //   const currentItem = state.map(prd=>{
    //     if(prd.item_id != action.payload) return prd;
    //     return {...prd,offer: 0}
    //   });
    //   AsyncStorage.setItem('cartData',JSON.stringify(currentItem))
    //   return currentItem;
    // }

    default:
      return state;
  }
};
