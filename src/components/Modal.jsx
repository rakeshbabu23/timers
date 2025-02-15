import React from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

const CompletionModal = ({visible, timerName, onClose}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <IonIcons name="checkmark-sharp" color="#4CAF50" size={20} />
          </View>
          <Text style={styles.congratsText}>Congratulations!</Text>
          <Text style={styles.timerNameText}>{timerName}</Text>
          <Text style={styles.completedText}>Timer Completed</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  timerNameText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  completedText: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CompletionModal;
