// screens/InventoryScreen.js
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function InventoryScreen() {
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async () => {
    try {
      const response = await fetch(`https://9743-116-72-150-31.ngrok-free.app/api/inventory`);
      const data = await response.json();
      console.log('Fetched Inventory:', data);
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error.message || error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(
        `https://9743-116-72-150-31.ngrok-free.app/api/inventory/remove/${itemId}`,
        {
          method: 'DELETE',
        }
      );
  
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        console.error('Response Error:', errorMessage);
        throw new Error(errorMessage);
      }
  
      const message = await response.text();
      console.log('Item deleted:', message);
  
      // Refresh the shopping list
      fetchInventory();
    } catch (error) {
      console.error('Error deleting item:', error.message || error);
      Alert.alert('Error', error.message || 'Failed to delete item.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemRow}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Ionicons
          name="trash-bin-outline"
          size={24}
          color="red"
          onPress={() => deleteItem(item.id)}
          style={styles.deleteIcon}
        />
      </View>
      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {inventory.length > 0 ? (
        <FlatList
          data={inventory}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.emptyText}>No items in inventory.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 18,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#555',
  },
  deleteIcon: {
    marginLeft: 250,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});




