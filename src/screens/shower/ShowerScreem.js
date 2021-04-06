import React, { Component } from 'react';
import { View, Text } from 'native-base';
import {
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Arrow from '../../navigations/BackNavigationIcon';
import {  EmptyList} from '../../components';
import { ProgressCircle } from 'react-native-svg-charts';

class ShowerScreem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showerType: [
                {
                    id: 0,
                    name: 'Tosa da raça'
                },
                {
                    id: 1,
                    name: 'Tosa higiênica'
                },
                {
                    id: 2,
                    name: 'Tosa na tesoura'
                },
                {
                    id: 3,
                    name: 'Tosa na máquina'
                }
            ]
        };
    }

    async componentDidMount() { }

    onPress = () => {
        this.props.navigation.navigate('CalendarScreen');
    };

    render() {
        const { item } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <View style={{ backgroundColor: '#FFF', flexDirection: 'row' }}>
                    <Arrow />
                    <View style={{ width: '90%', marginLeft: '-10%', padding: 10 }}>
                        <StepIndicator
                            stepCount={4}
                            labels={[
                                item ? item.type.name : '',
                                item ? item.name : '',
                                'Profissional',
                                'Confirmar',
                            ]}
                            currentPosition={2}
                            customStyles={{
                                labelColor: '#000',
                                separatorFinishedColor: '#94ADEE',
                                separatorUnFinishedColor: '#94ADEE',
                                stepStrokeCurrentColor: '#94ADEE',
                                currentStepLabelColor: '#000',
                                stepIndicatorUnFinishedColor: '#94ADEE',
                                stepIndicatorFinishedColor: '#94ADEE',
                                stepIndicatorLabelCurrentColor: '#000',
                            }}
                        />
                    </View>
                </View>

                <View
                    style={{
                        borderWidth: 1 / 2,
                        marginHorizontal: '2%',
                        borderColor: '#000',
                        marginVertical: '1%',
                        marginTop: '-2%',
                        opacity: 0.1,
                    }}
                />
                <View
                    style={{
                        borderWidth: 1 / 2,
                        marginHorizontal: '1%',
                        borderColor: '#595959',
                        marginVertical: '1%',
                        marginTop: Platform.OS == 'ios' ? '2%' : '-2%',
                        opacity: 0.1,
                        marginLeft: '1%',
                        marginRight: '4%',
                    }}
                />

                <FlatList
                    style={{ paddingLeft: 10, backgroundColor: '#fff' }}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { this.onPress() }}>
                            <View style={{ marginTop: 22, marginEnd: 10, margin: 4 }}>
                                <Text
                                    style={{
                                        textTransform: 'uppercase',
                                        fontWeight: '500',
                                        color: '#595959',
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        paddingLeft: 19,
                                        paddingTop: 22,
                                    }}>
                                    {item.name}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingLeft: 19,
                                        paddingBottom: 22,
                                    }}>
                                    <View style={{ marginLeft: '73%', marginTop: '-12%' }}>

                                        <ProgressCircle
                                            percent={100}
                                            radius={25}
                                            borderWidth={3}
                                            color="#828fff"
                                            shadowColor="#D8F3DC"
                                            bgColor="#828fff">
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: 'bold',
                                                    color: '#fff',
                                                }}>
                                                j
                                                </Text>
                                        </ProgressCircle>

                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={({ id }) => id.toString()}
                    data={this.state.showerType}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={() =>
                        this.state.professionalIsLoading ? null : (
                            <EmptyList message={'Não há dados disponíveis'} />
                        )
                    }
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});

export default ShowerScreem;
