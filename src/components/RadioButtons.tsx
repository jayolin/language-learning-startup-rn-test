import React from 'react';
import {View, StyleSheet} from 'react-native';
import {areEqual} from '../helpers';
import Button from './Button';

export enum ButtonSize {
  md = 'md',
  sm = 'sm',
}
export interface ButtonProps {
  options: Array<string>;
  selected?: string;
  style?: object | Array<object>;
  correct?: boolean;
  onValueChanged?: (option: string) => any;
}
const RadioButtons: React.FC<ButtonProps> = props => {
  const {selected, style = {}, options, onValueChanged} = props;

  return (
    <View style={[styles.container, style]}>
      {options.map((option, i) => {
        const isSelected = selected ? areEqual(selected, option) : false;
        return (
          <View style={styles.radioButton} key={`option-${i}`}>
            <Button
              onPress={() => onValueChanged && onValueChanged(option)}
              text={option}
              disabled={isSelected}
              size={ButtonSize.sm}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                opacity: isSelected ? 0 : 1,
              }}
            />
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  radioButton: {
    backgroundColor: '#6292a6',
    borderRadius: 15,
    margin: 5,
  },
});
export default RadioButtons;
