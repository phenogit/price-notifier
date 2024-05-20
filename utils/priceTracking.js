export function getFilteredPriceTrackingList(priceTrackingList, activeTab) {
  switch (activeTab) {
    case "all":
      return priceTrackingList;
    case "inProgress":
      return priceTrackingList.filter((item) => !item.isComplete);
    case "completed":
      return priceTrackingList.filter((item) => item.isComplete);
    default:
      return priceTrackingList;
  }
}
