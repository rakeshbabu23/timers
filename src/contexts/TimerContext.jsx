import React, {createContext, useContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimerContext = createContext();

const initialState = {
  timers: [],
  history: [],
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMERS':
      return {...state, timers: action.payload};
    case 'ADD_TIMER':
      return {...state, timers: [...state.timers, action.payload]};
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id ? action.payload : timer,
        ),
      };
    case 'ADD_TO_HISTORY':
      return {...state, history: [...state.history, action.payload]};
    case 'SET_HISTORY':
      return {...state, history: action.payload};
    default:
      return state;
  }
};

export const TimerProvider = ({children}) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const timersData = await AsyncStorage.getItem('timers');
      const historyData = await AsyncStorage.getItem('history');

      if (timersData) {
        dispatch({type: 'SET_TIMERS', payload: JSON.parse(timersData)});
      }
      if (historyData) {
        dispatch({type: 'SET_HISTORY', payload: JSON.parse(historyData)});
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveTimers = async timers => {
    try {
      await AsyncStorage.setItem('timers', JSON.stringify(timers));
    } catch (error) {
      console.error('Error saving timers:', error);
    }
  };

  const saveHistory = async history => {
    try {
      await AsyncStorage.setItem('history', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  useEffect(() => {
    saveTimers(state.timers);
  }, [state.timers]);

  useEffect(() => {
    saveHistory(state.history);
  }, [state.history]);

  return (
    <TimerContext.Provider value={{state, dispatch}}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
