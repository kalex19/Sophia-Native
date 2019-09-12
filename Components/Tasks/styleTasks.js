import { StyleSheet } from "react-native";
import theme from '../../theme';

export const styles = StyleSheet.create({
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
  listItemHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.primary,
    alignItems: "center",
    width: "100%"
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
    width: "85%"
  },
  listItemSecond: {
    textAlign: "center",
    fontSize: 20,
    color: theme.accentOne,
    fontFamily: theme.textMain,
    width: "85%"
  },
  listItem: {
    fontSize: 40,
    color: theme.accentOne,
    padding: 8,
    paddingLeft: 12
  },
  addTaskContainer: {
    backgroundColor: theme.primary,
    alignItems: "center",
    margin: 10,
    padding: 5,
    paddingLeft: 8,
    paddingRight: 0,
    justifyContent: "space-between",
    flexDirection: "row"
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
  taskNoteDue: {
    width: '85%'
  }
});