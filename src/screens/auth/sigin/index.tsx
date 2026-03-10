import React from 'react';
import { Text, View, Button } from 'react-native';
import { styles } from './styles';
import Input from '../../../components/input';
import { useNavigation } from '@react-navigation/native';

function SiginScreen() {
  const navigation = useNavigation();

  const handleSignIn = () => {
    // Navigate to Main screen (which contains the tab navigator with Home)
    const parentNavigation = navigation.getParent();
    if (parentNavigation) {
      parentNavigation.navigate('Main');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Food</Text>
      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Input label="Email" placeholder="Enter your email" />
        </View>
        <View style={styles.inputContainer}>
          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>
      </View>
      <Button title="Sign in" onPress={handleSignIn} />
    </View>
  );
}

export default SiginScreen;
