import { styles } from "./PriceTrackingCard.style";
import { Text, TouchableOpacity, Image } from "react-native";
import checkIcon from "../../assets/check.png";

export function PriceTrackingCard({ priceTrackingItem }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Text
        style={[
          styles.title,
          priceTrackingItem.isComplete && {
            textDecorationLine: "line-through",
          },
        ]}
      >
        {priceTrackingItem.title}
      </Text>
      {priceTrackingItem.isComplete && (
        <Image style={styles.image} source={checkIcon} />
      )}
      <Text style={styles.details}>
        觸價條件: 高於{priceTrackingItem.priceCeiling}
      </Text>
    </TouchableOpacity>
  );
}
