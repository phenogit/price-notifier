import { View } from "react-native";

import { styles } from "./PriceTrackingList.style";
import { getFilteredPriceTrackingList } from "../../utils/priceTracking";
import { PriceTrackingCard } from "../PriceTrackingCard/PriceTrackingCard";

export function PriceTrackingList({
  priceTrackingList,
  activeTab,
  updatePriceTrackingItem,
  deletePriceTrackingItem,
}) {
  return getFilteredPriceTrackingList(priceTrackingList, activeTab).map(
    (priceTrackingItem) => (
      <View key={priceTrackingItem.id} style={styles.cardItem}>
        <PriceTrackingCard
          priceTrackingItem={priceTrackingItem}
          onPress={updatePriceTrackingItem}
          onLongPress={deletePriceTrackingItem}
        />
      </View>
    )
  );
}
