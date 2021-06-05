import React from "react";
import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import {connect} from 'react-redux'
import {addOffer} from '../Redux/Action'

 function OfferCard({item, addOffers, state}) {
   console.log('***************************',item)
  return (
    <TouchableOpacity onPress={()=>addOffers(item)} style={styles.container}>
      <Text style={styles.offerText}>
        Buy {item?.offer_Details?.FOC} {item.UOM}
      </Text>
      <Text style={styles.offerText}>
        GET {item?.offer_Details?.target} {item.UOM} free
      </Text>
      <Image
        style={styles.image}
        source={{
          uri: item.image,
        }}
      />
      <Text style={styles.title}>{item.description.split("-")[0]}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.description}>{item.description.split("-")[1]}</Text>
        <Text style={styles.price}>{item?.offer_Details?.Price1}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
    margin: 6,
  },
  offerText: {
    color: "#5DBA63",
    fontSize: 14,
    fontWeight: "900",
  },
  title: {
    color: "#202020",
    fontSize: 14,
    fontWeight: "900",
  },
  description: {
    color: "#7C7C7C",
    fontSize: 14,
    fontWeight: "900",
  },
  bottomRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    color: "#5DBA63",
    fontSize: 14,
    fontWeight: "bold",
  },
  image: {
    width: 70,
    height: 70,
    alignSelf: "center",
    marginVertical: 4,
    resizeMode: 'contain',
  },
  
});

const mapStateToProps = (state) => {
  return{
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addOffers: (item) => dispatch(addOffer(item))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(OfferCard)