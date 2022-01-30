import dist from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import InputField from '../../components/InputField/InputField';

import './inputform.css';

const InputForm = () => {
    const [cartValue, setCartValue] = useState<number>(0);
    const [distance, setDistance] = useState<number>(0);
    const [numOfItems, setNumOfItems] = useState<number>(0);
    //placeholder for time thingie
    //think whether create state placeholder for each fee section and add all up or not.
    const [cartFee, setCartFee] = useState<number>(0);
    const [distanceFee, setDistanceFee] = useState<number>(0);
    const [itemFee, setItemFee] = useState<number>(0);
    const [deliveryFee, setDeliveryFee] = useState<number>(cartFee + distanceFee + itemFee);

    const handleSubmit = (e):void => {
        e.preventDefault();
        //prevent submition of empty fields
        //if (cartValue === 0 || distance === 0 || numOfItems === 0) {
        //    window.alert("please fill all the fields!")

        //sets free delivery for purchases over 100e
        if (cartValue >= 100) {
            setDeliveryFee(deliveryFee * 0)
        } else {
        //if delivery should be charged, set max delivery price at 15e
            let total = (cartFee + distanceFee + itemFee);
            total >= 15 ? setDeliveryFee(15) : setDeliveryFee(total);
        }
    }

    //calculates additional fee for cart total under 10e
    const handleCartChange = (cart):void => {
        setCartValue(cart);
        //remove validation when uncommenting validation onSubmit
        (cart !== 0 && cart < 10) ? setCartFee(10 - cart) : setCartFee(0);
    }

    //checks if extra distance fee should be added over base delivery fee 
    const handleDistanceChange = (dist):void => {
        setDistance(dist);
        //if adding unit select, check it here using select && number
        (dist <= 1) ? setDistanceFee(2) : checkDistanceCost(dist);
    }

    //calculates additional fee for item quantity over 4
    const handleItemNumChange = (num):void => {
        setNumOfItems(num);
        (num <= 4) ? setItemFee(0) : setItemFee((num - 4) * 0.5)
    }

    //console.log('cartFee: ', cartFee);
    //console.log('destanceFee: ', distanceFee);
    //console.log('itemFee: ', itemFee);
    //console.log('deliverFee: ', deliveryFee);

    //calculates additional delivery fee for added distant orders
    const checkDistanceCost = (distance):void => {
        let distanceInKm = distance * 1000;
        let temp = Math.floor((distanceInKm - 1000) / 500);
        if (temp < 1) {
            setDistanceFee(3)
        } else {
            setDistanceFee(temp + 2)
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
            >
                <InputField
                    name="cart-value"
                    label="Cart Value"
                    value={cartValue}
                    unit="€"
                    onChange={(e) => {
                        handleCartChange((e.target as HTMLInputElement).value)
                    }} />
                <InputField
                    name="distance"
                    label="Distance"
                    value={distance}
                    //add select input for km/m?
                    unit="km"
                    onChange={(e) => {
                        handleDistanceChange((e.target as HTMLInputElement).value)
                    }} />
                <InputField
                    name="numOfItems"
                    label="Number of Items"
                    value={numOfItems}
                    unit=""
                    onChange={(e) => {
                        handleItemNumChange((e.target as HTMLInputElement).value)
                    }} />

                <button className="calculate-fee-btn" type="submit">Calculate my fee</button>
                <h3>Delivery Fee {deliveryFee}€</h3>
            </form>
        </>
    )
}

export default InputForm;