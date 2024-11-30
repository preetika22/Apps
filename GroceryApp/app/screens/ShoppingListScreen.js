import React, { useState, useEffect } from "react";
import { View, Text, SectionList, StyleSheet, Alert, Button, navigation } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

export default function ShoppingListScreen({navigation}) {
  const [shoppingList, setShoppingList] = useState([]);
  const familyId = '3223';

  const fetchShoppingList = async () => {
    try {
      const response = await fetch("https://9572-116-72-150-31.ngrok-free.app/api/shopping-list/3223");
      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
      }

      const groupedData = groupByCategory(data || []);
      console.log("Grouped Data:", groupedData);

      setShoppingList(groupedData);
    } catch (error) {
      console.error("Error fetching shopping list:", error.message || error);
      Alert.alert("Error", error.message || "Unable to fetch shopping list.");
    }
  };

  const groupByCategory = (list) => {
    if (!Array.isArray(list)) return [];

    const grouped = list.reduce((acc, item) => {
      const category = item.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    return Object.entries(grouped).map(([category, items]) => ({
      title: category,
      data: items,
    }));
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchShoppingList(); // Call the fetch function when the screen is focused
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
    <Text style={styles.itemName}>{item.name}
    <Ionicons
        name="trash-bin-outline"
        size={20}
        color="red"
        onPress={() => deleteItem(item.id)}
        style={styles.deleteIcon}
      />
    </Text>
    <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
    <View style={styles.itemActions}>
   
      {/* Pass the _id and familyId to moveToInventory */}
      <Button
        title="Move to Inventory"
        onPress={() => moveToInventory(item.id, item.familyId)}
        color="#006A4E"
      />
     
    </View>
  </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  //Move Items to inventory 
  const moveToInventory = async (itemId, familyId) => {
    try {
      const response = await fetch(
        `https://9572-116-72-150-31.ngrok-free.app/api/shopping-list/move-to-inventory?shoppingListItemId=${itemId}&familyId=${familyId}`,
        {
          method: 'POST',
        }
      );
  
      // Check if the response is not OK 
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        console.error('Response Error:', errorMessage);
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      console.log('Item moved to inventory:', data);
  
      // Refresh the shopping list
      fetchShoppingList();
    } catch (error) {
      // Error may not always have 'response', so use a fallback
      console.error('Error moving item to inventory:', error.message || error);
      Alert.alert('Error', error.message || 'Failed to move item to inventory.');
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(
        `https://9572-116-72-150-31.ngrok-free.app/api/shopping-list/discard/${itemId}`,
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
      fetchShoppingList();
    } catch (error) {
      console.error('Error deleting item:', error.message || error);
      Alert.alert('Error', error.message || 'Failed to delete item.');
    }
  };
  

  return (
    <View style={styles.container}>
      {shoppingList.length > 0 ? (
        <SectionList
          sections={shoppingList}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      ) : (
        <Text style={styles.emptyText}>Loading...</Text>
      )}

<Button
      title="Add Items"
      onPress={() => navigation.navigate('AddItemScreen', { familyId: '3223' })}
      color="#006A4E"
    />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#ddd",
    padding: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemName: {
    fontSize: 18,
    padding: 10,
  },
  itemQuantity: {
    fontSize: 16,
    color: "#555",
  },
  deleteIcon: {
    marginLeft: 150,
    paddingBottom: 20
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
