import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import LoginScreenImage from '../assets/LoginScreenImage.png';

const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // State to track login error
    const auth = FIREBASE_AUTH;

    const handleSignIn = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User signed in successfully:", user);
            navigation.navigate('Home');
        } catch (error) {
            console.error("Error signing in:", error);
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.MainContainer}>
            <View style={styles.ContainerHeader}>
                <Image source={LoginScreenImage} style={styles.HeaderImage} />
                <Text style={styles.Text}>A Journey{'\n'}Created For You</Text>
            </View>
            <View style={styles.LoginForm}>
                <TextInput
                    value={email}
                    style={[styles.input, error && styles.inputError]} // Apply error style conditionally
                    placeholder="Email"
                    onChangeText={(text) => {
                        setEmail(text);
                        setError(null); // Reset error state when text changes
                    }}
                />
                <TextInput
                    secureTextEntry
                    value={password}
                    style={[styles.input, error && styles.inputError]} // Apply error style conditionally
                    placeholder="Password"
                    onChangeText={(text) => {
                        setPassword(text);
                        setError(null); // Reset error state when text changes
                    }}
                />
                {error && <Text style={styles.errorText}>{error}</Text>} {/* Display error message */}
                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttontext}>Login</Text>
                </TouchableOpacity>
                <View style={styles.textregister}>
                    <Text style={styles.signuptext1}>Don't have an account? </Text>
                    <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.signuptext2}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#7A9AED',
    },
    ContainerHeader: {
        backgroundColor: '#7A9AED',
        alignItems: 'center',
        height: '60%',
        justifyContent: 'center',   
    },
    HeaderImage: {
        width: '100%',
        height: '50%',
    },
    Text: {
        marginTop: '8%',
        fontWeight: '700',
        fontSize: 30,
        textAlign: 'center',
        lineHeight: 45,
        color: '#FFFFFF',
    },
    LoginForm: {
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
    inputError: {
        borderColor: 'red', // Change border color to red for error
    },
    errorText: {
        color: 'red', // Set error text color to red
        marginTop: 5,
        alignSelf: 'center',
    },
    button: {
        marginTop: '10%',
        width: '72%',
        height: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#7A9AED',
        borderRadius: 20,
    },
    buttontext: {
        color: 'white',
        fontWeight: 500,
        fontSize: 12,
    },
    textregister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '5%',
    },
    signuptext1: {
        fontSize: 13,
        fontWeight: '700',
        lineHeight: 19.5,
        color: '#7A9AED',
    },
    signuptext2: {
        fontSize: 13,
        fontWeight: '700',
        lineHeight: 19.5,
        color: '#7A9AED',
        textDecorationLine: 'underline', 
    },
});

export default Login;
