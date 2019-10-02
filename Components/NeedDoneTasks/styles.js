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
    borderRadius: 20,
  },
  listItemHeaderContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: theme.primary,
    alignItems: "center",
    width: "90%",
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
  addTaskContainer: {
    backgroundColor: theme.accentOne,
    alignItems: "center",
    margin: 10,
    justifyContent: "space-evenly",
    flexDirection: "column",
    width: '90%',
    borderRadius: 5,
    borderColor: theme.primary,
    borderWidth: 5,
    alignSelf: 'center'
  },
  label: {
    color: theme.primary,
    fontSize: 30,
    fontFamily: theme.textMain,
    margin: 10,
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