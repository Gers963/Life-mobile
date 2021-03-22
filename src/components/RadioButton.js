import React, { Component, useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

export default class RadioButton extends Component {
	state = {
		value: this.props.value,
	};

	static propTypes = {
		onPress: PropTypes.func,
		options: PropTypes.array,
		horizontal: PropTypes.bool,
		value: PropTypes.any
	}

	onPress(key) {
		this.setState({ value: key }, this.props.onPress(key));
	}

	render() {
		const { value } = this.state;

		return (
			<View style={{flexDirection: (!this.props.horizontal ? 'row' : 'column'), flexWrap: 'wrap'}}>
				{this.props.options.map(item => { 
					return (
						<TouchableOpacity key={item.key} onPress={() => this.onPress(item.key)}>
							<View style={styles.buttonContainer}>
								<View style={styles.circle}>
									{value === item.key && <View style={styles.checkedCircle} />}
								</View>
								<Text style={styles.label}>{item.label}</Text>
							</View>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		//marginBottom: 30,
	},

	circle: {
		margin: 5,
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ACACAC',
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkedCircle: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: '#000',
	},
	label: {
		marginRight: 10,
		fontFamily: 'Titillium Web', 
		fontSize: 14
	}
});