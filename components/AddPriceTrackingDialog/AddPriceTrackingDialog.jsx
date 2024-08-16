import Dialog from "react-native-dialog";
import { Text } from "react-native";

function isValidTrackingItem(stockId, ceilingPrice, floorPrice) {
  return stockId && ceilingPrice && floorPrice;
}

export function AddPriceTrackingDialog({
  isAddPriceTrackingDialogVisible,
  setIsAddPriceTrackingDialogVisible,
  setStockId,
  stockId,
  stockName,
  currentLowPrice,
  currentHighPrice,
  setCeilingPrice,
  ceilingPrice,
  setFloorPrice,
  floorPrice,
  addPriceTrackingItem,
}) {
  return (
    <Dialog.Container
      visible={isAddPriceTrackingDialogVisible}
      onBackdropPress={() => setIsAddPriceTrackingDialogVisible(false)}
    >
      <Dialog.Title>新增觸價追蹤</Dialog.Title>
      <Dialog.Input
        label="股票代號"
        placeholder="請輸入股票代號"
        onChangeText={setStockId}
      />
      <Text>
        {stockName}: {currentLowPrice} - {currentHighPrice}
      </Text>
      <Dialog.Input
        label="上限價"
        placeholder="請輸入上限價"
        onChangeText={setCeilingPrice}
      />
      <Dialog.Input
        label="下限價"
        placeholder="請輸入下限價"
        onChangeText={setFloorPrice}
      />
      <Dialog.Button
        label="取消"
        onPress={() => setIsAddPriceTrackingDialogVisible(false)}
      />
      <Dialog.Button
        label="新增"
        onPress={addPriceTrackingItem}
        disabled={!isValidTrackingItem(stockId, ceilingPrice, floorPrice)}
      />
    </Dialog.Container>
  );
}
