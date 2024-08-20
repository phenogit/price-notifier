import Dialog from "react-native-dialog";
import { Text } from "react-native";
import uuid from "react-native-uuid";
import { useEffect, useState } from "react";

import { StockInfoAPI } from "../../api/stockInfo";

function isValidTrackingItem(stockId, ceilingPrice, floorPrice) {
  return stockId && ceilingPrice && floorPrice;
}

function addPriceTrackingItem(
  stockId,
  currentStockInfo,
  ceilingPrice,
  floorPrice,
  priceTrackingList,
  setPriceTrackingList
) {
  console.log(priceTrackingList);
  const newPriceTrackingItem = {
    id: uuid.v4(),
    title: `${stockId} ${currentStockInfo.name}`,
    ceilingPrice,
    floorPrice,
    currentPrice: `${currentStockInfo.avgPrice}`,
    isComplete: false,
  };

  setPriceTrackingList([...priceTrackingList, newPriceTrackingItem]);
  /*
  setStockId("");
  setCeilingPrice("");
  setFloorPrice("");
  setIsAddPriceTrackingDialogVisible(false);
  setTimeout(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, 300);
  */
}

export function AddPriceTrackingDialog({
  isAddPriceTrackingDialogVisible,
  setIsAddPriceTrackingDialogVisible,
  priceTrackingList,
  setPriceTrackingList,
}) {
  const [stockId, setStockId] = useState("");
  const [currentStockInfo, setCurrentStockInfo] = useState({});
  const [ceilingPrice, setCeilingPrice] = useState("");
  const [floorPrice, setFloorPrice] = useState("");

  console.log(priceTrackingList);

  useEffect(() => {
    // disallow useless API calls
    if (stockId === "" || stockId.length < 4) {
      return;
    }
    getStockInfo(stockId);
  }, [stockId]);

  async function getStockInfo(stockId) {
    try {
      console.log(stockId);
      const stockInfo = await StockInfoAPI.getStockInfo(stockId);
      setCurrentStockInfo(stockInfo);
      console.log(stockInfo);
    } catch (error) {
      alert(error);
    }
  }

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
        {currentStockInfo.name}: {currentStockInfo.lowPrice} -{" "}
        {currentStockInfo.highPrice}
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
        onPress={() =>
          addPriceTrackingItem(
            stockId,
            currentStockInfo,
            ceilingPrice,
            floorPrice,
            priceTrackingList,
            setPriceTrackingList
          )
        }
        disabled={!isValidTrackingItem(stockId, ceilingPrice, floorPrice)}
      />
    </Dialog.Container>
  );
}
