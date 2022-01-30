import dist from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import InputField from '../../components/InputField/InputField';

import './inputform.css';

const InputForm = () => {

    const [cartValue, setCartValue] = useState(0);
    const [distance, setDistance] = useState(0);
    const [numOfItems, setNumOfItems] = useState(0);
    //placeholder for time thingie
    const [deliveryFee, setDeliveryFee] = useState(0);
    //think whether create state placeholder for each fee section and add all up or not.
    const [cartFee, setCartFee] = useState(0);
    const [distanceFee, setDistanceFee] = useState(0)
    const [itemFee, setItemFee] = useState(0);


    //useEffect(() => {
    //    if (deliveryFee > 15) {
    //        console.log("delivery was over 15")
    //        setDeliveryFee(15)
    //    }
    //}, [deliveryFee])

    useEffect(() => {
        if (cartValue >= 100) {
            //if cart over 100, ensure delivery is free no matter what
            //*check if includes rush hour
            console.log("cart is over 100")
            setDeliveryFee(deliveryFee * 0)
        }
    }, [cartValue])


    const handleSubmit = (e) => {
        e.preventDefault();
        //if (cartValue === 0 || distance === 0 || numOfItems === 0) { alert("please fill all the fields!")}
        (cartValue !== 0 && cartValue < 10) ? checkCartValDif(cartValue) : setCartFee(0);
        //if adding unit select, check it here using select && number
        (distance <= 1) ? setDistanceFee(2) : checkDistanceCost(distance);
        (numOfItems <= 4) ? setItemFee(0) : checkItemFee(numOfItems)

        makeCalculation(cartFee, distanceFee, itemFee);

    }
    async function makeCalculation(cartFee, distanceFee, itemFee) {
        await console.log('cartFee+distanceFee+itemFee: ', cartFee + distanceFee + itemFee);
    }

    const checkCartValDif = (cartValue) => {
        setCartFee(10 - cartValue);
    }
    console.log('cartFee: ', cartFee);
    console.log('destanceFee: ', distanceFee);
    console.log('itemFee: ', itemFee);

    const checkDistanceCost = (distance) => {
        let distanceInKm = distance * 1000;
        let temp = Math.floor((distanceInKm - 1000) / 500);
        if (temp < 1) {
            setDistanceFee(3)
        } else {
            setDistanceFee(temp + 2)
        }
    }

    const checkItemFee = (numOfItems) => {
        setItemFee((numOfItems - 4) * 0.5)
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
                        setCartValue(e.target.value)
                    }} />
                <InputField
                    name="distance"
                    label="Distance"
                    value={distance}
                    //add select input for km/m
                    unit="km"
                    onChange={(e) => {
                        setDistance(e.target.value)
                    }} />
                <InputField
                    name="numOfItems"
                    label="Number of Items"
                    value={numOfItems}
                    unit=""
                    onChange={(e) => {
                        setNumOfItems(e.target.value)
                    }} />

                <button className="calculate-fee-btn" type="submit">Calculate my fee</button>
                <h3>Delivery Fee {deliveryFee}€</h3>
            </form>
        </>
    )
}

export default InputForm;