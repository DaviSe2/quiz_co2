import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles/HomeScreen.styles';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Quiz de CO₂!</Text>
      <Text style={styles.subtitle}>
        Descubra quantas árvores você precisa plantar para compensar seu estilo de vida.
      </Text>

      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Quiz')}>
        <Text style={styles.startButtonText}>Começar Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}
