import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LoginScreenImage from '../assets/LoginScreenImage.png'
import { FIREBASE_AUTH } from '../FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {

    //Variables
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;


    const SignIn = async () => {
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        }
        catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message)
        }
        finally {
            setLoading(false);
        }
    }

    return(
        <View style={styles.MainContainer}>
             
             <View style={styles.ContainerHeader}>

                <Image source={LoginScreenImage} style={styles.HeaderImage} />

                <Text style={styles.Text}>A Journey{'\n'}Created For You </Text>

             </View>


             <View style={styles.LoginForm}>

             <TextInput
             value={email}
              style={styles.input}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
            secureTextEntry={true}
             value={password}
              style={styles.input}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate(
                    ''
                )   
            }}>
            <Text style={styles.buttontext}>Login</Text>
            </TouchableOpacity>

            <View style={styles.textregister}>

             <Text style={styles.signuptext1}>Don't have an account? </Text>

             <TouchableOpacity style={styles.signup} onPress={() => {
                navigation.navigate(
                    'Register'
                )   
            }}><Text style={styles.signuptext2}>Sign Up</Text></TouchableOpacity>

             </View>

             </View>

            
        </View>
    );

}

const styles = StyleSheet.create({

    MainContainer:{
        flex: 1,
        backgroundColor: '#7A9AED',
    },

    ContainerHeader:{
        backgroundColor: '#7A9AED',
        alignItems: 'center',
        height: '60%',
        justifyContent: 'center',   
    },

    HeaderImage:{
        width: '100%',
        height: '50%',
    },

    Text:{
        marginTop: '8%',
        fontWeight: '700',
        fontSize: 30,
        textAlign: 'center',
        lineHeight: 45,
        color: '#FFFFFF',
    },

    LoginForm:{
        height: '100%',
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        top: '-5%',
    },

    input: {
        height: '5%',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#7A9AED',
        marginTop: '7%',
        color: '#7A9AED',
        fontSize: 15,
        lineHeight: 22.5,
        fontWeight: '700',
        paddingLeft: '4%',
      },

    
      button:{
        marginTop: '10%',
        width: '72%',
        height: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#7A9AED',
        borderRadius: 20,
    },

    buttontext:{
        color: 'white',
        fontWeight: 500,
        fontSize: 12,
    },

    textregister:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '5%',
    },

    signuptext1:{
        fontSize: 13,
        fontWeight: '700',
        lineHeight: 19.5,
        color: '#7A9AED',
    },

    signuptext2:{
        fontSize: 13,
        fontWeight: '700',
        lineHeight: 19.5,
        color: '#7A9AED',
        textDecorationLine: 'underline', 
    },
});

export default Login;