import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../styles/theme';

export enum ButtonSize {
  md = 'md',
  sm = 'sm',
}
export interface ButtonProps {
  text: string;
  size?: ButtonSize;
  textColor?: string;
  backgroundColor?: string;
  style?: object;
  textStyle?: object;
  disabled?: boolean;
  onPress?: () => void;
}
const Button: React.FC<ButtonProps> = props => {
  const {
    text,
    onPress = () => {},
    backgroundColor = theme.white,
    textColor = theme.primary,
    size = ButtonSize.md,
    style = {},
    textStyle = {},
    disabled = false,
  } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor,
        ...styles.button,
        ...styles[`${size}Button`],
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}>
      <Text
        style={{
          color: textColor,
          ...styles.text,
          ...styles[`${size}Text`],
          ...textStyle,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    shadowColor: '#315c71',
    shadowOffset: {width: 0, height: 5},
    elevation: 2,
    shadowOpacity: 0.4,
  },
  mdButton: {
    padding: 20,
    borderRadius: 30,
  },
  smButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  text: {
    textAlign: 'center',
  },
  mdText: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  smText: {
    fontSize: 14,
    textTransform: 'capitalize',
    fontWeight: '700',
  },
});
export default Button;
