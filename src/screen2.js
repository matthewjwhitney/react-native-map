import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Context from './context.js';


export default function Screen2(props) {
  const context = useContext(Context)
  const {navigate} = props.navigation;

  return (
    <View style={styles.container}>
    {context.auth
      ?  <Text> Logged In </Text>
      :  <Text> Logged Out </Text>}
      <Button
        title='Home'
        onPress={() => navigate('Home') }
      />
      <Button
        title='Logout'
        onPress={() => context.logout() }
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
