import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TextInput, Pressable } from 'react-native'

type Props = {
    onSubmit: ({summary}: {summary: string}) => void;
  };

function CreateTodo(props:Props):React.ReactElement<Props> {

    const {onSubmit} = props;
    const [summary, setSummary] = useState('');

   

    return (
        <SafeAreaView>
            <View style={styles.viewStyle}>
                <Text style={styles.title}>Add To-Do Item</Text>

                <TextInput
                    placeholder='task name'
                    onChangeText={setSummary}
                    autoCapitalize="none"
                />
                <Pressable
                    onPress={() => onSubmit({summary})}
                >
                    <Text style={styles.saveButton}>Save</Text>
                </Pressable>
            </View>
        </SafeAreaView>

    )
}

export default CreateTodo

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        padding:20
    },
    saveButton: {
        fontSize: 18,
        fontWeight: '800',
        color: 'white',
        backgroundColor: 'green',
        padding: 5,
        textAlign:'center'
    },
    viewStyle:{
        padding:25
    }

})
