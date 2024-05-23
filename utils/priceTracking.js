export function getFilteredPriceTrackingList(priceTrackingList, activeTab) {
  switch (activeTab) {
    case "all":
      return priceTrackingList;
    case "inProgress":
      return priceTrackingList.filter((item) => !item.isComplete);
    case "done":
      return priceTrackingList.filter((item) => item.isComplete);
    default:
      return priceTrackingList;
  }
}
