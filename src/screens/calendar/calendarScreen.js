import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types'
import { paged, current, pagedProfessional } from '../../actions/calendar'
import { pagedPlace } from '../../actions/place'
import { connect } from 'react-redux'
import StepIndicator from 'react-native-step-indicator';
import Arrow from '../../navigations/BackNavigationIcon';

const mapStateToProps = state => {
    return {
        state: state.calendar,
    }
}

class CalendarScreen extends Component {

    static propTypes = {
        paged: PropTypes.func.isRequired,
        pagedProfessional: PropTypes.func.isRequired,
        pagedPlace: PropTypes.func.isRequired,
        state: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {

            loading: false,
            dates: {
                '2021-05-22': [{ name: 'item 1 - any js object' }],
                '2021-05-23': [{ name: 'item 2 - any js object', height: 80 }],
                '2021-05-24': [],
                '2021-05-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
            },
            rows: [],
            filtered: [],
            isModalFilter: false,
        };
    }



    componentDidMount() {
        const { navigation } = this.props;
        const item = navigation.getParam("item", {});

    }

    onSearch = (text) => {

    }

    onPress = (row) => {
        this.props.navigation.navigate('ProfessionalPaymentScreen', { item: row });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ backgroundColor: "#FFF", flexDirection: 'row' }}>
                    <Arrow />
                    <View style={{ width: '90%', marginLeft: '-10%', padding: 10 }}>
                        <StepIndicator
                            stepCount={3}
                            labels={["Profissionais", "Horário", "Confirmar"]}
                            currentPosition={1}

                            customStyles={{ labelColor: '#000', separatorFinishedColor: '#94ADEE', separatorUnFinishedColor: '#94ADEE', stepStrokeCurrentColor: '#94ADEE', currentStepLabelColor: '#000', stepIndicatorUnFinishedColor: '#94ADEE', stepIndicatorFinishedColor: '#94ADEE', stepIndicatorLabelCurrentColor: '#000' }}
                        />
                    </View>
                </View>
                <View style={{ borderWidth: 1 / 2, marginHorizontal: '2%', borderColor: '#000', marginVertical: '1%', marginTop: '-2%', opacity: 0.1 }} />

                <Agenda
                    items={this.state.dates}
                    pastScrollRange={1}
                    theme={{ selectedDayBackgroundColor: '#94ADEE', dotColor: '#00cc00', agendaTodayColor: '#C83A45', backgroundColor: '#FFF' }}
                    minDate={'2020-03-07'}
                    renderEmptyData={() => {
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Text style={{ fontFamily: 'Titillium Web', fontSize: 14, color: 'grey' }}>Não existe agenda para o dia selecionado</Text>
                            </View>)
                    }}
                    futureScrollRange={3}
                    renderItem={(item, firstItemInDay) => {
                        return (
                            <TouchableOpacity style={styles.item} onPress={() => this.onPress(item)}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon size={16} name={"hospital"} color={'#CA4A6E'} />
                                    <View>
                                        <Text style={{ fontFamily: 'Titillium Web', fontSize: 12, paddingLeft: 5, color: '#8C8E93' }}>{item.name}</Text>
                                    </View>
                                </View>
                                <View style={{ borderWidth: 1 / 2, marginHorizontal: '2%', borderColor: '#000', marginTop: 4, marginVertical: '1%', opacity: 0.1 }} />
                            </TouchableOpacity>
                        );
                    }}
                >
                </Agenda>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    item: {
        backgroundColor: '#FFF',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        //height: 80
    }
});

export default connect(mapStateToProps, { paged, pagedProfessional, current, pagedPlace })(CalendarScreen)