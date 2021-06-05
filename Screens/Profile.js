import React, { Component, Profiler } from 'react'
import { Text, View } from 'react-native'
import { useNavigation } from "@react-navigation/core";

export default function Profile() {
    const navigation = useNavigation();
        return (
            <View>
                <Text> Profile </Text>
            </View>
        )
    
}

