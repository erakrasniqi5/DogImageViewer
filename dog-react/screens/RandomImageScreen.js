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
        <ActivityIndicator size="large" color="#ff1493" />
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
    backgroundColor: '#ffe6f7', // Soft pink background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#ff1493', // Bright pink for title
    textAlign: 'center',
    textShadowColor: '#ff69b4', // Soft shadow for better visibility
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  image: {
    width: 280,
    height: 280,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 4,
    borderColor: '#ff1493', // Pink border around the image
  },
  button: {
    backgroundColor: '#ff1493', // Pink button
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#ff69b4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RandomImageScreen;
