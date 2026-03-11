import React, { useState } from 'react';
import {
  Text,
  View,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import Input from '../../../components/input';
import Button from '../../../components/button';
import { useLogin } from '../../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthStackParamList = {
  Sigin: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

type SiginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Sigin'
>;

function SiginScreen() {
  const navigation = useNavigation<SiginScreenNavigationProp>();
  const [phone, setPhone] = useState('0987654321');
  const [password, setPassword] = useState('password123');
  const loginMutation = useLogin();

  const handleSignIn = () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please enter phone and password');
      return;
    }

    loginMutation.mutate(
      { phone, password },
      {
        onSuccess: () => {
          // Navigate to Main screen
          const parentNavigation = navigation.getParent();
          if (parentNavigation) {
            parentNavigation.navigate('Main');
          }
        },
        onError: (error: any) => {
          console.log('Login failed VIEW', error);
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            'Login failed. Please try again.';
          Alert.alert('Login Failed 111', errorMessage);
        },
      }
    );
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Driver Food</Text>

        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Input
              label="Phone"
              placeholder="Enter your phone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={handleRegister}>
            <Text>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={loginMutation.isPending ? 'Signing in...' : 'Sign in'}
            onPress={handleSignIn}
            disabled={loginMutation.isPending}
          />

          {loginMutation.isPending && (
            <ActivityIndicator
              style={styles.loader}
              size="small"
              color="#fff"
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SiginScreen;
