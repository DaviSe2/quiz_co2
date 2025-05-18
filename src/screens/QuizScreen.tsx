import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles/QuizScreen.styles'; // import do estilo separado

type Question =
  | {
      id: number;
      text: string;
      type: 'choice';
      options: { id: number; label: string; value: number }[];
    }
  | {
      id: number;
      text: string;
      type: 'input';
      fields: { label: string; key: string }[];
    };

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});

  const questions: Question[] = [
    {
      id: 1,
      text: 'Qual valor de energia elétrica é consumido mensalmente em sua casa?',
      type: 'choice',
      options: [
        { id: 1, label: 'Até R$50,00', value: 1 },
        { id: 2, label: 'R$50,00 - R$100,00', value: 2 },
        { id: 3, label: 'R$100,00 - R$200,00', value: 4 },
        { id: 4, label: 'R$200,00 - R$300,00', value: 6 },
        { id: 5, label: 'R$300,00 - R$400,00', value: 8 },
        { id: 6, label: 'Mais de R$500,00', value: 10 },
      ],
    },
    {
      id: 2,
      text: 'Qual consumo de gás anual de sua casa?',
      type: 'input',
      fields: [
        { label: 'Quantidade de botijões por ano', key: 'botijao' },
        { label: 'Valor anual de gás encanado (R$)', key: 'encanado' },
      ],
    },
    {
      id: 3,
      text: 'Quantos quilômetros você se movimenta por mês utilizando transporte público?',
      type: 'choice',
      options: [
        { id: 1, label: 'Menos de 250Km', value: 1 },
        { id: 2, label: '250Km - 500Km', value: 2 },
        { id: 3, label: '500Km - 750Km', value: 3 },
        { id: 4, label: '750Km - 1000Km', value: 4 },
        { id: 5, label: 'Mais de 1000Km', value: 5 },
      ],
    },
    {
      id: 4,
      text: 'Quantos quilômetros você se movimenta por mês utilizando automóvel particular?',
      type: 'choice',
      options: [
        { id: 1, label: 'Não tenho carro', value: 0 },
        { id: 2, label: 'Menos de 100Km', value: 1 },
        { id: 3, label: '100Km - 200Km', value: 2 },
        { id: 4, label: '200Km - 300Km', value: 3 },
        { id: 5, label: '300Km - 400Km', value: 4 },
        { id: 6, label: 'Mais de 400Km', value: 5 },
      ],
    },
    {
      id: 5,
      text: 'Qual informação abaixo representa seu tipo de dieta?',
      type: 'choice',
      options: [
        { id: 1, label: 'Basicamente, carne bovina.', value: 4 },
        { id: 2, label: 'Basicamente, carne de frango.', value: 2 },
        { id: 3, label: 'Basicamente, carne de porco.', value: 2 },
        { id: 4, label: 'Consumo os três tipos equilibradamente.', value: 2 },
        { id: 5, label: 'Não consumo carne.', value: 0 },
      ],
    },
    {
      id: 6,
      text: 'Quantas pessoas moram em sua casa (incluindo você)?',
      type: 'input',
      fields: [{ label: 'Número de pessoas', key: 'moradores' }],
    },
  ];

  function handleInputChange(key: string, value: string) {
    const number = parseInt(value, 10);
    if (!isNaN(number)) {
      setAnswers(prev => ({ ...prev, [key]: number }));
    } else {
      const updated = { ...answers };
      delete updated[key];
      setAnswers(updated);
    }
  }

  function nextQuestion() {
    const current = questions[currentQuestionIndex];
    const missing =
      current.type === 'choice'
        ? answers[`q${current.id}`] === undefined
        : current.fields.some(f => answers[f.key] === undefined || isNaN(answers[f.key]));

    if (missing) {
      Alert.alert('Por favor, preencha todas as respostas para continuar.');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      calculateResult();
    }
  }

  function calculateResult() {
    let total = 0;

    total += answers['q1'] ?? 0;
    total += (answers['botijao'] ?? 0) * 1;
    total += Math.floor((answers['encanado'] ?? 0) / 50);
    total += answers['q3'] ?? 0;
    total += answers['q4'] ?? 0;
    total += answers['q5'] ?? 0;

    const moradores = answers['moradores'] ?? 1;
    if (moradores > 1) total -= moradores - 1;
    total = Math.max(total, 0);

    Alert.alert(
      'Resultado',
      `Você deve plantar ${total} árvores por ano para compensar seu consumo de CO₂.`
    );

    setCurrentQuestionIndex(0);
    setAnswers({});
  }

  const current = questions[currentQuestionIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{current.text}</Text>

      {current.type === 'choice' &&
        current.options.map(opt => (
          <TouchableOpacity
            key={opt.id}
            style={[
              styles.option,
              answers[`q${current.id}`] === opt.value && styles.optionSelected,
            ]}
            onPress={() => setAnswers(prev => ({ ...prev, [`q${current.id}`]: opt.value }))}
          >
            <Text style={styles.optionText}>{opt.label}</Text>
          </TouchableOpacity>
        ))}

      {current.type === 'input' &&
        current.fields.map(field => (
          <View key={field.key} style={styles.inputGroup}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="Digite um número"
              value={answers[field.key]?.toString() ?? ''}
              onChangeText={value => handleInputChange(field.key, value)}
              style={styles.input}
            />
          </View>
        ))}

      <TouchableOpacity style={styles.button} onPress={nextQuestion}>
        <Text style={styles.buttonText}>
          {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Próxima'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
