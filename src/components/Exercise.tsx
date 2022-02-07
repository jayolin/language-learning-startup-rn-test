import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {areEqual} from '../helpers';
import {IExercise} from '../interfaces';
import Button, {ButtonSize} from './Button';
import RadioButtons from './RadioButtons';
import Tooltip from 'rn-tooltip';

const {width} = Dimensions.get('window');

export interface ExerciseProps extends IExercise {
  id: string;
  onAnswerChecked?: (options: {
    isCorrect: boolean | null;
    answer: string;
  }) => void;
}
class Exercise extends React.Component<ExerciseProps> {
  state = {
    selected: '',
    isCorrect: null,
  };
  getComputedComponent = (computedProps: {
    text: string;
    match: string;
    style?: object;
    component: Element;
    hasTooltip?: boolean;
  }) => {
    const {
      text,
      match,
      style = {},
      component,
      hasTooltip = false,
    } = computedProps;
    const literalTranslationArray =
      this.props.translatedLiterallyFrom.split(' ');
    return text.split(' ').map((w, i) => {
      return w.toLowerCase().match(match.toLowerCase()) ? (
        component
      ) : hasTooltip ? (
        <Tooltip
          key={`word-${w}`}
          actionType="press"
          withOverlay={false}
          backgroundColor="#FFF"
          width={70}
          popover={<Text>{literalTranslationArray[i]}</Text>}>
          <Text style={style}>{w} </Text>
        </Tooltip>
      ) : (
        <Text key={`word-${w}`} style={style}>
          {w}{' '}
        </Text>
      );
    });
  };

  checkAnswer = () => {
    const {onAnswerChecked, match} = this.props;
    this.setState(
      {
        isCorrect: areEqual(this.props.match.translation, this.state.selected),
      },
      () => {
        if (onAnswerChecked) {
          onAnswerChecked({
            isCorrect: this.state.isCorrect,
            answer: match.translation,
          });
        }
      },
    );
  };

  optionChosen = (option: string) => {
    this.setState({selected: option, isCorrect: null});
  };

  render() {
    const {text, match, translation, options} = this.props;
    const computedText = this.getComputedComponent({
      text,
      match: match.original,
      component: (
        <Text
          key="original-match-word"
          style={[styles.emphasizedWord, styles.paddedHorizontally]}>
          {match.original}
        </Text>
      ),
      style: {...styles.text, ...styles.paddedHorizontally},
    });
    const computedTranslatedText = this.getComputedComponent({
      text: translation,
      match: match.translation,
      component: this.state.selected ? (
        <Button
          key="selected-option-button"
          size={ButtonSize.sm}
          style={styles.paddedHorizontally}
          text={this.state.selected}
          backgroundColor={
            this.state.isCorrect === null
              ? undefined
              : this.state.isCorrect === true
              ? '#0bdfe8'
              : '#ff7b86'
          }
          textColor={this.state.isCorrect === null ? undefined : '#FFF'}
        />
      ) : (
        <View
          key="empty-space"
          style={[styles.emptySpace, styles.paddedHorizontally]}
        />
      ),
      style: {...styles.translationText, ...styles.paddedHorizontally},
      hasTooltip: true,
    });
    return (
      <View style={styles.content}>
        <View>
          <Text style={styles.instruction}>Fill in the missing word</Text>
          <View>
            <View style={styles.flexContainer}>{computedText}</View>
            <View style={styles.flexContainer}>{computedTranslatedText}</View>
            <RadioButtons
              options={options}
              selected={this.state.selected}
              onValueChanged={this.optionChosen}
              style={styles.radioButtons}
            />
          </View>
        </View>
        <Button
          disabled={!this.state.selected}
          textColor="#FFF"
          backgroundColor="#0fe2e8"
          text="Check Answer"
          onPress={this.checkAnswer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 60,
    justifyContent: 'space-between',
  },
  instruction: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '300',
  },
  paddedHorizontally: {
    marginHorizontal: 3,
  },
  text: {
    fontSize: 27,
    textAlign: 'center',
    fontWeight: '300',
    // marginVertical: 20,
    color: '#FFF',
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 20,
  },
  translationText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '300',
    color: '#FFF',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  },
  emptySpace: {
    height: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    width: 100,
  },
  emphasizedWord: {
    fontSize: 27,
    fontWeight: '600',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    color: '#FFF',
  },
  radioButtons: {
    marginVertical: 40,
  },
});
export default Exercise;
