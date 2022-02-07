import React from 'react';
import {View, StyleSheet, Modal, TouchableWithoutFeedback} from 'react-native';
import theme from '../styles/theme';

export interface Props {
  show: boolean;
  children?: React.ReactNode;
  onRequestClose?: () => void;
  style?: object;
}
class BottomSheet extends React.Component<Props> {
  render() {
    const {show, onRequestClose = () => {}, children, style = {}} = this.props;
    return (
      <Modal
        style={[styles.modal]}
        visible={show}
        transparent={true}
        animationType="none">
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={onRequestClose}>
            <View style={{flex: 1}} />
          </TouchableWithoutFeedback>
        </View>
        <View style={[styles.container, style]}>{children}</View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
  },
  overlay: {
    zIndex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    position: 'absolute',
    elevation: 10,
    zIndex: 2,
    // display: 'none',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: theme.white,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 20,
    height: '20%',
  },
});
export default BottomSheet;
