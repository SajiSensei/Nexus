import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import RegisterImage from '../assets/RegisterImage.png';

const Register = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Store additional user data in Firestore
            await setDoc(doc(collection(db, 'users'), user.uid), {
                name: name,
                email: email,
                height: height,
                weight: weight,
                age: age,
                sex: sex
            });

            console.log("User registered successfully:", user);
            navigation.navigate('Home');
        } catch (error) {
            console.error("Error signing up:", error);
            alert("Error signing up: " + error.message);
        }
    };

    return (
        <View style={styles.MainContainer}>
            <View style={styles.ContainerHeader}>
                <Image source={RegisterImage} style={styles.HeaderImage} />
                <Text style={styles.Text}>A Step Closer!</Text>
            </View>
            <View style={styles.LoginForm}>
                <Text style={styles.inputtext}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.inputtext}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.inputtext}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Text style={styles.inputtext}>Confirm Password</Text>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <View style={styles.formcontainer}>
                
                    <View style={styles.left}>

                    <Text style={styles.inputtext}>Height (cm)</Text>
                    <TextInput
                        style={styles.input2}
                        value={height}
                        onChangeText={setHeight}
                    />
                    <Text style={styles.inputtext}>Weight (kg)</Text>
                    <TextInput
                        style={styles.input2}
                        value={weight}
                        onChangeText={setWeight}
                    />

                    </View>

                    <View style={styles.right}>
                    <Text style={styles.inputtext}>Age</Text>
                    <TextInput
                        style={styles.input2}
                        value={age}
                        onChangeText={setAge}
                    />
                    <Text style={styles.inputtext}>Sex (Male/Female)</Text>
                    <TextInput
                        style={styles.input2}
                        value={sex}
                        onChangeText={setSex}
                    />

                    </View>

                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttontext}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({

    MainContainer:{
        flex: 1,
        backgroundColor: '#7A9AED',
    },

    ContainerHeader:{
        backgroundColor: '#7A9AED',
        alignItems: 'center',
        height: '40%',
        justifyContent: 'center',   
    },

    HeaderImage:{
        width: '60%',
        height: '80%',
        top: '-5%',
    },

    Text:{
        top: '-12%',
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
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '4%',
    },

    inputtext:{
        fontSize: 15,
        lineHeight: 22.5,
        fontWeight: '700',
        color: '#7A9AED',
        marginLeft: '1.5%',
    },

    input: {
        height: '4%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#7A9AED',
        marginTop: '1%',
        marginBottom: '4%',
        color: '#7A9AED',
        fontSize: 15,
        lineHeight: 22.5,
        fontWeight: '700',
        paddingLeft: '4%',
      },

      input2: {
        height: '100%',
        width: '80%',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#7A9AED',
        marginTop: '1%',
        marginBottom: '6%',
        color: '#7A9AED',
        fontSize: 15,
        lineHeight: 22.5,
        fontWeight: '700',
        paddingLeft: '4%',
      },

    
      button:{
        top: '5%',
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

    formcontainer:{
        flexDirection: 'row',
        height: '12%',

    },

    left:{
        flex: 0.5,
        paddingLeft: '5%',
    },

    right:{
        flex:0.5,
        paddingLeft: '5%',
    },

});

export default Register;