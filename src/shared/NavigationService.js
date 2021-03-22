import {NavigationActions} from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer';

let _topNavigator;

function setTopLevelNavigator(navigatorRef) {
  _topNavigator = navigatorRef;
}

function topNavigate(routeName, params) {
  _topNavigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function toggleDrawer() {
  _topNavigator.dispatch(DrawerActions.toggleDrawer());
}

function goBack() {
  _topNavigator.dispatch(NavigationActions.back());
}

export default {
  topNavigate,
  setTopLevelNavigator,
  toggleDrawer,
  goBack,
};
