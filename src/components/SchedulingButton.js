import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
      scheduling: state.scheduling,
    }
}

class SchedulingButton extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { color, focused } = this.props

        return (
            <View>
                <Icon
                    size={28} 
                    name={focused ? "clipboard-text" : "clipboard-text-outline"}
                    color={color}
                />
                { this.props.scheduling.rows.length > 0 && (<>
                    <View style={{position: 'absolute', borderWidth: 2, borderColor: '#fff', right: -6, top: -2, minWidth: 16, height: 16, borderRadius: 10, alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', backgroundColor: '#EB1D2A'}}>
                        <Text style={{color: '#fff', fontSize: 9, fontWeight: 'bold'}}>{this.props.scheduling.rows.length}</Text>
                    </View>
                </>)}
            </View>
        )
    }
}

SchedulingButton.propTypes = {
    color: PropTypes.string,
    focused: PropTypes.bool
}

SchedulingButton.defaultProps = {
    color: null,
    focused: false
}

export default connect(mapStateToProps, {  })(SchedulingButton)