import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  TextInput,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import {
  ButtonText,
  Container,
  Form,
  Label,
  PrimaryButton,
  AddImage,
  SecondaryButton,
  ModalView,
} from '../styles/ModalComponent';

const ModalComponent = ({ isVisible, setVisible, user }) => {
  const [eventTitle, setEventTitle] = useState(null);
  const [eventDescription, setEventDescription] = useState(null);
  const [eventPrice, setEventPrice] = useState(null);
  const [eventSport, setEventSport] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setVisible(!isVisible);
        }}
      >
        <Container>
          <ModalView>
            <Form>
              <View>
                {image ? (
                  <TouchableOpacity onPress={pickImage}>
                    <Image
                      source={{ uri: image }}
                      style={{ width: '100%', height: 150, marginBottom: 20 }}
                    />
                  </TouchableOpacity>
                ) : (
                  <AddImage onPress={pickImage}>
                    <MaterialIcons name="add-a-photo" size={56} color="black" />
                  </AddImage>
                )}
                <Label>Event Title:</Label>
                <TextInput
                  style={styles.input}
                  placeholder={'Event Title'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={eventTitle}
                  onChangeText={text => console.log(text)}
                />
                <Label>Event Description:</Label>
                <TextInput
                  style={styles.input}
                  placeholder={'Event Description'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={eventDescription}
                  onChangeText={text => console.log(text)}
                />
                <Label>Event Price:</Label>
                <TextInput
                  style={styles.input}
                  placeholder={'Price in $00,00'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={eventPrice}
                  onChangeText={text => console.log(text)}
                />
              </View>
              <Label>Sport: {eventSport}</Label>
              <Picker
                selectedValue={eventSport}
                onValueChange={value => setEventSport(value)}
              >
                <Picker.Item label={'Running'} value={'Running'} />
                <Picker.Item label={'Cycling'} value={'Cycling'} />
                <Picker.Item label={'Swimming'} value={'Swimming'} />
              </Picker>
              <PrimaryButton onPress={() => setVisible(!isVisible)}>
                <ButtonText>Submit Event.</ButtonText>
              </PrimaryButton>
              <SecondaryButton onPress={() => setVisible(!isVisible)}>
                <ButtonText>Close</ButtonText>
              </SecondaryButton>
            </Form>
          </ModalView>
        </Container>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#007bff',
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    height: 44,
    shadowColor: '#000',
    marginBottom: 30,
    borderRadius: 4,
  },
});

export default ModalComponent;
