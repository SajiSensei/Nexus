import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Import updateDoc
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import profile from '../assets/profile.png';
import pushup from '../assets/pushup.jpg';

const Home = () => {
    const navigation = useNavigation();
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;

    const [user, setUser] = useState(null);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBMI] = useState(null); // State to hold BMI value

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                const userDocRef = doc(db, 'users', auth.currentUser.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    setUser(userDocSnapshot.data());
                    setHeight(userDocSnapshot.data().height);
                    setWeight(userDocSnapshot.data().weight);
                    calculateBMI(userDocSnapshot.data().height, userDocSnapshot.data().weight);
                }
            }
        };

        fetchUserData();
    }, []);

    // Function to calculate BMI
    const calculateBMI = (height, weight) => {
        if (height && weight) {
            const heightInMeters = height / 100; // Convert height to meters
            const bmiValue = weight / (heightInMeters * heightInMeters);
            setBMI(bmiValue.toFixed(1)); // Round to 1 decimal place
        } else {
            setBMI(null); // Reset BMI if height or weight is not provided
        }
    };

    // Function to determine BMI classification
    const getBMIClassification = (bmi) => {
        if (bmi < 18.5) {
            return 'Underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            return 'Normal';
        } else if (bmi >= 25 && bmi < 30) {
            return 'Overweight';
        } else {
            return 'Obese';
        }
    };

    const handleUpdate = async () => {
        try {
            const userDocRef = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(userDocRef, {
                height: height,
                weight: weight
            });
            console.log("Height and weight updated successfully!");
            calculateBMI(height, weight); // Recalculate BMI after updating height and weight
        } catch (error) {
            console.error("Error updating height and weight:", error);
            alert("Error updating height and weight: " + error.message);
        }
    };

    return (
        <View style={styles.MainContainer}>
            <View style={styles.profilecontainer}>
                <Image source={profile} style={styles.profile} />
                <Text style={styles.welcome}>Welcome!</Text>
                <Text style={styles.name}>{user ? user.name : 'Name'}</Text>

                <View style={styles.measure}>
                    <View style={styles.left}>
                        <Text style={styles.textmeasure}>Height (cm)</Text>
                        <TextInput
                            style={styles.input2}
                            value={height}
                            placeholder="Height"
                            onChangeText={setHeight}
                        />
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.textmeasure}>Weight (kg)</Text>
                        <TextInput
                            style={styles.input2}
                            value={weight}
                            placeholder="Weight"
                            onChangeText={setWeight}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.changebutton} onPress={handleUpdate}> {/* Call handleUpdate onPress */}
                    <Text style={styles.changetext}>Change</Text>
                </TouchableOpacity>

                <Text style={styles.textbmi}>Current Body Mass:</Text>
                <Text style={styles.textbmi}>{bmi ? bmi : 'Calculate BMI'}</Text>
                <Text style={styles.textbmi}>{bmi ? getBMIClassification(parseFloat(bmi)) : ''}</Text>
            </View>

            <View style={styles.bodycontainer}>
                <Text style={styles.headertext}>Start Right Away!</Text>
                <Image source={pushup} style={styles.pushup} />
                <TouchableOpacity style={styles.getbutton}>
                    <Text style={styles.gettext}>Get Recommended Exercise</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    MainContainer:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#7A9AED',
    },

    profilecontainer:{
        height: '58%',
        alignItems: 'center',
        backgroundColor: '#7A9AED',
        width: '100%',
    },

    profile:{
        height: 127,
        width: 182,
        marginTop: '5%',
    },

    welcome:{
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30,
        color: '#FFFFFF',
        marginTop: '1%',
    },

    name:{
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
        lineHeight: 24,
    },

    measure:{
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '5%',
    },

    left:{
        flex: 0.5,
        paddingRight: '10%',
        alignItems: 'center',
    },

    right:{
        flex: 0.5,
        paddingLeft: '10%',
        alignItems: 'center',
    },

    textmeasure:{
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 22.5,
        color: '#FFFFFF',
    },

    input2:{
        height: 41,
        width: 140,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        color: '#7A9AED',
        fontWeight: '700',
        fontSize: 15,
        lineHeight: 22.5,
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 22.5,
        textAlign: 'center',
    },
    
    changebutton:{
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: 140,
        height: 41,
        marginTop: '8%',
    },

    changetext:{
        fontSize: 16,
        fontWeight: '700',
        color: '#7A9AED',
        lineHeight: 24,
    },

    textbmi:{
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 24,
        color: '#FFFFFF',
        marginTop: '3%',
    },

    bodycontainer:{
        height: '52%',
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        width: '100%',
        alignItems: 'center',
    },

    headertext:{
        fontWeight: '700',
        fontSize: 30,
        lineHeight: 45,
        color: '#7A9AED',
        marginTop: '3%',
    },

    pushup:{
        height: 168,
        width: 210,
    },
    
    getbutton:{
        width: 290,
        height: 52,
        borderRadius: 25,
        backgroundColor: '#7A9AED',
        justifyContent: 'center',
        alignItems: 'center',
    },

    gettext:{
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        color: '#FFFFFF',
    },

});

export default Home;
