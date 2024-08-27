import { Alert, View, ScrollView } from "react-native";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./Home.style";
import { Header } from "../../components/Header/Header";
import { AddButton } from "../../components/AddButton/AddButton";
import { NavigationTabs } from "../../components/NavigationTabs/NavigationTabs";
import { PriceTrackingList } from "../../components/PriceTrackingList/PriceTrackingList";
import { AddPriceTrackingDialog } from "../../components/AddPriceTrackingDialog/AddPriceTrackingDialog";

let isInitialLoad = false;

export function Home() {
  const [priceTrackingList, setPriceTrackingList] = useState([]);
  const [activeTab, setActiveTab] = useState("inProgress");
  const [isAddPriceTrackingDialogVisible, setIsAddPriceTrackingDialogVisible] =
    useState(false);

  useEffect(() => {
    isInitialLoad = true;
    loadInitialPriceTrackingList();
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      isInitialLoad = false;
      return;
    } else {
      savePriceTrackingList();
    }
  }, [priceTrackingList]);

  console.log(priceTrackingList);

  const scrollViewRef = useRef();

  async function savePriceTrackingList() {
    try {
      await AsyncStorage.setItem(
        "priceTrackingList",
        JSON.stringify(priceTrackingList)
      );
    } catch (error) {
      alert(error);
    }
  }

  async function loadInitialPriceTrackingList() {
    try {
      const priceTrackingList = await AsyncStorage.getItem("priceTrackingList");
      const parsedPriceTrackingList = JSON.parse(priceTrackingList);
      isInitialLoad = true;
      setPriceTrackingList(parsedPriceTrackingList || []);
    } catch (error) {
      alert(error);
    }
  }

  function updatePriceTrackingItem(item) {
    const updatedItemInfo = {
      ...item,
      isComplete: !item.isComplete,
    };

    const updatedList = [...priceTrackingList];
    const indexToUpdate = updatedList.findIndex((i) => i.id === item.id);
    updatedList[indexToUpdate] = updatedItemInfo;
    setPriceTrackingList(updatedList);
  }

  function deletePriceTrackingItem(item) {
    Alert.alert("刪除觸價追蹤", `確定要刪除 ${item.title} 嗎？`, [
      {
        text: "取消",
        style: "cancel",
      },
      {
        text: "確定",
        style: "destructive",
        onPress: () => {
          const updatedList = priceTrackingList.filter((i) => i.id !== item.id);
          setPriceTrackingList(updatedList);
        },
      },
    ]);
  }

  return (
    <>
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.body}>
        <ScrollView ref={scrollViewRef}>
          <PriceTrackingList
            priceTrackingList={priceTrackingList}
            activeTab={activeTab}
            updatePriceTrackingItem={updatePriceTrackingItem}
            deletePriceTrackingItem={deletePriceTrackingItem}
          />
        </ScrollView>
      </View>
      <AddButton onPress={() => setIsAddPriceTrackingDialogVisible(true)} />
      <AddPriceTrackingDialog
        isAddPriceTrackingDialogVisible={isAddPriceTrackingDialogVisible}
        setIsAddPriceTrackingDialogVisible={setIsAddPriceTrackingDialogVisible}
        priceTrackingList={priceTrackingList}
        setPriceTrackingList={setPriceTrackingList}
        scrollViewRef={scrollViewRef}
      />
      <View style={styles.footer}>
        <NavigationTabs
          priceTrackingList={priceTrackingList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>
    </>
  );
}
