import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
    editItem: {
        fontSize: 25,
        color: theme.accentOne,
        fontFamily: theme.textTwo,
        marginRight: 15
    },
    vertically: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listItem: {
        fontSize: 25,
        color: theme.accentOne,
        padding: 5
    },
    align: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.accentOne
    },
    lists: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.primary,
        alignItems: 'center',
        margin: 10,
        padding: 10
    },
    listName: {
        color: theme.accentOne,
        fontSize: 40,
        fontFamily: theme.textTwo
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    noPermissionsText: {
        textAlign: 'center'
    },
    recordingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: theme.primary,
        borderRadius: 50,
        width: '90%',
        margin: 10,
        height: '100%'
    },
    recordingDataContainer: {
        backgroundColor: theme.primary,
        width: '90%',
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 50,
        textAlign: 'center'
    },
    text: {
        color: theme.accentOne,
        fontSize: 30,
        margin: 10,
        fontFamily: theme.textTwo,
        textAlign: 'center'
    },
    liveText: {
        color: theme.primary,
        fontFamily: theme.textMain,
        marginLeft: '20%',
        margin: 10,
        fontSize: 25
    },
    touchExpander: {
        height: '100%',
        borderRadius: 50,
        width: '100%'
    },
    emptyContainer: {
        alignSelf: 'stretch',
        backgroundColor: theme.accentOne
    },
    input: {
        borderWidth: 1,
        fontSize: 40,
        textAlign: 'center',
        backgroundColor: theme.accentT,
        width: '100%',
        fontFamily: theme.textTwo
    }
});