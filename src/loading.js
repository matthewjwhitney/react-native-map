import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Context from './context.js';

export default function Loading(props) {
  const {navigate} = props.navigation;
  const context = useContext(Context)

  useEffect(() => {
    setTimeout(() => context.login(), 500 )
    setTimeout(() => navigate('Screen'), 1000 )
  }, [])

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
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
