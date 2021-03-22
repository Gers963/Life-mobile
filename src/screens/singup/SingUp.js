import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';
import { createPet } from '../../actions/pet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Styles';
import { Item, Label } from 'native-base';
import Arrow from '../../navigations/BackNavigationIcon';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { validarCpf, validarEmail } from '../../../validations';

const mapStateToProps = state => {
  return {
    pet: state.pet,
  };
};

class TempScreen extends Component {
  static propTypes = {
    createPet: PropTypes.func.isRequired,
    state: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      modalVisible: false,
      pet: {
        email: null,
        password: null,
        name: null,
        ownerName: null,
      },
    };
  }

  async componentDidUpdate(nexProps) {
    if (
      this.props.pet.rows !== nexProps.pet.rows &&
      this.props.pet.error === ''
    ) {
      this.props.navigation.navigate('SignIn');
    }
  }

  submit = async pet => {
    if (
      pet.name == null ||
      pet.ownerName == null ||
      pet.email == null ||
      pet.password == null
    ) {
      Alert.alert('LifePet', 'Preencha todos os campos para continuarmos.');
    } else {
      /*if (!validarCpf(pet.cpf.replace(/[^\d]+/g, ''))) {
        return;
      }
      */
      if (!validarEmail(pet.email)) {
        return;
      }
      try {
        const values = {
          ...pet,
        };
        this.props.createPet(values);
      } catch (erro) {
        console.log(erro);
      }
    }
  };

  render() {
    let img = require('../images/logoName.png');
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={{ marginTop: 10 }}>
            <Arrow />
          </View>

          <View style={{ marginLeft: '8%', marginTop: '-15%'}}>
            <Image
              source={img}
              style={{ width: 320, height: 143, marginTop: '5%', marginBottom: '-10%'}}
            />
          </View>

          <ScrollView>
            <View>

              <Item
                stackedLabel
                style={{
                  marginHorizontal: 16,
                  borderBottomColor: '#d9d9d9',
                  overflow: 'hidden',
                  marginLeft: '7%',
                  marginRight: '7%',
                  height: 40,
                  marginBottom: '5%',
                  marginTop: '5%',
                }}>
                <Label>Nome do animal:</Label>
                <TextInput
                  autoCapitalize={'none'}
                  placeholderTextColor={'#333333'}
                  underlineColorAndroid={'transparent'}
                  style={{
                    position: 'absolute',
                    marginTop: Platform.OS == 'ios' ? 30 : 18,
                    width: '100%',
                    color: '#595959',
                    fontSize: Platform.OS == 'ios' ? 17 : 14,
                  }}
                  value={this.state.pet.name}
                  onChangeText={name =>
                    this.setState({
                      pet: { ...this.state.pet, name },
                    })
                  }
                />
              </Item>

              <Item
                stackedLabel
                style={{
                  marginHorizontal: 16,
                  borderBottomColor: '#d9d9d9',
                  overflow: 'hidden',
                  marginLeft: '7%',
                  marginRight: '7%',
                  height: 40,
                  marginBottom: '5%',
                  marginTop: '5%',
                }}>
                <Label>Nome do dono:</Label>
                <TextInput
                  autoCapitalize={'none'}
                  placeholderTextColor={'#333333'}
                  underlineColorAndroid={'transparent'}
                  style={{
                    position: 'absolute',
                    marginTop: Platform.OS == 'ios' ? 30 : 18,
                    width: '100%',
                    color: '#595959',
                    fontSize: Platform.OS == 'ios' ? 17 : 14,
                  }}
                  value={this.state.pet.ownerName}
                  onChangeText={ownerName =>
                    this.setState({
                      pet: { ...this.state.pet, ownerName },
                    })
                  }
                />
              </Item>

              <Item
                stackedLabel
                style={{
                  marginHorizontal: 16,
                  borderBottomColor: '#d9d9d9',
                  overflow: 'hidden',
                  marginLeft: '7%',
                  marginRight: '7%',
                  height: 40,
                  marginBottom: '5%',
                }}>
                <Label>E-mail:</Label>
                <TextInput
                  autoCapitalize={'none'}
                  placeholderTextColor={'#333333'}
                  underlineColorAndroid={'transparent'}
                  style={{
                    position: 'absolute',
                    marginTop: Platform.OS == 'ios' ? 30 : 18,
                    width: '100%',
                    color: '#595959',
                    fontSize: Platform.OS == 'ios' ? 17 : 14,
                  }}
                  value={this.state.pet.email}
                  onChangeText={email => {
                    this.setState({
                      pet: { ...this.state.pet, email },
                    });
                  }}
                />
              </Item>

              <Item
                stackedLabel
                style={{
                  marginHorizontal: 16,
                  borderBottomColor: '#d9d9d9',
                  overflow: 'hidden',
                  marginLeft: '7%',
                  marginRight: '7%',
                  height: 40,
                  marginBottom: '53 %',
                }}>
                <Label>Senha:</Label>
                <TextInput
                  secureTextEntry={true}
                  autoCapitalize={'none'}
                  placeholderTextColor={'#333333'}
                  underlineColorAndroid={'transparent'}
                  style={{
                    position: 'absolute',
                    marginTop: Platform.OS == 'ios' ? 30 : 18,
                    width: '100%',
                    color: '#595959',
                    fontSize: Platform.OS == 'ios' ? 17 : 14,
                  }}
                  value={this.state.pet.password}
                  onChangeText={password => {
                    this.setState({
                      pet: { ...this.state.pet, password },
                    });
                  }}
                />
              </Item>
            </View>

            <View
              style={{
                marginHorizontal: 25,
                marginTop: -30,
                flexDirection: 'row',
                paddingBottom: 80,
              }}>
              <TouchableOpacity
                style={{ marginTop: -2, marginRight: 7 }}
                onPress={() =>
                  this.setState({ isSelected: !this.state.isSelected })
                }>
                <Icon
                  size={25}
                  color={!this.state.isSelected ? '#d9d9d9' : '#828fff'}
                  name={
                    !this.state.isSelected
                      ? 'checkbox-blank-circle-outline'
                      : 'checkbox-marked-circle-outline'
                  }
                />
              </TouchableOpacity>
              <View>
                <Label style={{ color: 'gray' }}>Li e aceito os </Label>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: true })}>
                <Label style={{ color: '#828fff' }}>termos</Label>
              </TouchableOpacity>
              <View>
                <Label style={{ color: 'gray' }}> de uso </Label>
              </View>
            </View>

            <View>
              <TouchableOpacity
                style={[styles.buttonLogin, { marginTop: '6%' }]}
                onPress={() => this.submit(this.state.pet)}>
                <View style={styles.buttonArea}>
                  <Text style={[styles.buttonText, { color: '#fff' }]}>
                    Cadastrar-se
                    </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <Modal
            hideModalContentWhileAnimating={true}
            isVisible={this.state.modalVisible}
            useNativeDriver={true}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 7,
                width: '100%',
                height: '80%',
              }}>
              <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 20,
                  marginBottom: 20,
                  flexDirection: 'row',
                }}>
                <Label style={{ color: '#828fff', fontWeight: 'bold' }}>
                  Termos de uso
                  </Label>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    marginLeft: Platform.OS == 'ios' ? '85%' : '84%',
                    marginTop: Platform.OS == 'ios' ? '-15%' : '-15%',
                  }}
                  onPress={() =>
                    this.setState({ modalVisible: !this.state.modalVisible })
                  }>
                  <Icon
                    size={45}
                    color={'#828fff'}
                    name={'close-circle-outline'}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={{ marginLeft: 20, marginRight: 20 }}>
                  <Text style={{ flexWrap: 'wrap' }}>{/*terms*/}TERMS</Text>
                </View>

                <View
                  style={{
                    marginHorizontal: 25,
                    marginTop: 20,
                    marginBottom: 30,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{ marginTop: -2, marginRight: 7 }}
                    onPress={() =>
                      this.setState({
                        isSelected: !this.state.isSelected,
                        modalVisible: !this.state.modalVisible,
                      })
                    }>
                    <Icon
                      size={25}
                      color={!this.state.isSelected ? '#d9d9d9' : '#828fff'}
                      name={
                        !this.state.isSelected
                          ? 'checkbox-blank-circle-outline'
                          : 'checkbox-marked-circle-outline'
                      }
                    />
                  </TouchableOpacity>
                  <View>
                    <Label style={{ color: 'gray' }}>Aceitar</Label>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  { createPet },
)(TempScreen);
