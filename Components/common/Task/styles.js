import { StyleSheet } from "react-native";
import theme from '../../../theme';

export const styles = StyleSheet.create({
  lists: {
    backgroundColor: theme.primary,
    alignItems: "center",
    margin: 20,
    marginBottom: 1,
    marginTop: 1,
    padding: 10,
    width: '90%',
    borderRadius: 20,
  },
  listItemHeaderContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: theme.primary,
    alignItems: "center",
    width: "90%",
  },
  listItemHeaderContainerDONE: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "green",
    alignItems: "center",
    width: "100%"
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
    textAlign: "center"
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
  editCheck: {
    fontSize: 40,
    color: theme.accentOne,
  },
  vertically: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
  },
  editItem: {
    fontSize: 15,
    color: theme.accentOne,
    fontFamily: theme.textTwo
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
    justifyContent: "space-evenly",
    flexDirection: "column",
    width: '95%',
  },
  align: {
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    backgroundColor: theme.accentOne,
    borderColor: theme.accentThree,
    borderWidth: 1,
    margin: 2,
    fontSize: 25,
    fontFamily: theme.textMain,
    textAlign: "center",
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  label: {
    color: theme.accentOne,
    fontSize: 20,
    fontFamily: theme.textTwo,
    margin: 10,
  },
  submitBtnContainer: {
    backgroundColor: theme.primary,
    width: "90%",
    height: 50,
    margin: 10,
    borderRadius: 50,
    textAlign: 'center',
    backgroundColor: theme.accentOne,
  },
  submitBtn: {
    color: theme.primary,
    fontSize: 30,
    fontFamily: theme.textTwo,
    textAlign: "center",
    paddingTop: 10,
  },
  priorityLevels: {
    flexDirection: "row"
  },
  priorityFont: {
    color: "white",
    fontSize: 15,
    width: 150,
    textAlign: "center"
  }
});