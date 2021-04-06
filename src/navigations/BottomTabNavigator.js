import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import MainButton from '../components/MainButton';
import ProfessionalScreen from '../screens/professional/ProfessionalScreen';
import AttendanceScreen from '../screens/attendance/AttendanceScreen';
import PaymentScreen from '../screens/payment/PaymentScreen';
import PaymentCard from '../screens/payment/PaymentCard';
import AddCard from '../screens/payment/AddCard';
import EditCard from '../screens/payment/EditCard';
import NotificationScreen from '../screens/notification/NotificationScreen';
import ProfessionalCalendarScreen from '../screens/professional/ProfessionalCalendarScreen';
import ProfessionalPaymentScreen from '../screens/professional/ProfessionalPaymentScreen';
import ServiceScreen from '../screens/service/ServiceScreen';
import SubspecialityScreen from '../screens/service/SubspecialityScreen';
import ExamDateOrLab from '../screens/service/ExamDateOrLab';
import ExamLabOrSpeciality from '../screens/service/ExamLabOrSpeciality';
import OnlineOrLocal from '../screens/service/OnlineOrLocal';
import ServiceSpeciality from '../screens/service/ServiceSpeciality';
import SpecialityScreen from '../screens/service/SpecialityScreen';
import ServiceCalendarScreen from '../screens/service/ServiceCalendarScreen';
import AppointmentScreen from '../screens/appointment/AppointmentScreen';
import ServicePaymentScreen from '../screens/service/ServicePaymentScreen';
import SchedulingScreen from '../screens/scheduling/SchedulingScreen';
import SchedulingDetailsScreen from '../screens/scheduling/SchedulingDetailsScreen';
import { View, Text } from 'native-base';
import SchedulingButton from '../components/SchedulingButton';
import ProfessionalDetailsScreen from '../screens/professional/ProfessionalDetailsScreen';
import MedicamentScreen from '../screens/medicament/MedicamentScreen';
import DiseaseScreen from '../screens/disease/DiseaseScreen';
import LocationScreen from '../screens/location/LocationScreen';
import LabScreen from '../screens/service/LabScreen';
import TempScreen from '../screens/temp/TempScreen';
import SignIn from '../screens/signIn/SignIn';
import SingUp from '../screens/singup/SingUp';
import Historic from '../screens/appointment/AppointmentHistoric';
import Splash from '../screens/splash/Splash';
import Doctor from '../screens/doctor/Doctor';
import Profile from '../screens/profile/ProfileScreen';
import VideoCall from '../screens/scheduling/Telemedicine';
import ProfessionalListScreen from '../screens/service/ProfessionalList';
import ShowerScreem from '../screens/shower/ShowerScreem';
import calendarScreen from '../screens/calendar/calendarScreen';

const SemTab = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: { header: null, tabBarVisible: null }
    },

    SignIn: {
        screen: SignIn,
        navigationOptions: { header: null, tabBarVisible: false, Tabs: null }
    },

    SingUp: {
        screen: SingUp,
        navigationOptions: { header: null }
    },
}, {
    initialRouteName: 'Splash'
})

const HomeTab = createStackNavigator({

    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerShown: false
        }
    },

    Notification: {
        screen: NotificationScreen,
        navigationOptions: {
            title: "Notificações"
        }
    },

    PaymentScreen: {
        screen: PaymentScreen,
        navigationOptions: { headerShown: false }
    },

    PaymentCard: {
        screen: PaymentCard,
        navigationOptions: { headerShown: false }
    },

    AddCard: {
        screen: AddCard,
        navigationOptions: { headerShown: false }
    },

    EditCard: {
        screen: EditCard,
        navigationOptions: { headerShown: false }
    },



    ServiceScreen: {
        screen: ServiceScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    ServiceCalendarScreen: {
        screen: ServiceCalendarScreen,
        navigationOptions: {
            headerShown: false
        }
    },

    Historic: {
        screen: Historic,
        navigationOptions: {
            headerShown: false
        }
    },

    ServicePaymentScreen: {
        screen: ServicePaymentScreen,
        navigationOptions: {
            headerShown: false
        }
    },

    ProfessionalPaymentScreen: {
        screen: ProfessionalPaymentScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    AppointmentScreen: {
        screen: AppointmentScreen
    },

    Profile: {
        screen: Profile,
        navigationOptions: {
            headerShown: false
        }
    },

    TempScreen: {
        screen: TempScreen,
        navigationOptions: {
            title: "Agenda Médico"
        }
    },

    SignIn: {
        screen: SignIn,
        navigationOptions: { header: null, tabBarVisible: false, Tabs: null }
    },

    VideoCall: {
        screen: VideoCall,
        navigationOptions: { headerShown: false, tabBarVisible: false, },
        tabBarOptions: {
            visible: false
        },
    },

    Doctor: {
        screen: Doctor,
        navigationOptions: { header: null }
    },

    SingUp: {
        screen: SingUp,
        navigationOptions: { header: null }
    },

    MedicamentScreen: {
        screen: MedicamentScreen,
        navigationOptions: { headerShown: false }
    },

    DiseaseScreen: {
        screen: DiseaseScreen,
        navigationOptions: { headerShown: false }
    },

    LocationScreen: {
        screen: LocationScreen,
        navigationOptions: { headerShown: false }
    },

    ExamDateOrLab: {
        screen: ExamDateOrLab,
        navigationOptions: { headerShown: false }
    },

    ExamLabOrSpeciality: {
        screen: ExamLabOrSpeciality,
        navigationOptions: { headerShown: false }
    },

    OnlineOrLocalScreen: {
        screen: OnlineOrLocal,
        navigationOptions: {
            headerShown: false
        }
    },

    ServiceSpeciality: {
        screen: ServiceSpeciality,
        navigationOptions: { headerShown: false }
    },

    SubspecialityScreen: {
        screen: SubspecialityScreen,
        navigationOptions: { headerShown: false }
    },

    LabScreen: {
        screen: LabScreen,
        navigationOptions: { headerShown: false }
    },

    ProfessionalListScreen: {
        screen: ProfessionalListScreen,
        navigationOptions: { headerShown: false }
    },

    SpecialityScreen: {
        screen: SpecialityScreen,
        navigationOptions: { headerShown: false }
    },

    ShowerScreem: {
        screen: ShowerScreem,
        navigationOptions: { headerShown: false }
    },
    CalendarScreen: {
        screen: calendarScreen,
        navigationOptions: { headerShown: false }
    }
});

const CooperatorTab = createStackNavigator({
    Cooperator: {
        screen: ProfessionalScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    CooperatorDetails: {
        screen: ProfessionalDetailsScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    ProfessionalCalendarScreen: {
        screen: ProfessionalCalendarScreen,
        navigationOptions: {
            headerShown: false
        }
    }
});

const SchedulingTab = createStackNavigator({
    Scheduling: {
        screen: SchedulingScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    SchedulingDetails: {
        screen: SchedulingDetailsScreen,
        navigationOptions: {
            headerShown: false
        }
    }
});

const Tabs = createBottomTabNavigator({
    Cooperator: {
        screen: CooperatorTab,
        navigationOptions: () => ({
            tabBarLabel: 'Buscar Profissional',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    size={28}
                    name={focused ? "cloud-search" : "cloud-search-outline"}
                    color={'#af469b'}
                />
            )
        })
    },
    Main: {
        screen: HomeTab,
        navigationOptions: () => ({
            tabBarLabel: () => null,
            tabBarIcon: ({ tintColor, focused }) => (
                <MainButton color={'#af469b'} focused={focused} />
            )
        })
    },
    Scheduling: {
        screen: SchedulingTab,
        navigationOptions: () => ({
            tabBarLabel: 'Agendamentos',
            tabBarIcon: ({ tintColor, focused }) => (
                <SchedulingButton color={'#af469b'} focused={focused} />
            )
        })
    }

},
    {
        initialRouteName: 'Main',
        tabBarOptions: {
            //showLabel: false,
            //activeTintColor: '#e91e63',
            activeTintColor: '#185A9A',
            style: {
                backgroundColor: '#f3f6fe',
                borderTopColor: '#eee',
                padding: 4,
                //height: 50
            }
        }
    });


const AppNavigator = createSwitchNavigator({
    Auth: SemTab,
    Home: Tabs,
});

export default createAppContainer(AppNavigator);