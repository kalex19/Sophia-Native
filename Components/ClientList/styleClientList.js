import { StyleSheet } from "react-native";
import theme from '../../theme';

export const styles = StyleSheet.create({
  editItem: {
    fontSize: 25,
    color: theme.accentOne,
    fontFamily: theme.textTwo,
    marginRight: 15,
  },
  vertically: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },  
  listItem: {
    fontSize: 25,
    color: theme.accentOne,
    padding: 5
  },
  align: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.accentOne
  },
  lists: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.primary,
    alignItems: "center",
    margin: 10,
    marginBottom: 1,
    marginTop: 1,
    padding: 10
  },
  listName: {
    color: theme.accentOne,
    fontSize: 40,
    fontFamily: theme.textTwo
  },
  headerContainer: {
    borderColor: theme.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    padding: 10
  },
  header: {
    fontSize: 40,
    fontFamily: theme.textMain,
    textAlign: "center"
  },
  addListContainer: {
    margin: 10,
    textAlign: 'center',
  },
  plus: {
    fontSize: 50,
    color: theme.accentTwo
  },
  emptyContainer: {
    alignSelf: 'stretch',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  noPermissionsText: {
    textAlign: 'center',
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
    height: '100%',
  },
  recordingDataContainer: {
    backgroundColor: theme.primary,
    width: "90%",
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 50,
    textAlign: 'center',
  },
  text: {
    color: theme.accentOne,
    fontSize: 30,
    margin: 10,
    fontFamily: theme.textTwo,
    textAlign: "center",
  },
  liveText: {
    color: theme.primary,
    fontFamily: theme.textMain,
    marginLeft: 40,
    margin: 10,
    fontSize: 25,
  },
  touchExpander: {
    height: "100%",
    borderRadius: 50,
    width: "100%",
  },
  emptyContainer: {
    alignSelf: 'stretch',
    backgroundColor: theme.accentOne,
  },
  input: {
    borderColor: theme.primary,
    borderWidth: 1,
    fontSize: 40,
    textAlign: "center",
    backgroundColor: theme.accentThree,
    width: "100%",
    fontFamily: theme.textTwo,
    color: theme.primary,
  },
  submitBtnContainer: {
    backgroundColor: theme.primary,
    width: "90%",
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 50,
    textAlign: 'center',
  },
  submitBtn: {
    color: theme.accentOne,
    fontSize: 30,
    fontFamily: theme.textTwo,
    textAlign: "center",
    padding: 5,
  },
});