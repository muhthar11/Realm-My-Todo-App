import { useUser } from '@realm/react'
import React, { useCallback, useState } from 'react'
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native'
import { Overlay } from 'react-native-elements/dist/overlay/Overlay'
import { COLORS } from './Colors'
import CreateTodo from './CreateTodo'
import { Item } from './ItemSchema'
import { realmContext } from './RealmContext'

const {useRealm}= realmContext;

function ItemList() {
  const realm = useRealm();
  const user = useUser();
  const [showCreatedItem,setShowCreatedItem] = useState(false)
  
  
  const createItemApp = () => {
     setShowCreatedItem(true);
  }

  const createItem= useCallback(({summary}:{summary:string})=>{
    realm.write(() => {
      return new Item(realm, {
        summary,
        owner_id: user?.id,
      });
    });
  },[realm, user])




  return (
    <SafeAreaView>
      <Overlay 
        isVisible={showCreatedItem}
        onBackdropPress={() => setShowCreatedItem(false)}>
        <CreateTodo
          onSubmit={({summary})=>{
            setShowCreatedItem(false);
            createItem({summary})
          }}  
        />
      </Overlay>
      <View>
        <Pressable style={style.addItemButton} onPress={() => createItemApp()}>
          <Text style={style.addItemText}>Add To Do</Text>
        </Pressable>
      </View>
    </SafeAreaView>

  )
}

export default ItemList

const style = StyleSheet.create({
  addItemButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    marginTop: 700,
  },
  addItemText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

function setShowCreatedItem(arg0: boolean) {
  throw new Error('Function not implemented.')
}
