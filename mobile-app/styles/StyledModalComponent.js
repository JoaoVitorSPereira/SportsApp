import styled from 'styled-components';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 30px;
`;

export const PrimaryButton = styled.TouchableOpacity`
  height: 42px;
  background-color: #2196f3;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  align-self: stretch;
  margin-top: 150px;
`;

export const SecondaryButton = styled.TouchableOpacity`
  height: 42px;
  background-color: red;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  align-self: stretch;
`;

export const AddImage = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const ModalView = styled.View`
  margin: 20px;
  height: ${windowHeight};
  width: ${windowWidth};
  background-color: #fff;
  border-radius: 20px;
  padding-right: 35px;
  padding-left: 35px;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
`;
