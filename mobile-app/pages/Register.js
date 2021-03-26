import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import {
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isLoggedIn from '../hooks/isLoggedIn';

const bgImage = require('../assets/background.jpg');

const Container = styled.View`
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

const Form = styled.View`
  align-self: stretch;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 30px;
`;

const Label = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

const PrimaryButton = styled.TouchableOpacity`
  height: 42px;
  background-color: #007bff;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-top: 20px;
`;

const SecondaryButton = styled.TouchableOpacity`
  height: 42px;
  background-color: #f04a5b;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-top: 20px;
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
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    height: 30,
    marginBottom: 20,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

const Register = ({ navigation }) => {
  const [user, user_id] = isLoggedIn();
  const [firstName, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    if (user !== null && user_id !== null) navigation.navigate('Dashboard');
  });
  const submitHandler = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const { user, user_id } = await response.json();

      if (user && user_id) {
        await AsyncStorage.setItem('user', user);
        await AsyncStorage.setItem('user_id', user_id);
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      console.log('🧐 error on Register.');
    }
  };

  const cancelHandler = () => {
    setName(null);
    setPassword(null);
    setLastName(null);
    setEmail(null);
    navigation.navigate('Login');
  };

  return (
    <Container>
      <ImageBackground source={bgImage} style={styles.image}>
        <Header>Sport's App.</Header>
        <Form>
          <Label>First Name:</Label>
          <TextInput
            style={styles.input}
            keyboardType="default"
            autoCorrect={false}
            value={firstName}
            onChangeText={text => setName(text)}
          />
          <Label>Last Name:</Label>
          <TextInput
            style={styles.input}
            keyboardType="default"
            autoCorrect={false}
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
          <Label>Email:</Label>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Label>Password:</Label>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <PrimaryButton onPress={submitHandler}>
            <ButtonText>REGISTER</ButtonText>
          </PrimaryButton>

          <SecondaryButton onPress={cancelHandler}>
            <ButtonText>CANCEL</ButtonText>
          </SecondaryButton>
        </Form>
      </ImageBackground>
    </Container>
  );
};

export default Register;
