import React from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import { Card, FAB } from 'react-native-paper';

const Home = ({ navigation }) =>{
  const data = [
    {
      id: '1',
      name: 'muk',
      email: 'hi@hi.com',
      salary: '123',
      phone: '123',
      position: 'web d',
    },
    {
      id: '2',
      name: 'muk',
      email: 'hi@hi.com',
      salary: '123',
      phone: '123',
      position: 'web d',
    },
    {
      id: '3',
      name: 'muk',
      email: 'hi@hi.com',
      salary: '123',
      phone: '123',
      position: 'web d',
    },
    {
      id: '4',
      name: 'duk',
      email: 'hi@hi.com',
      salary: '123',
      phone: '123',
      position: 'web d',
    },
  ];
  
  const renderList = (item) => (
    <Card style={styles.mycard}
    onPress={()=>navigation.navigate("Profile",{item})}
    >
      <View style={styles.cardView}>
        {/* <Image style={{ width: 50, height: 50, borderLeftWidth: 30 }} /> */}
        <View style={{ marginLeft: 10 }}>
          {item.name ? (
            <Text style={styles.text}>
              {item.name}
            </Text>
          ) : null}
          {item.position ? (
            <Text style={styles.text}>
              {item.position}
            </Text>
          ) : null}
        </View>
      </View>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) =>{
            return renderList(item)}
        }
        
        keyExtractor={item => item.id }
      />
      <FAB
        onPress={() => navigation.navigate("CreateEmployee")}
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{ colors: { accent: '#0000FF' } }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  myCard: {
    margin: 5,
    padding: 5,
  },
  cardView: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
