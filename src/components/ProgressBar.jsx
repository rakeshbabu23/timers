// import React from 'react';
// import {View, StyleSheet} from 'react-native';

// const ProgressBar = ({progress, color}) => {
//   const styles = StyleSheet.create({
//     container: {
//       height: 4,
//       backgroundColor: '#e5e7eb',
//       borderRadius: 2,
//       overflow: 'hidden',
//     },
//     progress: {
//       height: '100%',
//       backgroundColor: color,
//       width: `${Math.min(Math.max(progress, 0), 100)}%`,
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <View style={styles.progress} />
//     </View>
//   );
// };

// export default ProgressBar;
import React from 'react';
import {View, StyleSheet} from 'react-native';

const ProgressBar = ({progress}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progress, {width: `${progress * 100}%`}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: 'blue',
  },
});

export default ProgressBar;
