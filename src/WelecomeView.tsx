
import { useApp } from '@realm/react';
import React, { useCallback, useState } from 'react'
import { TextInput, Pressable,Alert } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
function WelecomeView() {
    console.log("welcome view page")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(true);

    const app = useApp();

    const signIn = useCallback(async () =>{
        const creds = Realm.Credentials.emailPassword(email,password);
        console.log("creds=",creds)
        await app.logIn(creds)
    },[app,email,password])

    const CreateAccount = useCallback(async () => {
        try {
            console.log("email:", email)
            console.log("password:", password)
            await app.emailPasswordAuth.registerUser({email,password});
            await signIn();
        }
        catch (err:any) {
            console.log("err:", err);
            Alert.alert(`Failed to sign up: ${err?.message}`);
        }
    }, [signIn,app,email, password])

    const Login =useCallback(async ()=>{
        try {
            await signIn();
          } catch (error: any) {
            Alert.alert(`Failed to sign in: ${error?.message}`);
          }
    },[signIn])

    const StatusChange = () => {
        setStatus(!status)
    }

    return (
        <SafeAreaView >
            <View style={styles.viewWrapper}>
                <Text style={styles.title}>My Sync App</Text>
                <Text style={styles.subTitle}>
                    Please log in or register with a Device Sync user account. This is
                    separate from your Atlas Cloud login.
                </Text>
                <TextInput
                    placeholder='email'
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder='Password'
                    secureTextEntry
                    onChangeText={setPassword}
                    autoCapitalize="none"

                />
                {status ? (
                    <>
                        <Pressable
                            onPress={() => CreateAccount()}
                        >
                            <Text style={styles.mainButton}>Create New Account</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => StatusChange()}
                        >
                            <Text >Already have an account? Log In</Text>
                        </Pressable>
                    </>
                ) : (
                    <>
                     <Pressable
                            onPress={() => Login()}
                        >
                            <Text style={styles.mainButton}>Login</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => StatusChange()}
                        >
                            <Text >Don't have an account? Create Account</Text>
                        </Pressable>
                    </>
                )}



            </View>
        </SafeAreaView>
    )
}

export default WelecomeView

const styles = StyleSheet.create({
    viewWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%"
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    subTitle: {
        fontSize: 14,
        padding: 10,
        color: 'gray',
        textAlign: 'center',
    },
    mainButton: {
        width: 350,
        height: 20,
        color: 'white',
        backgroundColor: "#00684A",
        textAlign: 'center'
    },
})