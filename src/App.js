import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import DrawerNavigation from './navigations/DrawerNavigation';
import {Provider} from 'react-redux';
import store from './store';
import NavigationService from './shared/NavigationService';
import OfflineNotice from './components/OfflineNotice';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <OfflineNotice />
        <StatusBar barStyle="dark-content" />
        <DrawerNavigation
          ref={navigatorRef =>
            NavigationService.setTopLevelNavigator(navigatorRef)
          }
        />
      </Provider>
    );
  }
}
