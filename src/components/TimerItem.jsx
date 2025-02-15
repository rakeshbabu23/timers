import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import {useTimer} from '../contexts/TimerContext';
import IonIcons from 'react-native-vector-icons/Ionicons';
import CompletionModal from './Modal';

export const TimerItem = ({timer}) => {
  const {dispatch} = useTimer();
  const intervalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const progressAnimation = useRef(
    new Animated.Value(timer.remainingTime / timer.duration),
  ).current;

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: timer.remainingTime / timer.duration,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [timer.remainingTime]);

  useEffect(() => {
    if (timer.isRunning && !timer.completed) {
      intervalRef.current = setInterval(() => {
        if (timer.remainingTime > 0) {
          dispatch({
            type: 'UPDATE_TIMER',
            payload: {
              ...timer,
              remainingTime: timer.remainingTime - 1,
            },
          });

          if (timer.remainingTime === Math.floor(timer.duration / 2)) {
            Alert.alert('Halfway There!', `${timer.name} is at 50%`);
          }
        } else {
          clearInterval(intervalRef.current);
          dispatch({
            type: 'UPDATE_TIMER',
            payload: {...timer, isRunning: false, completed: true},
          });
          dispatch({
            type: 'ADD_TO_HISTORY',
            payload: {
              id: Date.now(),
              timerName: timer.name,
              completedAt: new Date().toISOString(),
            },
          });
          setShowModal(true);
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.isRunning, timer.remainingTime]);

  const toggleTimer = () => {
    dispatch({
      type: 'UPDATE_TIMER',
      payload: {...timer, isRunning: !timer.isRunning},
    });
  };

  const resetTimer = () => {
    dispatch({
      type: 'UPDATE_TIMER',
      payload: {
        ...timer,
        remainingTime: timer.duration,
        isRunning: false,
        completed: false,
      },
    });
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const width = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const getStatusColor = () => {
    if (timer.completed) return '#4CAF50';
    if (timer.isRunning) return '#2196F3';
    return '#FFA000';
  };

  return (
    <View style={styles.container}>
      <CompletionModal
        visible={showModal}
        timerName={timer.name}
        onClose={() => setShowModal(false)}
      />

      <View style={styles.header}>
        <Text style={styles.name}>{timer.name}</Text>
        <View style={[styles.statusDot, {backgroundColor: getStatusColor()}]} />
      </View>

      <Text style={styles.time}>{formatTime(timer.remainingTime)}</Text>

      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, {width}]} />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.iconButton, timer.completed && styles.disabledButton]}
          onPress={toggleTimer}
          disabled={timer.completed}>
          {timer.isRunning ? (
            <IonIcons name="pause-outline" color="white" size={20} />
          ) : (
            <IonIcons name="play-sharp" color="white" size={20} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={resetTimer}>
          <IonIcons name="reload" color="white" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  time: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#2196F3',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  iconButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 30,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
});
