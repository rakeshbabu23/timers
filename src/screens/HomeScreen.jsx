import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TimerGroup from '../components/TimerGroup';
import {useTimer} from '../contexts/TimerContext';

const HomeScreen = ({navigation}) => {
  const {state} = useTimer();
  const [expandedCategories, setExpandedCategories] = useState([]);

  const categories = [...new Set(state.timers.map(timer => timer.category))];

  const toggleCategory = category => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map(category => (
          <TimerGroup
            key={category}
            category={category}
            expanded={expandedCategories.includes(category)}
            onToggle={() => toggleCategory(category)}
            timers={state.timers.filter(timer => timer.category === category)}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => navigation.navigate('AddTimer')}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>➕ Add Timer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.historyButton]}
          onPress={() => navigation.navigate('History')}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>📜 View History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    elevation: 5, // Native shadow on Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  addButton: {
    backgroundColor: '#007AFF', // iOS Blue
  },
  historyButton: {
    backgroundColor: '#34C759', // iOS Green
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
