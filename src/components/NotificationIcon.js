import React, {Component} from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class notificationIcon extends Component{
    render() {
        return (
            <TouchableOpacity
                style={{
                    width: 44,
                    height: 44,
                    marginLeft: 20,
                    marginTop:16
                }}
                onPress={()=>{
                    this.props.navigation.navigate("Notification");
                }}>
                <Icon name='bell-outline' size={28} color={"#8C8E93"}/>
            </TouchableOpacity>
        )
    };
}
export default withNavigation(notificationIcon);