import React, { Component } from 'react';
import theme from '../../../theme';
import styles from './styles';
import { View, TextInput, Text, Animated } from 'react-native';
import SpeechToText from '../SpeechToText/SpeechToText';

class Input extends Component {
	state = {
		isFocused: false
	};

	componentWillMount() {
		this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
	}

	handleFocus = () => this.setState({ isFocused: true });
	handleBlur = () => this.setState({ isFocused: false });

	componentDidUpdate() {
		Animated.timing(this._animatedIsFocused, {
			toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
			duration: 200
		}).start();
	}

	render() {
		const { label, ...props } = this.props;
		const { isFocused } = this.state;
		const labelStyle = {
			position: 'absolute',
			left: 0,
			top: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [18, 0]
			}),
			fontSize: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [25, 15]
			}),
			color: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: ['#aaa', 'maroon']
			}),
			margin: 25
		};
		return (
			<View style={styles.container}>
				<Animated.Text style={labelStyle}>{label}</Animated.Text>
				<TextInput
					{...props}
					style={{ ...styles.input, ...props.style }}
					placeholderTextColor={theme.primary}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					blurOnSubmit
				/>
				<SpeechToText saveRecordedText={this.saveRecordedText} />
			</View>
		);
	}
}

export default Input;
