import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, Image } from 'react-native';
import ActionButton from 'react-native-action-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalComponent from '../components/ModalComponent';
import isLoggedIn from '../hooks/isLoggedIn';
import {
  ButtonText,
  Container,
  Header,
  PrimaryButton,
  BoldText,
  Box,
  BoxDescription,
  BoxPrice,
  BoxSport,
  BoxText,
  Flat,
  RegisterButton,
  DeleteButton,
} from '../styles/StyledDashboard';
const bgImage = require('../assets/background.jpg');

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 'auto',
    height: 150,
    marginBottom: 8,
  },
  actionButton: {
    fontSize: 20,
    color: 'white',
    height: 20,
    width: 20,
  },
  deleteBtn: {
    alignItems: 'flex-end',
  },
});

const Dashboard = ({ navigation }) => {
  const [user, user_id] = isLoggedIn({ navigation });
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents('');
  }, [user]);

  const loadEvents = async (query = '') => {
    const response = await fetch(
      `http://192.168.0.7:8080/api/dashboard/${query}`,
      {
        method: 'GET',
        headers: { user: user },
      },
    );

    const jsonResponse = await response.json();
    setEvents(jsonResponse.events);
  };

  const logoutHandler = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('user_id');
    navigation.navigate('Login');
  };

  return (
    <Container>
      <ImageBackground source={bgImage} style={styles.image}>
        <Header>DASHBOARD</Header>
        <Flat
          data={events}
          showHorizontalScrollIndicator={true}
          keyExtractor={event => event._id}
          renderItem={({ item }) => {
            return (
              <Box>
                <Image
                  style={styles.thumbnail}
                  source={{ uri: item.thumbnail_url }}
                />
                <BoxText>
                  <BoldText>Title:</BoldText> {item.title}
                </BoxText>
                <BoxSport>
                  <BoldText>Sport:</BoldText> {item.sport}
                </BoxSport>
                <BoxPrice>
                  <BoldText>Price:</BoldText> {item.price}
                </BoxPrice>
                <BoxDescription>
                  <BoldText>Description:</BoldText> {item.description}
                </BoxDescription>
                {item.user === user_id ? (
                  <DeleteButton onPress={() => console.log('Register')}>
                    <Icon
                      name="md-trash"
                      style={styles.deleteBtn}
                      size={24}
                      color="red"
                    />
                  </DeleteButton>
                ) : null}
                <RegisterButton onPress={() => console.log('Register')}>
                  <ButtonText>Register</ButtonText>
                </RegisterButton>
              </Box>
            );
          }}
        />
        <ModalComponent
          isVisible={modalVisible}
          setVisible={setModalVisible}
          user={user}
          loadEvents={loadEvents}
        />
        <PrimaryButton onPress={logoutHandler}>
          <ButtonText>Logout</ButtonText>
        </PrimaryButton>
      </ImageBackground>
      <ActionButton buttonColor="#3498db" offsetX={4} offsetY={60}>
        <ActionButton.Item
          title="New Event"
          onPress={() => setModalVisible(true)}
          buttonColor="#9b59b6"
        >
          <Icon name="ios-create" style={styles.actionButton} />
        </ActionButton.Item>
        <ActionButton.Item
          title="All Events"
          onPress={() => loadEvents()}
          buttonColor="#3498db"
        >
          <Icon name="infinite" style={styles.actionButton} />
        </ActionButton.Item>
        <ActionButton.Item
          title="Running"
          onPress={() => loadEvents('Running')}
          buttonColor="#1abc9c"
        >
          <Icon name="man" style={styles.actionButton} />
        </ActionButton.Item>
        <ActionButton.Item
          title="Cycling"
          onPress={() => loadEvents('Cycling')}
          buttonColor="#1abc9c"
        >
          <Icon name="ios-bicycle" style={styles.actionButton} />
        </ActionButton.Item>
        <ActionButton.Item
          title="Swimming"
          onPress={() => loadEvents('Swimming')}
          buttonColor="#1abc9c"
        >
          <Icon name="water" style={styles.actionButton} />
        </ActionButton.Item>
      </ActionButton>
    </Container>
  );
};

export default Dashboard;
