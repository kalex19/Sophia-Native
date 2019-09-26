import { StyleSheet } from 'react-native';
import theme from '../../theme';
export default StyleSheet.create({
    headerContainer: {
        borderBottomColor: theme.primary,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 40
    },
    header: {
        fontSize: 50,
        fontFamily: theme.textMain
    },
    greeting: {
        fontSize: 35,
        fontFamily: theme.textMain,
        marginBottom: 25,
        textAlign: 'center'
    },
    button: {
        color: theme.accentOne,
        fontSize: 30,
        fontFamily: theme.textTwo,
        textAlign: 'center'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
});