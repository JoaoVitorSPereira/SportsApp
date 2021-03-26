import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, ImageBackground, Image } from 'react-native';
import ActionButton from 'react-native-action-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  IonIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import isLoggedIn from '../hooks/isLoggedIn';

const bgImage = require('../assets/background.jpg');

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Header = styled.Text`
  font-weight: bold;
  color: #f04a5b;
  font-size: 32px;
  margin-bottom: 8px;
`;

const Flat = styled.FlatList`
  padding-right: 20px;
  padding-left: 20px;
  width: 100%;
`;

const Box = styled.View`
  background-color: #fff;
  opacity: 0.9;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 8px;
`;

const BoxText = styled.Text`
  font-size: 20px;
  margin-bottom: 8px;
  font-weight: bold;
  color: #444;
`;

const BoxSport = styled.Text`
  font-size: 16px;
  color: #444;
`;

const BoxDescription = styled.Text`
  font-size: 16px;
  color: #444;
`;

const BoxPrice = styled.Text`
  color: #999;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: bold;
`;

const RegisterButton = styled.TouchableOpacity`
  height: 42px;
  background-color: green;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-top: 20px;
  align-self: stretch;
`;

const PrimaryButton = styled.TouchableOpacity`
  height: 42px;
  background-color: red;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-top: 20px;
  align-self: stretch;
`;

const BoldText = styled.Text`
  font-weight: bold;
  color: #000;
  font-size: 14px;
`;

const ButtonText = styled.Text`
  color: #fff;
`;

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
  const [modalIsVisible, setModalIsVisible] = useState(false);
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
            console.log(item);
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
        {modalIsVisible ? <BoldText>Is visible </BoldText> : null}
        <PrimaryButton onPress={logoutHandler}>
          <ButtonText>Logout</ButtonText>
        </PrimaryButton>
      </ImageBackground>
      <ActionButton buttonColor="#007bff" offsetX={4} offsetY={60}>
        <ActionButton.Item
          title="New Event"
          onPress={() => setModalIsVisible(true)}
        >
          <IonIcons name="ios-create" style={styles.actionButton} />
        </ActionButton.Item>
      </ActionButton>
    </Container>
  );
};

export default Dashboard;
