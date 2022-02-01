const FREE_DISTANCE_FEE = 1000;
const FREE_ITEM_FEE = 4;

//calculates additional fee for cart total under 10e
export const calculateCartFee = (cartValue: number): number => {
    //setCartValue(cart);
    return cartValue < 10 ? 10 - cartValue : 0;
};

//checks if extra distance fee should be added over base delivery fee
export const calculateDistanceFee = (distance: number): number => {
    //setDistance(dist);
    //if adding unit select, check it here using select && number
    return distance <= FREE_DISTANCE_FEE ? 2 : Math.ceil(distance / 500);
};

//calculates additional fee for item quantity over 4
export const calculateItemNumberFee = (numOfItems: number): number => {
    //setNumOfItems(num);
    return numOfItems <= FREE_ITEM_FEE ? 0 : (numOfItems - FREE_ITEM_FEE) * 0.5;
};

const isRushHour = (date): boolean => {
    console.log("date: ", date);
    const currentDay = date.getDay();
    const currentHour = date.getHours();
    return currentDay === 5 && currentHour >= 15 && currentHour <= 19;
};

export const calculateRushHourFee = (date, totalFee): number => {
    return isRushHour(date) ? Number((totalFee * 1.1).toFixed(2)) : totalFee;
};

export const isMaxFee = (totalFee): boolean => {
    return totalFee >= 15;
};

export const isMaxCartValue = (cartValue): boolean => {
    return cartValue >= 100;
};
