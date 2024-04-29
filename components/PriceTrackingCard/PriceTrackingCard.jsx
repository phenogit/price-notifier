import { styles } from "./PriceTrackingCard.style";
import { Text, TouchableOpacity, Image } from "react-native";
import checkIcon from "../../assets/check.png";

export function PriceTrackingCard({ priceTrackingItem, onPress }) {
  return (
    <>
      <TouchableOpacity style={styles.card}>
        <Text
          style={[
            styles.title,
            priceTrackingItem.isComplete && {
              textDecorationLine: "line-through",
            },
          ]}
        >
          {priceTrackingItem.title} ({priceTrackingItem.currentPrice})
        </Text>
        {priceTrackingItem.isComplete && (
          <Image style={styles.image} source={checkIcon} />
        )}
      </TouchableOpacity>
      <Text style={styles.details}>
        {`觸價條件: 大於 ${priceTrackingItem.ceilingPrice} 或小於 ${priceTrackingItem.floorPrice} `}
      </Text>
    </>
  );
}
