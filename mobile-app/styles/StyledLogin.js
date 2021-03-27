import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.Text`
  font-weight: bold;
  color: #f04a5b;
  font-size: 32px;
  margin-bottom: 8px;
`;

export const Form = styled.View`
  align-self: stretch;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 30px;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

export const PrimaryButton = styled.TouchableOpacity`
  height: 42px;
  background-color: #007bff;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-top: 20px;
`;

export const SecondaryButton = styled.TouchableOpacity`
  height: 42px;
  background-color: #f04a5b;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-top: 20px;
`;

export const ButtonText = styled.Text`
  color: #fff;
`;
