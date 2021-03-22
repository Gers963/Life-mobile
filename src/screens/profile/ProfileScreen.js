import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  Picker,
} from 'react-native';
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import SearchBar from 'react-native-search-bar';
import { Card, CardItem, Left, Body, Thumbnail, Item, Label } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import ProgressCircle from 'react-native-progress-circle';
import AsyncStorage from '@react-native-community/async-storage';
import { timing } from 'react-native-reanimated';
import { TextInputMask } from 'react-native-masked-text';
import Modal from 'react-native-modal';
import { authHeaders } from '../../api/utils';
import { BASE_URI } from '../../constants/config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePatient } from '../../actions/patient';
import { medicamentList } from '../../actions/medicament';
import { diseaseList } from '../../actions/disease';
import ImagePicker from 'react-native-image-picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const mapStateToProps = state => {
  return {
    medicament: state.medicament,
    patient: state.patient,
    disease: state.disease,
  };
};

class ProfileScreen extends Component {
  static propTypes = {
    medicamentList: PropTypes.func.isRequired,
    updatePatient: PropTypes.func.isRequired,
    diseaseList: PropTypes.func.isRequired,
    state: PropTypes.object,
  };

  static navigationOptions = () => {
    return null;
  };

  constructor(props) {
    super(props);
    this.state = {
      medicaments: [],
      diseases: [],
      patientDiseases: [],
      patientMedicaments: [],
      selectedMedicaments: [],
      selectedDiseases: [],
      imgSelected: null,
      isPhoto: false,
      isGalery: false,
      base64: '',
      baseSave: '',
      imageName: '',
      isLoading: false,
      editAccount: false,
      patient: {},
      name: '',
      items: [],
      medicamentsItems: [],
      diseasesItems: []
    };
  }

  async componentDidMount() {
    this.getPatient();
    this.getMedicamentsAndDiseseSpecifiPatient()
    this.setState({
      name: await AsyncStorage.getItem('@coft:userName'),
    });
  }

  async getAllMedicamentsAndDiseases(type) {

    if (type === 1) {
      var fromtatedMedicaments = [];

      await fetch(`${BASE_URI}/v1/medicament`, {
        method: 'GET',
        headers: await authHeaders(),
      }).then(res => res.json())
        .then(response => {
          response.content.forEach(element => {
            fromtatedMedicaments.push({ id: element.id, name: element.fullName, type: 'MEDICAMENT' })
          });
        })

      this.setState({
        medicaments: fromtatedMedicaments
      })
    } else {
      var fromtatedDiseases = [];

      await fetch(`${BASE_URI}/v1/disease`, {
        method: 'GET',
        headers: await authHeaders(),
      }).then(res => res.json())
        .then(response => {
          response.content.forEach(element => {
            fromtatedDiseases.push({ id: element.id, name: element.fullName, type: 'DISEASE' })
          });
        })

      this.setState({
        diseases: fromtatedDiseases
      })
    }
  }

  async getMedicamentsAndDiseseSpecifiPatient() {
    const id = this.props.patient.rows.id

    fetch(`${BASE_URI}/v1/patient-disease?patientId=${id}`, {
      method: 'GET',
      headers: await authHeaders()
    }).then(res => res.json())
      .then(response => {
        for (let i = 0; i < response.content.length; i++) {
          const element = response.content[i];
          this.setState({
            diseasesItems: [...this.state.diseasesItems, {
              icon: 'dna',
              color: '#63D4CC',
              title: element.disease.fullName,
              description: element.disease.annotation,
            }],
            selectedDiseases: [...this.state.selectedDiseases, element.disease.id]
          })
        }
        this.setState({ patientDiseases: response.content })
      })

    fetch(`${BASE_URI}/v1/patient-medicament?patientId=${id}`, {
      method: 'GET',
      headers: await authHeaders()
    }).then(res => res.json())
      .then(response => {
        for (let i = 0; i < response.content.length; i++) {
          const element = response.content[i];
          this.setState({
            items: [...this.state.items, {
              icon: 'pill',
              color: '#95D5B2',
              title: element.medicament.fullName,
              description: element.medicament.annotation,
            }],
            medicamentsItems: [...this.state.medicamentsItems, {
              icon: 'pill',
              color: '#95D5B2',
              title: element.medicament.fullName,
              description: element.medicament.annotation,
            }],
            selectedMedicaments: [...this.state.selectedMedicaments, element.medicament.id]
          })
        }
        this.setState({ patientMedicaments: response.content })
      })
  };

  getPatient = async () => {
    this.setState({
      patient: this.props.patient.rows,
    });
  };

  async funcao() {
    //const id = this.props.patient.rows.id

    this.setState({ items: this.state.diseasesItems })

    /*fetch(`${BASE_URI}/v1/patient-disease?patientId=${id}`, {
      method: 'GET',
      headers: await authHeaders()
    }).then(res => res.json())
      .then(response => {
        for (let i = 0; i < response.content.length; i++) {
          const element = response.content[i];
          this.setState({
            items: [...this.state.items, {
              icon: 'dna',
              color: '#63D4CC',
              title: element.disease.fullName,
              description: element.disease.annotation,
            }]
          })
        }
      })*/
  }

  async funcaoV() {
    //const id = this.props.patient.rows.id

    this.setState({ items: this.state.medicamentsItems })

    /*fetch(`${BASE_URI}/v1/patient-medicament?patientId=${id}`, {
      method: 'GET',
      headers: await authHeaders()
    }).then(res => res.json())
      .then(response => {
        for (let i = 0; i < response.content.length; i++) {
          const element = response.content[i];
          this.setState({
            items: [...this.state.items, {
              icon: 'pill',
              color: '#95D5B2',
              title: element.medicament.fullName,
              description: element.medicament.annotation,
            }]
          })
        }
      })*/
  }

  async componentDidUpdate(nexProps) {
    if (
      this.props.patient.rows !== nexProps.patient.rows &&
      this.props.patient.error === ''
    ) {
      this.getMedicamentsAndDiseseSpecifiPatient()
      await AsyncStorage.setItem('@coft:userName', `${this.props.patient.rows.fullName}`);
      await AsyncStorage.setItem('user', JSON.stringify(this.props.patient.rows));
      this.setState({ isLoading: false, editAccount: false });
    }
  }

  updatePatient = async () => {
    this.setState({ isLoading: true });
    const id = await AsyncStorage.getItem('@coft:patientId');
    const patient = {
      shortName: this.state.patient.shortName,
      email: this.state.patient.email,
      password: this.state.patient.password,
      cpf: this.state.patient.cpf,
      phone: this.state.patient.phone.replace(/[^\d]+/g, ''),
      image: null,
      fatherName: this.state.patient.fatherName,
      motherName: this.state.patient.motherName,
      thumbnail: this.state.imgSelected,
      active: true,
      fullName: this.state.patient.fullName
    };

    this.props.updatePatient(patient, id);

    //DISEASES
    for (let i = 0; i < this.state.selectedDiseases.length; i++) {
      for (let j = 0; j < this.state.patientDiseases.length; j++) {
        if (this.state.selectedDiseases[i] === this.state.patientDiseases[j].disease.id) {
          this.state.selectedDiseases.splice(i, 1);
          this.state.patientDiseases.splice(j, 1)
        }
      }
    }
    for (let i = 0; i < this.state.patientDiseases.length; i++) {
      fetch(`${BASE_URI}/v1/patient-disease/${this.state.patientDiseases[i].id}`, {
        method: 'DELETE',
        headers: await authHeaders()
      })
    }
    for (let i = 0; i < this.state.selectedDiseases.length; i++) {
      fetch(`${BASE_URI}/v1/patient-disease`, {
        method: 'POST',
        headers: await authHeaders(),
        body: JSON.stringify({
          diseaseId: this.state.selectedDiseases[i],
          patientId: this.props.patient.rows.id
        })
      })
    }

    //MEDICAMENTS
    for (let i = 0; i < this.state.selectedMedicaments.length; i++) {
      for (let j = 0; j < this.state.patientMedicaments.length; j++) {
        if (this.state.selectedMedicaments[i] === this.state.patientMedicaments[j].medicament.id) {
          this.state.selectedMedicaments.splice(i, 1);
          this.state.patientMedicaments.splice(j, 1)
        }
      }
    }
    for (let i = 0; i < this.state.patientMedicaments.length; i++) {
      fetch(`${BASE_URI}/v1/patient-medicament/${this.state.patientMedicaments[i].id}`, {
        method: 'DELETE',
        headers: await authHeaders()
      })
    }
    for (let i = 0; i < this.state.selectedMedicaments.length; i++) {
      fetch(`${BASE_URI}/v1/patient-medicament`, {
        method: 'POST',
        headers: await authHeaders(),
        body: JSON.stringify({
          medicamentId: this.state.selectedMedicaments[i],
          patientId: this.props.patient.rows.id
        })
      })
    }

    this.setState({
      diseasesItems: [],
      selectedDiseases: [],
      patientDiseases: [],
      medicamentsItems: [],
      selectedMedicaments: [],
      patientMedicaments: [],
      items: [],
    })

    await AsyncStorage.setItem(
      '@coft:userName',
      `${this.props.patient.rows.fullName}`,
    );
  };

  onPhoto = async () => {
    const options = {
      title: '',
      takePhotoButtonTitle: 'Tirar nova foto',
      chooseFromLibraryButtonTitle: 'Escolher da galeria',
      cancelButtonTitle: 'Cancelar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        this.setState({
          imgSelected: response.uri,
          base64: response.data,
          baseSave: `data:${response.type};base64,${response.data}`,
          imageName: response.origURL,
          patient: {
            ...this.state.patient,
            thumbnail: {
              key: response.uri,
            },
          },
        });
      }
    });
  };

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  render() {
    const { editAccount, isLoading, medicaments, diseases, items } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: '#FFF', justifyContent: 'flex-start' }}>
          <DrawerNavigationIcon />
        </View>
        <StatusBar barStyle="dark-content" />

        <View style={{ alignItems: 'center', marginTop: '-8%' }}>
          <TouchableOpacity
            disabled={!editAccount}
            onPress={() => this.onPhoto()}>
            <View style={{ flexDirection: 'row' }}>
              <Thumbnail
                large
                source={{
                  uri: this.state.patient.thumbnail
                    ? this.state.patient.thumbnail.key
                    : 'https://jornalggn.com.br/sites/default/files/u16/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg',
                }}
              />
              {editAccount ? (
                <>
                  <Icon
                    name={'circle'}
                    size={32}
                    color={'gray'}
                    style={{
                      marginTop: 50,
                      marginLeft: 50,
                      position: 'absolute',
                    }}
                  />
                  <Icon
                    name={'account-edit'}
                    size={25}
                    color={'#fff'}
                    style={{
                      marginTop: 52,
                      marginLeft: 54,
                      position: 'absolute',
                    }}
                  />
                </>
              ) : (
                  <></>
                )}
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, marginTop: 8 }}>
            {this.props.patient.rows.fullName}
          </Text>
          <Text style={{ fontSize: 13, color: 'gray' }}>
            {this.props.patient.rows.email}
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.setState({ editAccount: !this.state.editAccount })
            }>
            <Text style={{ fontSize: 14, color: 'gray', marginTop: 19 }}>
              Editar perfil
            </Text>
          </TouchableOpacity>
        </View>

        {!editAccount ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '7%',
                marginBottom: '2%',
              }}>
              <TouchableOpacity onPress={() => this.funcaoV()}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 2,
                    paddingLeft: '20%',
                    paddingRight: 8,
                  }}>
                  <Text
                    style={{
                      color: '#95D5B2',
                      fontSize: 18,
                      paddingLeft: 5,
                      fontWeight: 'bold',
                    }}>
                    Medicamentos
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.funcao()}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 2,
                    paddingLeft: '25%',
                    paddingRight: 8,
                  }}>
                  <Text
                    style={{
                      color: '#b26d8e',
                      fontSize: 18,
                      paddingLeft: 5,
                      fontWeight: 'bold',
                    }}>
                    Enfermidades
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1 / 2,
                marginHorizontal: '2%',
                borderColor: '#000',
                marginVertical: '1%',
                marginTop: '-2%',
                opacity: 0.2,
              }}
            />
            <ScrollView style={{ backgroundColor: '#FFF' }}>
              {items.length >= 1 ?
                items.map(item => (
                  <>
                    <View style={{ margin: 12, flexDirection: 'row', marginTop: 30 }}>

                      <ProgressCircle
                        percent={100}
                        radius={35}
                        borderWidth={3}
                        color={item.color}
                        color={item.color}
                        bgColor="#fff">
                        <Icon
                          name={item.icon}
                          size={23}
                          color={item.color}
                          style={{ marginTop: 4 }}
                        />
                      </ProgressCircle>
                      <View
                        style={{
                          flexDirection: 'column',
                          margin: 9,
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            color: 'gray',
                            fontSize: 19,
                            fontWeight: 'bold',
                          }}>
                          {item.title}
                        </Text>
                        <Text
                          style={{ marginRight: 15, fontSize: 14, color: '#6C757D' }}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </>
                )) : (
                  <Text style={{ fontWeight: 'bold', fontSize: 17, textAlign: 'center', color: 'gray' }}>Nada encontrado</Text>
                )
              }
            </ScrollView>
          </>
        ) : (
            <>
              <ScrollView style={{ marginTop: 10 }}>
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
                  <Label>Nome completo:</Label>
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
                    value={this.state.patient.fullName}
                    onChangeText={fullName =>
                      this.setState({
                        patient: { ...this.state.patient, fullName },
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
                  <Label>Nome curto:</Label>
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
                    value={this.state.patient.shortName}
                    onChangeText={shortName =>
                      this.setState({
                        patient: { ...this.state.patient, shortName },
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
                  <Label>CPF:</Label>
                  <TextInputMask
                    type={'cpf'}
                    style={{
                      color: '#595959',
                      marginTop: Platform.OS == 'ios' ? 10 : -6,
                      marginLeft: Platform.OS == 'ios' ? 8 : 4,
                      width: '100%',
                      fontSize: Platform.OS == 'ios' ? 17 : 14,
                    }}
                    value={this.state.patient.cpf}
                    onChangeText={cpf => {
                      this.setState({
                        patient: { ...this.state.patient, cpf },
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
                    marginBottom: '5%',
                  }}>
                  <Label>Celular:</Label>
                  <TextInputMask
                    type={'cel-phone'}
                    style={{
                      color: '#595959',
                      marginTop: Platform.OS == 'ios' ? 10 : -6,
                      marginLeft: Platform.OS == 'ios' ? 8 : 4,
                      width: '100%',
                      fontSize: Platform.OS == 'ios' ? 17 : 14,
                    }}
                    value={this.state.patient.phone}
                    onChangeText={phone => {
                      this.setState({
                        patient: { ...this.state.patient, phone },
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
                    value={this.state.patient.email}
                    onChangeText={email => {
                      this.setState({
                        patient: { ...this.state.patient, email },
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
                    marginBottom: '5%',
                  }}>
                  <Label>Nome da mãe:</Label>
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
                    value={this.state.patient.motherName}
                    onChangeText={motherName => {
                      this.setState({
                        patient: { ...this.state.patient, motherName },
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
                    marginBottom: '5%',
                  }}>
                  <Label>Nome do pai:</Label>
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
                    value={this.state.patient.fatherName}
                    onChangeText={fatherName => {
                      this.setState({
                        patient: { ...this.state.patient, fatherName },
                      });
                    }}
                  />
                </Item>

                <View>
                  <SectionedMultiSelect
                    items={medicaments}
                    IconRenderer={Icons}
                    uniqueKey="id"
                    colors={{
                      primary: '#828fff'
                    }}
                    onToggleSelector={() => this.getAllMedicamentsAndDiseases(1)}
                    selectText="Medicamentos"
                    searchPlaceholderText="Buscar"
                    confirmText="Confirmar"
                    noItemsComponent={() => <Text>Nada encontrado</Text>}
                    noResultsComponent={() => <Text>Nada encontrado</Text>}
                    onSelectedItemsChange={(selectedMedicaments) => this.setState({ selectedMedicaments })}
                    selectedItems={this.state.selectedMedicaments}
                  />
                </View>

                <View>
                  <SectionedMultiSelect
                    items={diseases}
                    IconRenderer={Icons}
                    uniqueKey="id"
                    colors={{
                      primary: '#828fff'
                    }}
                    onToggleSelector={() => this.getAllMedicamentsAndDiseases(2)}
                    selectText="Doenças"
                    searchPlaceholderText="Buscar"
                    confirmText="Confirmar"
                    noItemsComponent={() => <Text>Nada encontrado</Text>}
                    noResultsComponent={() => <Text>Nada encontrado</Text>}
                    onSelectedItemsChange={(selectedDiseases) => this.setState({ selectedDiseases })
                    }
                    selectedItems={this.state.selectedDiseases}
                  />
                </View>


                <View style={{ paddingBottom: 80 }}>
                  <TouchableOpacity
                    style={[styles.buttonLogin, { marginTop: '8%' }]}
                    disabled={isLoading}
                    onPress={() => this.updatePatient()}>
                    <View style={styles.buttonArea}>
                      {isLoading ? (
                        <>
                          <ActivityIndicator
                            style={styles.buttonText}
                            color={'#fff'}
                          />
                        </>
                      ) : (
                          <>
                            <Text style={[styles.buttonText, { color: '#fff' }]}>
                              Salvar
                        </Text>
                          </>
                        )}
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
  },
  buttonArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLogin: {
    width: '80%',
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    minWidth: 250,
    marginBottom: 100,
    backgroundColor: '#828fff',
  },
});
export default connect(
  mapStateToProps,
  {
    medicamentList,
    updatePatient,
    diseaseList
  },
)(ProfileScreen);
