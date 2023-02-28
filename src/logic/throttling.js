import { addMinutes, addSeconds, getTime, isAfter } from "date-fns";
import { getThrottleDateFromCache, storeThrottleDateInCache } from "./cache";

export const shouldThrottle = () => {
  const expiredDate = getThrottleDateFromCache();
  const today = getTime(new Date());
  console.log("--------------");
  console.log(expiredDate);
  console.log(today);
  console.log(new Date(expiredDate));
  console.log(new Date());
  console.log("--------------");

  if (!expiredDate) {
    // const newExpiryDate = getTime(addMinutes(new Date(), 30));
    const newExpiryDate = getTime(addSeconds(new Date(), 10));
    storeThrottleDateInCache(newExpiryDate);
    return true;
  }
  if (expiredDate && expiredDate < today) {
    // const newExpiryDate = getTime(addMinutes(new Date(), 30));
    const newExpiryDate = getTime(addSeconds(new Date(), 30));
    storeThrottleDateInCache(newExpiryDate);
    return true;
  }
  return false;
};
