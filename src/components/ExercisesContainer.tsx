/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ActivityIndicator,
} from 'react-native';
import API from '../api';
import {IAPI, IExercise} from '../interfaces';
import BottomSheet from './BottomSheet';
import Button from './Button';
import Exercise from './Exercise';

const {width} = Dimensions.get('window');

interface Props {
  // questions?: Array<ExerciseProps>;
}
interface StateProps {
  disabled: boolean;
  exercises: Array<IExercise & {id: string}>;
  showBotttomSheet: boolean;
  selected: {isCorrect: boolean; answer: string};
  activeSlide: number;
  loading: boolean;
}
class ExercisesContainer extends React.Component<Props> {
  scrollViewRef: React.RefObject<ScrollView>;
  Api: IAPI;

  constructor(props: Props) {
    super(props);
    this.scrollViewRef = React.createRef();
    this.Api = new API();
  }

  state: StateProps = {
    disabled: false,
    exercises: [
      // {
      //   text: 'This house is small',
      //   translation: 'Das hause ist klein',
      //   match: {
      //     original: 'house',
      //     translation: 'hause',
      //   },
      //   translatedLiterallyFrom: 'This house is small',
      //   options: ['folgen', 'Schaf', 'Bereiden', 'Hause'],
      //   lang: 'English/German',
      // },
      // {
      //   text: 'A boy was born',
      //   translation: 'ein Junge wird geboren',
      //   match: {
      //     original: 'boy',
      //     translation: 'Junge',
      //   },
      //   translatedLiterallyFrom: 'ein Junge wird geboren',
      //   options: ['folgen', 'Junge', 'Bereiden', 'Hause'],
      //   lang: 'English/German',
      // },
    ],
    showBotttomSheet: false,
    selected: {
      isCorrect: false,
      answer: '',
    },
    activeSlide: 0,
    loading: false,
  };

  async componentDidMount() {
    try {
      this.setState({loading: true});
      const exercises = await this.Api.getExercises('English/German');
      await this.setState({exercises});
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({loading: false});
    }
  }

  get page() {
    return this.state.activeSlide + 1;
  }

  get endReached() {
    return this.page >= this.state.exercises.length;
  }

  nextSlide = () => {
    if (!this.scrollViewRef.current) {
      return;
    }
    this.scrollViewRef.current.scrollTo({
      x: !this.endReached ? this.page * width : 0,
      animated: true,
    });
    this.setState({showBotttomSheet: false});
  };

  onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide =
      event.nativeEvent.contentOffset.x /
      event.nativeEvent.layoutMeasurement.width;
    if (slide !== this.state.activeSlide) {
      this.setState({activeSlide: slide});
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.loading && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#FFF" />
          </View>
        )}
        {!this.state.loading && (
          <ScrollView
            ref={this.scrollViewRef}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{width}}
            onScroll={this.onScroll}
            pagingEnabled={true}>
            {this.state.exercises.map(exercise => {
              return (
                <Exercise
                  key={`exercise-${exercise.id}`}
                  text={exercise.text}
                  match={exercise.match}
                  translation={exercise.translation}
                  translatedLiterallyFrom={exercise.translatedLiterallyFrom}
                  options={exercise.options}
                  onAnswerChecked={options =>
                    this.setState({showBotttomSheet: true, selected: options})
                  }
                  lang={exercise.lang}
                  id={exercise.id}
                />
              );
            })}
          </ScrollView>
        )}
        <BottomSheet
          onRequestClose={() => this.setState({showBotttomSheet: false})}
          style={{
            backgroundColor: this.state.selected.isCorrect
              ? '#59e2e4'
              : '#ff7a87',
          }}
          show={this.state.showBotttomSheet}>
          <View>
            {this.state.selected.isCorrect && (
              <Text style={styles.label}>Great Job!</Text>
            )}
            {!this.state.selected.isCorrect && (
              <Text style={styles.label}>
                <Text>Answer: </Text>
                <Text style={{fontWeight: '400'}}>
                  {this.state.selected.answer}
                </Text>
              </Text>
            )}
            <Button
              textColor={this.state.selected.isCorrect ? '#59e2e4' : '#ff7a87'}
              text={this.endReached ? 'Start Over' : 'Continue'}
              onPress={this.nextSlide}
            />
          </View>
        </BottomSheet>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '85%',
    width: '100%',
    backgroundColor: '#3b6d81',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  label: {
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
});
export default ExercisesContainer;
