import React from 'react';
import {View, StyleSheet, StatusBar, useColorScheme} from 'react-native';
import QuestionsContainer from './src/components/ExercisesContainer';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <QuestionsContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#74d9fe',
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default App;
