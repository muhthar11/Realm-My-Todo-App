import { useUser } from '@realm/react'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Overlay } from 'react-native-elements/dist/overlay/Overlay'
import { FlatList } from 'react-native-gesture-handler'
import { COLORS } from './Colors'
import CreateTodo from './CreateTodo'
import { Item1 } from './ItemSchema'
import { realmContext } from './RealmContext'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ObjectId } from 'bson'

const { useRealm, useQuery } = realmContext;

function ItemList() {
  const realm = useRealm();
  const user = useUser();
  const items = useQuery(Item1)
  const [showCreatedItem, setShowCreatedItem] = useState(false)

  const createItemApp = () => {
    setShowCreatedItem(true);
  }


  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(
        realm.objects(Item1).filtered(`owner_id == "${user?.id}"`)
      );
    });
  }, [realm, user]);


  const createItem = useCallback(({ summary }: { summary: string }) => {
    realm.write(() => {
      return new Item1(realm, {
        _id: new Realm.BSON.ObjectId(),
        summary,
        isComplete: false,
        owner_id: user?.id,
      });
    });
  }, [realm, user])


  const onDeleteTask = (id: ObjectId) => {
    const myItem = realm.objectForPrimaryKey(Item1, id)
    if (myItem) {
      realm.write(() => {
        realm.delete(myItem);
      });
    }
  }



  return (
    <SafeAreaView style={{flex:1}}>
      <View >
        <Overlay
          isVisible={showCreatedItem}
          onBackdropPress={() => setShowCreatedItem(false)}>
          <CreateTodo
            onSubmit={({ summary }) => {
              setShowCreatedItem(false);
              createItem({ summary })
            }}
          />
        </Overlay>

        <FlatList 
        
          data={items}
          keyExtractor={item1 => item1._id.toString()}
          renderItem={({ item }) => (

            <ListItem style={{flex:1}}
              key={`${item._id}`}
            >
              <ListItem.Title>
                {item.summary}
              </ListItem.Title>


              <Pressable  style={{alignContent:'flex-end'}} onPress={() => onDeleteTask(item._id)}>
                <FontAwesome5 name="trash-alt" />
              </Pressable>
              
            </ListItem>
          )}
        />

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
    marginTop: 10,
  },
  addItemText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})


