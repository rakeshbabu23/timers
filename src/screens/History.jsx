import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import {useTimer} from '../contexts/TimerContext';

const HistoryScreen = () => {
  const {state} = useTimer();

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const exportHistory = async () => {
    try {
      const historyData = JSON.stringify(state.history, null, 2);
      await Share.share({
        message: historyData,
        title: 'Timer History Export',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to export history');
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.historyItem}>
      <Text style={styles.timerName}>{item.timerName}</Text>
      <Text style={styles.completedAt}>
        Completed: {formatDate(item.completedAt)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.exportButton} onPress={exportHistory}>
        <Text style={styles.exportButtonText}>Export History</Text>
      </TouchableOpacity>

      <FlatList
        data={state.history.slice().reverse()}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No timer history yet</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  historyItem: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  timerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  completedAt: {
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
  },
  exportButton: {
    backgroundColor: '#2196F3',
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  exportButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HistoryScreen;
