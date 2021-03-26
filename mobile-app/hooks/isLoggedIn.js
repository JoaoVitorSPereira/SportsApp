import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isLoggedIn = () => {
  const [user, setUser] = useState(null);
  const [user_id, setUser_id] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        const user_id = await AsyncStorage.getItem('user_id');
        if (user !== null && user_id !== null) {
          setUser(user);
          setUser_id(user_id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [user, user_id]);

  return [user, user_id];
};

export default isLoggedIn;
