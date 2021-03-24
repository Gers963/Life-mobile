import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputStyles: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 3,
    },
    inputSelect: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        margin: 10,
        width: '85%',
        backgroundColor: '#FFF',
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 3,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        margin: 10,
        backgroundColor: '#FFF',
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 3,
        marginTop: 16,
    },
    imageStyle: {
        padding: 10,
        margin: 5,
        alignItems: 'center',
    },
    imageSocial: {
        padding: 10,
        margin: 5,
        alignItems: 'center',
        color: '#fff'
    },
    input: {
        height: 50,
        minWidth: 200,
        fontSize: 15,
    },
    linkContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    loadingButton: {
        color: "#24A27E",
        padding: 10
    },
    button: {
        height: 50,
        borderRadius: 35,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 3,
        minWidth: 250,
        marginBottom: 20,
        backgroundColor: '#24A27E'
    },
    buttonLogin: {
        width: '80%',
        height: 50,
        alignItems: "center",
        alignSelf: 'center',
        borderRadius: 10,
        minWidth: 250,
        marginBottom: Platform.OS == 'ios' ? -20 : 60,
        backgroundColor: '#af469b',
    },
    buttonCad: {
        width: 40,
        height: 50,
        minWidth: 250,
        backgroundColor: 'transparent',
        marginTop: 20,
        alignItems:'center',
        alignSelf:"center",
        marginTop: Platform.OS == "ios" ? '28%' : '1%'     
    },
    buttonCamera: {
        height: 50,
        borderRadius: 35,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 3,
        minWidth: 250,
        marginBottom: 20,
        backgroundColor: '#ef8c1f',
        marginTop: 16
    },
    buttonFacebook: {
        height: 50,
        borderRadius: 35,
        marginTop: 16,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 3,
        minWidth: 300,
        marginBottom: 20,
        backgroundColor: '#3B5998'
    },
    buttonGoogle: {
        height: 50,
        borderRadius: 35,
        marginTop: 0,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 3,
        minWidth: 300,
        marginBottom: 20,
        backgroundColor: '#f00'
    },
    buttonInstagram: {
        height: 50,
        borderRadius: 35,
        marginTop: 0,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 3,
        minWidth: 300,
        marginBottom: 20,
        backgroundColor: '#de0045'
    },
    buttonArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 16,
        color: '#af469b',
    },
    small: {
        fontSize: 13,
        color: 'red',
        marginHorizontal: 15,
        marginTop: -17,
    },
    title: {
    
        fontSize: 16,
  
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        marginTop: '-8%'
    },
    image: {
        width: 120, 
        height: 210, 
        marginBottom: 16, 
        marginTop: 16
    }
});

export default styles;