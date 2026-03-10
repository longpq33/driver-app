import { StyleSheet } from "react-native";
import { COLORS } from "../../../themes/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    height: '100%',
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  contentContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  }
});