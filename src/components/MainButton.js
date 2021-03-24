import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

export default class MainButton extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { color, focused } = this.props

        return (
            <View style={{bottom: 8, borderWidth: 1, borderColor: (focused ? '#af469b' : '#fff'),  borderRadius: 29, width: 60, height: 60}}>
                <View style={{borderRadius: 29, width: 58, height: 58, justifyContent: 'center', alignItems: 'center', backgroundColor: '#af469b', borderWidth: 3, borderColor: '#fff', opacity: (focused ? 1 : .5)}}>
                    <Icon
                        size={38} 
                        name={"home"}
                        color={focused ? '#fff' : '#fff'}
                    />
                </View>
            </View>
        )
    }
}

MainButton.propTypes = {
    color: PropTypes.string,
    focused: PropTypes.bool
}

MainButton.defaultProps = {
    color: null,
    focused: false
}