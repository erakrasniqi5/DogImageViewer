import React ,{useEffect,useState} from 'react';

import { View, Text , Image,StyleSheet,ActivityIndicator} from 'react-native';

const HomeScreen = () => {

  const [dogImage, setDogImage] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        setDogImage(data.message); // The API response contains the image URL in 'message'
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };


    fetchDogImage();
  }, []);

  // While the image is loading, show a loading indicator
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );




  return (
    <View style={styles.container}>
      {dogImage ? (
        <>
          <Text style={styles.title}>Random Dog Image</Text>
          <Image source={{ uri: dogImage }} style={styles.dogImage} />
        </>
      ) : (
        <Text>Error loading dog image</Text>
      )}
    </View>
  );
};
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  dogImage: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
});

export default HomeScreen;
