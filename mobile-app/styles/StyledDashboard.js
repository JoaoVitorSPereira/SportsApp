import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
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

export const Flat = styled.FlatList`
  padding-right: 20px;
  padding-left: 20px;
  width: 100%;
`;

export const Box = styled.View`
  background-color: #fff;
  opacity: 0.9;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 8px;
`;

export const BoxText = styled.Text`
  font-size: 20px;
  margin-bottom: 8px;
  font-weight: bold;
  color: #444;
`;

export const BoxSport = styled.Text`
  font-size: 16px;
  color: #444;
`;

export const BoxDescription = styled.Text`
  font-size: 16px;
  color: #444;
`;

export const BoxPrice = styled.Text`
  color: #999;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: bold;
`;

export const RegisterButton = styled.TouchableOpacity`
  height: 42px;
  background-color: green;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-top: 20px;
  align-self: stretch;
`;

export const DeleteButton = styled.TouchableOpacity`
  height: 42px;
  align-items: flex-end;
  border-radius: 4px;
  margin-top: 20px;
  align-self: stretch;
`;

export const PrimaryButton = styled.TouchableOpacity`
  height: 42px;
  background-color: red;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-top: 20px;
  align-self: stretch;
`;

export const BoldText = styled.Text`
  font-weight: bold;
  color: #000;
  font-size: 14px;
`;

export const ButtonText = styled.Text`
  color: #fff;
`;
