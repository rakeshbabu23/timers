import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TimerItem} from './TimerItem';
import {useTimer} from '../contexts/TimerContext';
import IonIcons from 'react-native-vector-icons/Ionicons';

const TimerGroup = ({category, expanded, onToggle, timers}) => {
  const {dispatch} = useTimer();

  const startAllTimers = () => {
    timers.forEach(timer => {
      if (!timer.isRunning && !timer.completed) {
        dispatch({
          type: 'UPDATE_TIMER',
          payload: {...timer, isRunning: true},
        });
      }
    });
  };

  const pauseAllTimers = () => {
    timers.forEach(timer => {
      if (timer.isRunning) {
        dispatch({
          type: 'UPDATE_TIMER',
          payload: {...timer, isRunning: false},
        });
      }
    });
  };

  const resetAllTimers = () => {
    timers.forEach(timer => {
      dispatch({
        type: 'UPDATE_TIMER',
        payload: {
          ...timer,
          remainingTime: timer.duration,
          isRunning: false,
          completed: false,
        },
      });
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.header}>
        <View style={styles.headerLeft}>
          {expanded ? (
            <IonIcons name="chevron-down" color="#666" size={24} />
          ) : (
            <IonIcons name="chevron-forward" color="#666" size={24} />
          )}
          <Text style={styles.categoryTitle}>{category}</Text>
        </View>
        <Text style={styles.timerCount}>{timers.length} timers</Text>
      </TouchableOpacity>

      {expanded && (
        <View>
          <View style={styles.groupActions}>
            <TouchableOpacity
              style={styles.groupButton}
              onPress={startAllTimers}>
              <IonIcons name="play-sharp" color="white" size={20} />
              <Text style={styles.groupButtonText}>Start All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.groupButton}
              onPress={pauseAllTimers}>
              <IonIcons name="pause-outline" color="white" size={20} />
              <Text style={styles.groupButtonText}>Pause All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.groupButton}
              onPress={resetAllTimers}>
              <IonIcons name="reload" color="white" size={20} />
              <Text style={styles.groupButtonText}>Reset All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.timerList}>
            {timers.map(timer => (
              <TimerItem key={timer.id} timer={timer} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timerCount: {
    color: '#666',
    fontSize: 14,
  },
  groupActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  groupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  groupButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  timerList: {
    padding: 8,
  },
});

export default TimerGroup;
