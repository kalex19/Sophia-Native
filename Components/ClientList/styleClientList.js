import { StyleSheet } from "react-native";
import theme from '../../theme';

const styles = StyleSheet.create({
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
  input: {
    borderColor: theme.accentThree,
    borderWidth: 1,
    fontSize: 40,
    textAlign: "center",
    backgroundColor: theme.accentOne,
    width: "85%",
    fontFamily: theme.textTwo,
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
})