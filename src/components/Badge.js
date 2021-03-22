import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class Bagde extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { color, label } = this.props

        return (
            <View>
                <View style={{borderWidth: 2, borderColor: '#fff', right: 1, top: 1, height: 20, borderRadius: 5, alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', backgroundColor: color, opacity: .7}}>
                    <Text style={{fontFamily: 'Cairo', color: '#fff', fontSize: 11, fontWeight: 'bold', paddingLeft: 4, paddingRight: 4, paddingBottom: 21}}>{label}</Text>
                </View>
            </View>
        )
    }
}

Bagde.propTypes = {
    color: PropTypes.string,
    label: PropTypes.string
}

Bagde.defaultProps = {
    color: null,
    label: null
}