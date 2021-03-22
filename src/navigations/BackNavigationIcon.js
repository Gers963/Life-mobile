import React, {Component} from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Feather';

class backNavigationIcon extends Component{
    render() {
        return (
            <TouchableOpacity
                style={{
                    width: 55,
                    height: 55,
                    marginLeft: 10,
                    marginRight: 10,
                }}
                onPress={()=>{
                    this.props.navigation.goBack();
                }}>
                <Icon name='arrow-left' size={40} color='#8C8E93' style={{marginTop: 10}}/>
            </TouchableOpacity>
        )
    };
}
export default withNavigation(backNavigationIcon);