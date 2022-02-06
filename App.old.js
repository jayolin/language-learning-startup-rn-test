"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var NewAppScreen_1 = require("react-native/Libraries/NewAppScreen");
var Section = function (_a) {
    var children = _a.children, title = _a.title;
    var isDarkMode = (0, react_native_1.useColorScheme)() === 'dark';
    return (<react_native_1.View style={styles.sectionContainer}>
      <react_native_1.Text style={[
            styles.sectionTitle,
            {
                color: isDarkMode ? NewAppScreen_1.Colors.white : NewAppScreen_1.Colors.black
            },
        ]}>
        {title}
      </react_native_1.Text>
      <react_native_1.Text style={[
            styles.sectionDescription,
            {
                color: isDarkMode ? NewAppScreen_1.Colors.light : NewAppScreen_1.Colors.dark
            },
        ]}>
        {children}
      </react_native_1.Text>
    </react_native_1.View>);
};
var App = function () {
    var isDarkMode = (0, react_native_1.useColorScheme)() === 'dark';
    var backgroundStyle = {
        backgroundColor: isDarkMode ? NewAppScreen_1.Colors.darker : NewAppScreen_1.Colors.lighter
    };
    return (<react_native_1.SafeAreaView style={backgroundStyle}>
      <react_native_1.StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
      <react_native_1.ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <NewAppScreen_1.Header />
        <react_native_1.View style={{
            backgroundColor: isDarkMode ? NewAppScreen_1.Colors.black : NewAppScreen_1.Colors.white
        }}>
          <Section title="Step One">
            Edit <react_native_1.Text style={styles.highlight}>App.tsx</react_native_1.Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <NewAppScreen_1.ReloadInstructions />
          </Section>
          <Section title="Debug">
            <NewAppScreen_1.DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <NewAppScreen_1.LearnMoreLinks />
        </react_native_1.View>
      </react_native_1.ScrollView>
    </react_native_1.SafeAreaView>);
};
var styles = react_native_1.StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600'
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400'
    },
    highlight: {
        fontWeight: '700'
    }
});
exports["default"] = App;
