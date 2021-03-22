import React from 'react';
import { View, AppState, BackHandler, Alert } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
class VideoCall extends React.Component {
    static navigationOptions = {
        tabBarVisible: false,
    }
    constructor(props) {
        super(props);
        this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
        this.onConferenceJoined = this.onConferenceJoined.bind(this);
        this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
        this.state = {
            rotes: false,
            appState: AppState.currentState
        };
    }
    componentDidMount = () => {
        AppState.addEventListener('change', this._handleAppStateChange);
        setTimeout(() => {
            const url = `https://meet.jit.si/${this.props.navigation.state.params.item.id}`;
            const userInfo = { displayName: this.props.navigation.state.params.item.patient.fullName };
            JitsiMeet.call(url, userInfo);
            /* You can also use JitsiMeet.audioCall(url) for audio only call */
            /* You can programmatically end the call with JitsiMeet.endCall() */
        }, 1000);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }


    _handleAppStateChange = (nextAppState) => {
        console.log("picadeaas")
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            JitsiMeet.endCall();
        }
        this.setState({ appState: nextAppState });
    };
    handleBackButton = () => {

        return true;
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    async componentWillUnmount() {
        await JitsiMeet.endCall();
    }

    onConferenceTerminated(nativeEvent) {
        JitsiMeet.endCall();
        this.props.navigation.navigate("Home")
    }
    onConferenceJoined(nativeEvent) {
        /* Conference joined event */
    }
    onConferenceWillJoin(nativeEvent) {
        /* Conference will join event */
    }
    render() {
        return (
            <View style={{ backgroundColor: 'black', flex: 1 }}>
                <JitsiMeetView onConferenceTerminated={this.onConferenceTerminated} onConferenceJoined={this.onConferenceJoined} onConferenceWillJoin={this.onConferenceWillJoin} style={{ flex: 1, height: '100%', width: '100%' }} />
            </View>
        );
    }
}

export default VideoCall;