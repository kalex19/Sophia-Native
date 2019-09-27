import { StyleSheet } from "react-native";
import theme from '../../theme';

export const styles = StyleSheet.create({
  lists: {
    backgroundColor: theme.primary,
    margin: 10,
    marginBottom: 5,
    marginTop: 5,
    padding: 10,
    borderRadius: 50,
    width: '90%',
    textAlign: 'center'
  },
  listName: {
    color: theme.accentOne,
    fontSize: 30,
    fontFamily: theme.textTwo,
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
  name: {
    color: "white"
  }
})