import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6f4ea',
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#2e7d32',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  option: {
    backgroundColor: '#c8e6c9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionSelected: {
    backgroundColor: '#81c784',
  },
  optionText: {
    color: '#1b5e20',
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#2e7d32',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#a5d6a7',
    borderRadius: 6,
    padding: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#388e3c',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
