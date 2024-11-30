import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ route, navigation }) {
  const { familyId } = route.params; // Destructure familyId from the route params

  return (
    <View style={styles.container}>
      <Button
        title="Shopping List"
        onPress={() => navigation.navigate('Shopping List')}
        color="#006A4E"
      />
      <Button
        title="Inventory"
        onPress={() => navigation.navigate('Inventory')}
        color="#006A4E"
      />
      <Button
        title="Meal Planning"
        onPress={() => navigation.navigate('Meal Planning')}
        color="#006A4E"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
