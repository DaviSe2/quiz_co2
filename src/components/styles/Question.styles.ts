import { StyleSheet } from 'react-native';

export const questionStyles = StyleSheet.create({
  container: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#c8e6c9',
    padding: 14,
    borderRadius: 8,
    marginVertical: 8,
  },
  selectedOption: {
    backgroundColor: '#66bb6a',
  },
  optionText: {
    color: '#1b5e20',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedOptionText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
