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
            <ActivityIndicator size="large" color="#ff6347" />
          ) : (
            dogImage && <Image source={{ uri: dogImage }} style={styles.dogImage} />
          )}
        </View>

        {/* Breed of the Day */}
        <View style={styles.imageBox}>
          <Text style={styles.sectionTitle}>🌟 Breed of the Day 🌟</Text>
          {loadingBreed ? (
            <ActivityIndicator size="large" color="#ff6347" />
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
    backgroundColor: '#fef8e6', // Light warm background
  },
  banner: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#ff4500',
    textAlign: 'center',
    textShadowColor: '#ffcc00',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  factBox: {
    backgroundColor: '#ffeb99',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  factText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  factDetail: {
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
  },
  factButton: {
    backgroundColor: '#ff4500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
  },
  factButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  horizontalContainer: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  imageBox: {
    flex: 1,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
    textDecorationLine: 'underline',
  },
  dogImage: {
    width: 180,
    height: 180,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#ff4500',
    marginBottom: 10,
  },
  breedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
});

export default HomeScreen;
