"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var ExercisesContainer_1 = require("./src/components/ExercisesContainer");
var App = function () {
    var isDarkMode = (0, react_native_1.useColorScheme)() === 'dark';
    return (<react_native_1.View style={styles.appContainer}>
      <react_native_1.StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
      <ExercisesContainer_1["default"] />
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    appContainer: {
        backgroundColor: '#74d9fe',
        justifyContent: 'flex-end',
        flex: 1
    }
});
exports["default"] = App;
