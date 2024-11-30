import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Header({ navigation, title }) {
  return (
    <View style={styles.header}>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2196F3',
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
});
