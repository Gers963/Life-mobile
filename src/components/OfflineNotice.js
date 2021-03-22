import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, AppState} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>
        Verifique a sua conexão com a internet
      </Text>
    </View>
  );
}

class OfflineNotice extends PureComponent {
  _netInfo = null;
  _appState = null;

  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      isConnected: true,
    };

    NetInfo.fetch().then(state => {
      this.setState({isConnected: state.isConnected});
    });
  }

  componentDidMount() {
    _netInfo = NetInfo.addEventListener(this.handleConnectivityChange);
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    _netInfo();
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleConnectivityChange = state => {
    this.setState({isConnected: state.isConnected});
  };

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      NetInfo.fetch().then(this.handleConnectivityChange);
    }
    this.setState({appState: nextAppState});
  };

  render() {
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  offlineText: {color: '#FF3D35'},
});

export default OfflineNotice;
