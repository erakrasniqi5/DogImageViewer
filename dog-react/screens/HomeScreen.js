import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView 
} from 'react-native';

const HomeScreen = () => {
  const [dogImage, setDogImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [funFact, setFunFact] = useState('');
  const [featuredBreed, setFeaturedBreed] = useState('');
  const [featuredBreedImage, setFeaturedBreedImage] = useState(null);
  const [loadingBreed, setLoadingBreed] = useState(true);

  const dogFunFacts = [
    "Dogs can smell thousands of times better than humans! 👃",
    "A Greyhound can run up to 45 mph! 🏃‍♂️",
    "Dalmatian puppies are born pure white and get their spots later! 🖤",
    "Dogs wag their tails differently depending on their mood! 🐕",
    "The Basenji dog doesn’t bark, but it yodels! 🎶",
    "A dog's nose print is unique, just like a human fingerprint! 🐾",
    "Corgis were originally bred to herd cattle! 🐄",
    "Chow Chows have blue-black tongues! 😛",
    "The world's smallest dog breed is the Chihuahua! 🐶",
    "Dogs have three eyelids! 👀"
  ];

  const fetchRandomFact = () => {
    setFunFact(dogFunFacts[Math.floor(Math.random() * dogFunFacts.length)]);
  };

  const fetchDogImage = async () => {
    setLoadingImage(true);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error(error);
    }
    setLoadingImage(false);
  };

  const fetchFeaturedBreed = async () => {
    setLoadingBreed(true);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const data = await response.json();
      const breeds = Object.keys(data.message);
      const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
      setFeaturedBreed(randomBreed);

      const breedImageResponse = await fetch(`https://dog.ceo/api/breed/${randomBreed}/images/random`);
      const breedImageData = await breedImageResponse.json();
      setFeaturedBreedImage(breedImageData.message);
    } catch (error) {
      console.error(error);
    }
    setLoadingBreed(false);
  };

  useEffect(() => {
    fetchDogImage();
    fetchFeaturedBreed();
    fetchRandomFact();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome Banner */}
      <Text style={styles.banner}>🐾 Welcome to Dog Explorer! 🐾</Text>

      {/* Fun Fact Section */}
      <View style={styles.factBox}>
        <Text style={styles.factText}>Did you know? 🤔</Text>
        <Text style={styles.factDetail}>{funFact}</Text>
        <TouchableOpacity style={styles.factButton} onPress={fetchRandomFact}>
          <Text style={styles.factButtonText}>Fetch New Fact 🔄</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Layout for Random Dog Image & Breed of the Day */}
      <View style={styles.horizontalContainer}>
        {/* Random Dog Image */}
        <View style={styles.imageBox}>
          <Text style={styles.sectionTitle}>🐶 Random Dog 🐶</Text>
          {loadingImage ? (
            <ActivityIndicator size="large" color="#ff69b4" />
          ) : (
            dogImage && <Image source={{ uri: dogImage }} style={styles.dogImage} />
          )}
        </View>

        {/* Breed of the Day */}
        <View style={styles.imageBox}>
          <Text style={styles.sectionTitle}>🌟 Breed of the Day 🌟</Text>
          {loadingBreed ? (
            <ActivityIndicator size="large" color="#ff69b4" />
          ) : (
            featuredBreedImage && (
              <>
                <Image source={{ uri: featuredBreedImage }} style={styles.dogImage} />
                <Text style={styles.breedText}>{featuredBreed.toUpperCase()}</Text>
              </>
            )
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffe6f7', // Soft pink background
  },
  banner: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#ff1493', // Pink with a touch of vibrance
    textAlign: 'center',
    textShadowColor: '#ff69b4', // Add a soft shadow for contrast
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  factBox: {
    backgroundColor: '#ffb6c1', // Light pink for fact box
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  factText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff1493',
  },
  factDetail: {
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
  },
  factButton: {
    backgroundColor: '#ff1493',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
  },
  factButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  imageBox: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#ff1493',
    textDecorationLine: 'underline',
  },
  dogImage: {
    width: 180,
    height: 180,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#ff1493', // Pink border for a sleek effect
    marginBottom: 12,
  },
  breedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff1493',
    textAlign: 'center',
  },
});

export default HomeScreen;
