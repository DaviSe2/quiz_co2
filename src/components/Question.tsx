import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { questionStyles as styles } from './styles/Question.styles';

type Option = {
  id: number;
  label: string;
  value: number;
};

type QuestionProps = {
  question: string;
  options: Option[];
  selectedValue?: number;
  onSelect: (value: number) => void;
};

export default function Question({ question, options, selectedValue, onSelect }: QuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map(option => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionButton,
            selectedValue === option.value && styles.selectedOption,
          ]}
          onPress={() => onSelect(option.value)}
        >
          <Text
            style={[
              styles.optionText,
              selectedValue === option.value && styles.selectedOptionText,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
