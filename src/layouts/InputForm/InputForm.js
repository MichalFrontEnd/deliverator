import dist from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import InputField from '../../components/InputField/InputField';

import './inputform.css';

const InputForm = () => {
    const [cartValue, setCartValue] = useState(0);
    const [distance, setDistance] = useState(0);
    const [numOfItems, setNumOfItems] = useState(0);
    //placeholder for time thingie
    //think whether create state placeholder for each fee section and add all up or not.
    const [cartFee, setCartFee] = useState(0);
    const [distanceFee, setDistanceFee] = useState(0)
    const [itemFee, setItemFee] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(cartFee + distanceFee + itemFee);


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
        //prevent submition of empty fields
        //if (cartValue === 0 || distance === 0 || numOfItems === 0) {
        //    window.alert("please fill all the fields!")
        //}
        //(cartValue !== 0 && cartValue < 10) ? checkCartValDif(cartValue) : setCartFee(0);
        //if adding unit select, check it here using select && number




        makeCalculation();
    }

    async function makeCalculation() {
        await setDeliveryFee(cartFee + distanceFee + itemFee);
    }

    console.log('deliverFee: ', deliveryFee);


    const handleCartChange = (cart) => {
        setCartValue(cart);
        (cart !== 0 && cart < 10) ? setCartFee(10 - cart) : setCartFee(0);
    }

    const handleDistanceChange = (dist) => {
        setDistance(dist);
        (dist <= 1) ? setDistanceFee(2) : checkDistanceCost(dist);
    }

    const handleItemNumChange = (num) => {
        setNumOfItems(num);
        (num <= 4) ? setItemFee(0) : setItemFee((num - 4) * 0.5)
    }

    console.log('cartFee: ', cartFee);
    console.log('destanceFee: ', distanceFee);
    console.log('itemFee: ', itemFee);

    const checkDistanceCost = (distance) => {
        console.log("I got here")
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
                        handleCartChange(e.target.value)
                    }} />
                <InputField
                    name="distance"
                    label="Distance"
                    value={distance}
                    //add select input for km/m
                    unit="km"
                    onChange={(e) => {
                        handleDistanceChange(e.target.value)
                    }} />
                <InputField
                    name="numOfItems"
                    label="Number of Items"
                    value={numOfItems}
                    unit=""
                    onChange={(e) => {
                        handleItemNumChange(e.target.value)
                    }} />

                <button className="calculate-fee-btn" type="submit">Calculate my fee</button>
                <h3>Delivery Fee {deliveryFee}€</h3>
            </form>
        </>
    )
}

export default InputForm;