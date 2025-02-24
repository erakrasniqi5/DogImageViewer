import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, StyleSheet, Picker, ActivityIndicator, TouchableOpacity 
} from 'react-native';

const BreedSelectorScreen = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [dogImage, setDogImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        setBreeds(Object.keys(data.message));
        
        const firstBreed = Object.keys(data.message)[0];
        setSelectedBreed(firstBreed);
        fetchBreedImage(firstBreed);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBreeds();
  }, []);

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
          fetchBreedImage(itemValue);
        }}
      >
        {breeds.map((breed) => (
          <Picker.Item key={breed} label={breed} value={breed} />
        ))}
      </Picker>

      {loading ? (
        <ActivityIndicator size="large" color="#f79c42" />
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
    backgroundColor: '#ffd1e3',  // Soft pink background
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#ff4f88',  // Dark pink color
    fontFamily: 'Arial',  // Optional: Can change font to something playful
  },
  picker: {
    width: 250,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff4f88',
    marginBottom: 16,
  },
  dogImage: {
    width: 280,
    height: 280,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: '#ff4f88',  // Pink border around image
    marginTop: 24,
  },
  button: {
    backgroundColor: '#ff4f88',  // Button in dark pink
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Arial',  // Optional: Add some playful fonts here
  },
});

export default BreedSelectorScreen;
