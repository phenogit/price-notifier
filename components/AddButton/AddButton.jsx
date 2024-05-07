import { Text, TouchableOpacity } from "react-native";
import { styles } from "./AddButton.style";

export function AddButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
}
