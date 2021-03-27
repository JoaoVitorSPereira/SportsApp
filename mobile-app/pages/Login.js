import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isLoggedIn from '../hooks/isLoggedIn';
import {
  SecondaryButton,
  PrimaryButton,
  Label,
  Header,
  Form,
  Container,
  ButtonText,
} from '../styles/StyledLogin';

const bgImage = require('../assets/background.jpg');

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

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const submitHandler = async () => {
    try {
      const response = await fetch('http://192.168.0.7:8080/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const { user, user_id } = await response.json();

      if (user && user_id) {
        await AsyncStorage.setItem('user', user);
        await AsyncStorage.setItem('user_id', user_id);
        navigation.navigate('Dashboard');
      }

      console.log('😊 SUBMITED', user_id);
    } catch (error) {
      console.log('🧐 error on Register.', error);
    }
  };

  const registerInsteadHandler = () => {
    setPassword(null);
    setEmail(null);
    navigation.navigate('Register');
  };

  return (
    <Container>
      <ImageBackground source={bgImage} style={styles.image}>
        <Header>Sport's app. </Header>
        <Form>
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
            <ButtonText>LOGIN</ButtonText>
          </PrimaryButton>

          <SecondaryButton onPress={registerInsteadHandler}>
            <ButtonText>REGISTER</ButtonText>
          </SecondaryButton>
        </Form>
      </ImageBackground>
    </Container>
  );
};

export default Login;
