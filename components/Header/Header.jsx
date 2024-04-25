import { styles } from "./Header.style";
import { Text, Image } from "react-native";
import logoImage from "../../assets/logo.jpeg";

export function Header() {
  return (
    <>
      <Image style={styles.logo} source={logoImage} resizeMode="contain" />
      <Text style={styles.subtitle}>股價到價通知</Text>
    </>
  );
}
