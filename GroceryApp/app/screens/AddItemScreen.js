import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddItemScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const { familyId } = route.params; // Example familyId
  const API_URL = `https://9743-116-72-150-31.ngrok-free.app/api/shopping-list/add`

  const handleAddItem = async () => {
    if (!name || !quantity || !category) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    

    const newItem = {
      name,
      quantity: parseInt(quantity, 10),
      familyId,
      category,
    };

    try {
      const response = await fetch("https://9743-116-72-150-31.ngrok-free.app/api/shopping-list/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        Alert.alert('Success', 'Item added successfully!');
        navigation.goBack(); // Navigate back to the shopping list screen
      } else {
        Alert.alert('Error', 'Failed to add item');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        style={styles.input}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Select a category" value="" />
        <Picker.Item label="Groceries" value="Groceries" />
        <Picker.Item label="Meat" value="Meat" />
        <Picker.Item label="Fruits" value="Fruits" />
        <Picker.Item label="Vegetables" value="Vegetables" />
        {/* Add more categories as needed */}
      </Picker>

      <Button title="Add Item" onPress={handleAddItem} color="#006A4E"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default AddItemScreen;
