import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { MKTextField } from 'react-native-material-kit';

const { func } = PropTypes;

export default class Form extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
  }

  state = {
    value: '',
  }

  handleChange = (value) => {
    this.setState({
      value
    });
  }

  handleSubmit = () => {
    const { value } = this.state;

    this.setState({
      value: '',
    }, () => {
      this.props.onSubmit(value);
    });
  }

  render() {
    const { value } = this.state;
    return (
      <View>
        <MKTextField
          blurOnSubmit
          onChangeText={this.handleChange}
          onSubmitEditing={this.handleSubmit}
          placeholder="Type to add new tasks"
          ref="textInput"
          returnKeyType="done"
          value={value}
        />
      </View>
    );
  }
}
