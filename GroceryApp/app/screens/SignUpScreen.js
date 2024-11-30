import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Modal } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [familyId, setFamilyId] = useState('');
  const [generateFamilyId, setGenerateFamilyId] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleGenerateFamilyId = async () => {
    try {
      const response = await fetch('https://9743-116-72-150-31.ngrok-free.app/api/auth/generate-family-id');
      if (response.ok) {
        const data = await response.json();
        setGeneratedId(data.familyId);
        setFamilyId(data.familyId);
        setModalVisible(true);
      } else {
        Alert.alert('Error', 'Failed to generate Family ID');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('https://9743-116-72-150-31.ngrok-free.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, familyId }),
      });
      if (response.ok) {
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate('Login');
      } else {
        const error = await response.text();
        Alert.alert('Sign-Up Failed', error);
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {generateFamilyId ? (
        <View>
          <Button title="Generate Family ID" onPress={handleGenerateFamilyId} />
        </View>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Enter Family ID"
          value={familyId}
          onChangeText={setFamilyId}
        />
      )}
      <Button
        title={generateFamilyId ? 'Switch to Enter Family ID' : 'Switch to Generate Family ID'}
        onPress={() => setGenerateFamilyId(!generateFamilyId)}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login
      </Text>
      {/* Modal for displaying generated Family ID */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Generated Family ID</Text>
            <Text style={styles.modalText}>{generatedId}</Text>
            <Button title="OK" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    marginTop: 10,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default SignUpScreen;
