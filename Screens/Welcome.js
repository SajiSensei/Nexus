import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../assets/Logo.png'
import WelcomeScreenRun from '../assets/WelcomeScreenRun.jpg'

const Welcome = () => {

    //Variables
    const navigation = useNavigation();


    return(
        <View style={styles.MainContainer}>
             <Image source={Logo} style={styles.Logo} />

             <Text style={styles.Header}>
                NeXus
             </Text>

            <Text style={styles.subtext}>
                Your Personalized Fitness{'\n'}Coach
            </Text>

            <Image source={WelcomeScreenRun} style={styles.image1} />

             <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate(
                    'Login'
                )   
            }}>
            <Text style={styles.buttontext}>Start Your Fitness Journey</Text>
            </TouchableOpacity>

        </View>
    );

}

const styles = StyleSheet.create({

    MainContainer:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    Logo:{
        height: 84,
        width: 88,
        marginTop: '16%',
    },

    Header:{
        marginTop: '1%',
        fontSize: 45,
        fontWeight: '700',
        color: '#7A9AED',
    },

    subtext:{
        marginTop: '2%',
        fontSize: 15,
        fontWeight: '700',
        color: '#7A9AED',
        textAlign: 'center',
    },

    image1:{
        marginTop: '2%',
        height: '40%',
        width: '100%',
    },

    button:{
        marginTop: '6%',
        width: '72%',
        height: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7A9AED',
        borderRadius: 20,
    },

    buttontext:{
        color: 'white',
        fontWeight: '500',
        fontSize: 12,
    },

});

export default Welcome;