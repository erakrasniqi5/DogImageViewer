import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

const RandomImageScreen = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomImage = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setImage(data.message);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐾 Random Dog 🐾</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ff6347" />
      ) : (
        image && <Image source={{ uri: image }} style={styles.image} />
      )}
      <TouchableOpacity style={styles.button} onPress={fetchRandomImage}>
        <Text style={styles.buttonText}>Get Random Image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RandomImageScreen;
