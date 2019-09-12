import { StyleSheet } from "react-native";
import theme from '../../theme';

export const styles = StyleSheet.create({
  lists: {
    backgroundColor: theme.primary,
    alignItems: "center",
    margin: 20,
    marginBottom: 1,
    marginTop: 1,
    padding: 10,
    width: '90%',
  },
  listItemHeaderContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: theme.primary,
    alignItems: "center",
    width: "90%"
  },
  listItemHeader: {
    textAlign: "center",
    fontSize: 40,
    color: theme.accentOne,
    fontFamily: theme.textMain,
    width: "100%",
    fontFamily: theme.textTwo,
  },
  taskNoteDue: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '90%',
    fontFamily: theme.textTwo,
  },
  listItemSecond: {
    textAlign: "center",
    fontSize: 20,
    color: theme.accentOne,
    fontFamily: theme.textMain,
    width: "100%",
    margin: 10,
    fontFamily: theme.textTwo,
  },
  listComplete: {
    fontSize: 20,
    color: theme.accentOne,
    padding: 8,
    paddingLeft: 12,
    fontFamily: theme.textTwo,
  },
  alignEdit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: theme.accentOne
  },
  inputEdit: {
    width: "85%",
    backgroundColor: theme.accentOne,
    fontSize: 38,
    fontFamily: theme.textMain
  },
  input: {
    backgroundColor: theme.accentOne,
    borderColor: theme.accentThree,
    borderWidth: 1,
    margin: 2,
    fontSize: 40,
    fontFamily: theme.textMain,
    textAlign: "center",
    width: 320
  },
  label: {
    color: theme.accentOne,
    fontSize: 20,
    fontFamily: theme.textMain
  },
  align: {
    justifyContent: "center",
    alignItems: "center"
  },
  plus: {
    color: theme.accentOne,
    backgroundColor: theme.primary,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 50
  },
  vertically: {
    flexDirection: "column",
    alignItems: "center"
  },
  editItem: {
    fontSize: 15,
    color: theme.accentOne,
    fontFamily: theme.textMain
  },
  alignEdit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: theme.accentOne
  },
  listHeader: {
    borderColor: theme.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    padding: 10
  },
  listName: {
    fontSize: 40,
    fontFamily: theme.textMain,
    textAlign: "center"
  },
  addTaskContainer: {
    backgroundColor: theme.primary,
    alignItems: "center",
    margin: 10,
    padding: 5,
    paddingLeft: 8,
    paddingRight: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    width: '80%',
  },
});