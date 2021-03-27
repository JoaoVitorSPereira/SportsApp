import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, Image } from 'react-native';
import ActionButton from 'react-native-action-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
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
    height: 22,
  },
});

const Dashboard = ({ navigation }) => {
  const [user, user_id] = isLoggedIn({ navigation });
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([
    {
      _id: 'idblah',
      title: 'Santos 10km running',
      description: 'Best 10k race in the world 🌍',
      price: '50.00R$',
      thumbnail_url:
        'https://www.atribuna.com.br/image/contentid/policy:1.120307:1601137666/10-KM-da-Tribuna.jpg?f=default&$p$f=1ff3e9c&q=0.8&w=1500&$w=f075b93',
      sport: 'Running',
    },
    {
      _id: 'idbleh',
      title: 'Santos 10km running',
      description: 'Best 10k race in the world 🌍',
      price: '50.00R$',
      thumbnail_url:
        'https://www.atribuna.com.br/image/contentid/policy:1.120307:1601137666/10-KM-da-Tribuna.jpg?f=default&$p$f=1ff3e9c&q=0.8&w=1500&$w=f075b93',
      sport: 'Running',
    },
    {
      _id: 'idblih',
      title: 'Santos 10km running',
      description: 'Best 10k race in the world 🌍',
      price: '50.00R$',
      thumbnail_url:
        'https://www.atribuna.com.br/image/contentid/policy:1.120307:1601137666/10-KM-da-Tribuna.jpg?f=default&$p$f=1ff3e9c&q=0.8&w=1500&$w=f075b93',
      sport: 'Running',
    },
  ]);
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
        />
        <PrimaryButton onPress={logoutHandler}>
          <ButtonText>Logout</ButtonText>
        </PrimaryButton>
      </ImageBackground>
      <ActionButton buttonColor="#007bff" offsetX={4} offsetY={60}>
        <ActionButton.Item
          title="New Event"
          onPress={() => setModalVisible(true)}
        >
          <Icon name="ios-create" style={styles.actionButton} />
        </ActionButton.Item>
      </ActionButton>
    </Container>
  );
};

export default Dashboard;
