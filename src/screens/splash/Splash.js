import React, {Component} from 'react';
import {
  Text,
  View,
  LinearGradient,
  StatusBar,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URI} from '../../constants/config';
import {authHeaders} from '../../api/utils';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setPatient} from '../../actions/patient';

const mapStateToProps = state => {
  return {
    patient: state.patient,
  };
};

class Splash extends Component {
  static propTypes = {
    setPatient: PropTypes.func.isRequired,
    state: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let img = require('../images/logoName.png');
    setTimeout(async () => {
      const id = await AsyncStorage.getItem('access_token');
      if (id) {
        //const user = JSON.parse(await AsyncStorage.getItem('pet'));
       //* this.props.setPatient(user)
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('SignIn');
      }
    }, 2000);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={img}
            style={{width: 320, height: 143, marginTop: '5%'}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imagem: {
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 290,
    marginTop: '50%',
  },
});
export default connect(
  mapStateToProps,
  {setPatient},
)(Splash);
