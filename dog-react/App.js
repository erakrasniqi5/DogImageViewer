import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import HomeScreen from './screens/HomeScreen';
import BreedSelectorScreen from './screens/BreedSelectorScreen';
import RandomImageScreen from './screens/RandomImageScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Breed Selector') {
              iconName = 'list';
            } else if (route.name === 'Random Image') {
              iconName = 'image';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Breed Selector" component={BreedSelectorScreen} />
        <Tab.Screen name="Random Image" component={RandomImageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
