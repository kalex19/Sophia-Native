import { StyleSheet } from "react-native";
import theme from '../../theme';

export const styles = StyleSheet.create({
  editItem: {
    fontSize: 15,
    color: theme.accentOne,
    fontFamily: theme.textTwo,
  },
  vertically: {
    flexDirection: "column",
    alignItems: "center"
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
    backgroundColor: theme.primary,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 5,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: "space-between"
  },
  plus: {
    fontSize: 50,
    color: theme.accentOne
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
    flexDirection: "column",
    backgroundColor: theme.primary,
    width: "90%",
    height: "40%",
    justifyContent: "space-around",
    margin: 10,
    borderRadius: 50,
    textAlign: 'center',
  },
  liveText: {
    color: theme.accentOne,
    fontFamily: theme.textMain,
    marginBottom: 40,
    marginHorizontal: 60,
    fontSize: 20,
  },
  text: {
    color: theme.accentOne,
    fontSize: 30,
    fontFamily: theme.textTwo,
    textAlign: "center",
    paddingTop: 25,
  },
  touchExpander: {
    height: "80%",
    borderRadius: 50,
    width: "100%",
  },
  emptyContainer: {
    alignSelf: 'stretch',
    backgroundColor: theme.accentOne,
  },
  input: {
    borderColor: theme.accentThree,
    borderWidth: 1,
    fontSize: 40,
    textAlign: "center",
    backgroundColor: theme.accentOne,
    width: "85%",
    fontFamily: theme.textTwo,
  },
});