import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const Profile = (props) => {
  const {
    id,
    name,
    picture,
    phone,
    email,
    salary,
    position,
  } = props.route.params.item;

  const openDial = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('tel:123');
    } else {
      Linking.openURL('telprompt:123');
    }
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#0033ff', '#6bc1ff']}
        style={{ height: '20%' }}
      />
      <View style={{ alignItems: 'center' }}>
        <Image
          style={{
            width: 140,
            height: 140,
            borderRadius: 140 / 2,
            marginTop: -50,
          }}
          source={{ uri: picture }}
        />
      </View>
      <View style={{ alignItems: 'center', margin: 15 }}>
        {name? <Title>{name}</Title> :null}
        {position? <Text style={{ fontSize: 18 }}>{position}</Text>: null}
      </View>
      <Card
        style={styles.myCard}
        onPress={() => {
          Linking.openURL('mailto:');
        }}
      >
        <View style={styles.cardContent}>
          <MaterialIcons name='email' size={32} color='blue' />
         {email? <Text style={styles.mytext}>{email}</Text>: null}
        </View>
      </Card>
      <Card
        style={styles.myCard}
        onPress={() => {
          openDial();
        }}
      >
        <View style={styles.cardContent}>
          <Entypo name='phone' size={32} color='blue' />
          {phone? <Text style={styles.mytext}>{phone}</Text>: null}
        </View>
      </Card>
      <Card style={styles.myCard}>
        <View style={styles.cardContent}>
          <MaterialIcons name='attach-money' size={32} color='blue' />
          {salary ? <Text style={styles.mytext}>{salary}</Text>: null}
        </View>
      </Card>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button
          theme={theme}
          icon='account-edit'
          mode='contained'
          onPress={() => console.log('saved')}
        >
          Edit
        </Button>
        <Button
          theme={theme}
          icon='delete'
          mode='contained'
          onPress={() => console.log('saved')}
        >
          Fire
        </Button>
      </View>
    </View>
  );
};

const theme = {
  colors: {
    primary: 'blue',
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  myCard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 8,
  },
  mytext: {
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5,
  },
});
export default Profile;
