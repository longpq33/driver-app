import React from 'react';
import { Text, View, Button, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { CommonActions } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button title="Sign out"  onPress={handleSignOut}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default HomeScreen;