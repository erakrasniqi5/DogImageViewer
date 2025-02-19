import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, StyleSheet, Picker, ActivityIndicator, TouchableOpacity 
} from 'react-native';

const BreedSelectorScreen = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [dogImage, setDogImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch the list of breeds when the component mounts
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        setBreeds(Object.keys(data.message));
        
        // Automatically select the first breed and fetch an image
        const firstBreed = Object.keys(data.message)[0];
        setSelectedBreed(firstBreed);
        fetchBreedImage(firstBreed);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBreeds();
  }, []);

  // Function to fetch an image of the selected breed
  const fetchBreedImage = async (breed) => {
    if (!breed) return;
    setLoading(true);
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐶 Select a Dog Breed 🐶</Text>
      
      <Picker
        selectedValue={selectedBreed}
        style={styles.picker}
        onValueChange={(itemValue) => {
          setSelectedBreed(itemValue);
          fetchBreedImage(itemValue); // Fetch image when a new breed is selected
        }}
      >
        {breeds.map((breed) => (
          <Picker.Item key={breed} label={breed} value={breed} />
        ))}
      </Picker>

      {loading ? (
        <ActivityIndicator size="large" color="#ff6347" />
      ) : (
        dogImage && <Image source={{ uri: dogImage }} style={styles.dogImage} />
      )}

      <TouchableOpacity style={styles.button} onPress={() => fetchBreedImage(selectedBreed)}>
        <Text style={styles.buttonText}>Fetch Another Image 🔄</Text>
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
    textAlign: 'center',
    color: '#333',
  },
  picker: {
    width: 250,
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  dogImage: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginTop: 16,
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BreedSelectorScreen;
