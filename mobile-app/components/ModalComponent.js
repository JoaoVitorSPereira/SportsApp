import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
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
} from '../styles/StyledModalComponent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModalComponent = ({ isVisible, setVisible, user, loadEvents }) => {
  const [eventTitle, setEventTitle] = useState(null);
  const [eventDescription, setEventDescription] = useState(null);
  const [eventPrice, setEventPrice] = useState(null);
  const [eventSport, setEventSport] = useState(null);
  const [eventDate, setEventDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const mode = 'date';

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

  const submitEventHandler = async () => {
    const localUri = image;
    const filename = localUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    const data = new FormData();

    data.append('thumbnail', { uri: localUri, name: filename, type });
    data.append('title', eventTitle);
    data.append('description', eventDescription);
    data.append('price', eventPrice);
    data.append('date', eventDate);
    data.append('sport', eventSport);

    try {
      await fetch('http://192.168.0.7:8080/api/event', {
        method: 'POST',
        body: data,
        headers: { user: user },
      });
      loadEvents();
      cancelEventHandler();
    } catch (error) {
      console.log('error', error);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setEventDate(currentDate);
  };

  const cancelEventHandler = () => {
    setVisible(!isVisible);
    setImage(null);
    setEventTitle(null);
    setEventDescription(null);
    setEventDate(new Date());
    setEventSport(null);
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={isVisible}
        animationIn="slideInUp"
        animationOut="slideInDown"
        coverScreen={true}
        onBackdropPress={() => {
          Alert.alert('Modal has been closed.');
          setVisible(!isVisible);
        }}
        style={{ margin: 0, padding: 0 }}
      >
        <ScrollView style={styles.modalContent}>
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
                      <MaterialIcons
                        name="add-a-photo"
                        size={56}
                        color="black"
                      />
                    </AddImage>
                  )}
                  <Label>Event Title:</Label>
                  <TextInput
                    style={styles.input}
                    placeholder={'Event Title'}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={eventTitle}
                    onChangeText={text => setEventTitle(text)}
                  />
                  <Label>Event Description:</Label>
                  <TextInput
                    style={styles.input}
                    placeholder={'Event Description'}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={eventDescription}
                    onChangeText={text => setEventDescription(text)}
                  />
                  <Label>Event Price:</Label>
                  <TextInput
                    style={styles.input}
                    placeholder={'Price in $00,00'}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={eventPrice}
                    onChangeText={text => setEventPrice(text)}
                  />
                </View>
                <View>
                  <Label>Event Date: </Label>
                  <DateTimePicker
                    value={eventDate}
                    mode={mode}
                    onChange={onChange}
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
              </Form>
            </ModalView>
          </Container>
          <PrimaryButton onPress={submitEventHandler}>
            <ButtonText>Submit Event.</ButtonText>
          </PrimaryButton>
          <SecondaryButton onPress={cancelEventHandler}>
            <ButtonText>Close</ButtonText>
          </SecondaryButton>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#007bff',
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    height: 44,
    shadowColor: '#000',
    marginBottom: 15,
    borderRadius: 4,
  },
  modalContent: {
    margin: 0,
    padding: 0,
    backgroundColor: '#fff',
  },
});

export default ModalComponent;
