import React, { useState } from 'react';

import { StyleSheet, Text, View, Image, Modal, Alert } from 'react-native';

import { TextInput, Button } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';

import * as Permissions from 'expo-permissions';
const CreateEmployee = () => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [picture, setPicture] = useState('');
  const [position, setPosition] = useState('');
  const [modal, setModal] = useState(false);

const submitData = () =>{
    fetch("http://10.0.2.2:3000/send-data",{
      method:"post",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        salary,
        picture,
        position,
      })
    })
    .then(res=>res.json())
    .then(data =>{
       Alert.alert(`${data.name} is saved successfully `)
    })
}

const pickFromGallery = async () => {
  const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
  if (granted) {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (!data.cancelled) {
      let newFile = {
        uri: data.uri,
        type: `test/${data.uri.split(".")[1]}`,
        name: `test.${data.uri.split(".")[1]}`
      }
      handleUpload(newFile)
    }
  } else {
    Alert.alert("Permisssion is required")
  }
}

const pickFromCamera = async () => {
  const { granted } = await Permissions.askAsync(Permissions.CAMERA)
  if (granted) {
    let data = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!data.cancelled) {
      let newFile = {
        uri: data.uri,
        type: `test/${data.uri.split(".")[1]}`,
        name: `test.${data.uri.split(".")[1]}`
      }
      handleUpload(newFile)
    }
  } else {
    Alert.alert("Permisssion is required")
  }
}

const handleUpload = (image) => {
  const data = new FormData('file', image)
  data.append('upload_preset', 'employeeApp')
  data.append("cloud_name", "coding310")

  fetch("https://api.cloudinary.com/v1_1/coding310/image/upload", {
    method: "post",
    body: data

  }).then(res => res.json())
  .then(data => {
    setPicture(data.url)
    setModal(false)
  }).catch(err=>{
    Alert.alert("error while uploading")
  })
}

  return (
    <View style={styles.root}>
      <TextInput
        label='Name'
        value={name}
        style={styles.inputStyle}
        mode='outlined'
        theme={theme}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label='Position'
        value={position}
        onChangeText={(text) => setPosition(text)}
        style={styles.inputStyle}
        mode='outlined'
        theme={theme}
      />
      <TextInput
        label='Email'
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.inputStyle}
        mode='outlined'
        theme={theme}
      />
      <TextInput
        label='Phone'
        value={phone}
        style={styles.inputStyle}
        mode='outlined'
        theme={theme}
        keyboardType='number-pad'
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        label='Salary'
        value={salary}
        style={styles.inputStyle}
        mode='outlined'
        theme={theme}
        onChangeText={(text) => setSalary(text)}
      />
      <Button
        theme={theme}
        icon={picture == "" ? 'upload' : 'check'}
        mode='contained'
        onPress={() => setModal(true)}
      >
        Upload Image
      </Button>
      <Button
        theme={theme}
        icon='content-save'
        mode='contained'
        onPress={() => submitData()}
      >
        Save Profile
      </Button>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              icon='camera'
              mode='contained'
              theme={theme}
              onPress={() => pickFromCamera()}
            >
              Camera
            </Button>
            <Button
              icon='image-area'
              mode='contained'
              theme={theme}
              onPress={() => pickFromGallery()}
            >
              Gallery
            </Button>
          </View>
          <Button mode='contained' onPress={() => setModal(false)}>
            Cancel
          </Button>
        </View>
      </Modal>
    </View>
  );
};
const theme = {
  colors: {
    primary: 'blue'
  },
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputStyle: {
    margin: 5,
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
});

export default CreateEmployee;
