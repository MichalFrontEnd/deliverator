import { calculateCartFee, calculateDistanceFee, calculateItemNumberFee, calculateRushHourFee, isMaxFee, isMaxCartValue } from "./utils";

describe("utility functions", () => {
    describe("#calculateCartFee", () => {
        it("should return fee for cart value under 10 Euros", () => {
            expect(calculateCartFee(6)).toEqual(4);
        });

        it("should return float fee for cart value under 10 Euros", () => {
            expect(calculateCartFee(6.3)).toEqual(3.7);
        });

        it("should not return fee for cart value over 10 Euros", () => {
            expect(calculateCartFee(12)).toEqual(0);
        });
    });

    describe("#calculateDistanceFee", () => {
        it("should return fee of 3 for distance of 1499", () => {
            expect(calculateDistanceFee(1499)).toEqual(3);
        });

        it("should return fee of 3 for distance of 1500", () => {
            expect(calculateDistanceFee(1500)).toEqual(3);
        });

        it("should return fee of 4 for distance of 1501", () => {
            expect(calculateDistanceFee(1501)).toEqual(4);
        });

        it("should return fee of 2 for distance of 900", () => {
            expect(calculateDistanceFee(900)).toEqual(2);
        });

    });

    describe("#calculateItemNumberFee", () => {
        it("should return fee of 0 for item number of 4", () => {
            expect(calculateItemNumberFee(4)).toEqual(0);
        });

        it("should return fee of 0.5 for item number of 5", () => {
            expect(calculateItemNumberFee(5)).toEqual(0.5);
        });

        it("should return fee of 3 for item number of 10", () => {
            expect(calculateItemNumberFee(10)).toEqual(3);
        });
    });

    describe("#calculateRushHourFee", () => {
        it("should return fee of 9.9 for cart total of 9 during rush hour", () => {
            const rushHourTime = new Date("2022-01-28T16:33:45.478Z")
            expect(calculateRushHourFee(rushHourTime, 9)).toEqual(9.90);
        });

        it("should return same fee for purchases not during rush hour", () => {
            const rushHourTime = new Date("2022-01-28T12:33:45.478Z")
            expect(calculateRushHourFee(rushHourTime, 9)).toEqual(9);
        });
    });
    
    describe("#isMaxFee", () => {
        it("should return true for delivery fee over 15", () => {
            expect(isMaxFee(19)).toEqual(true);
        });

        it("should return false for delivery fee under 15", () => {
            expect(isMaxFee(4)).toEqual(false);
        });
    });

    describe("#isMaxCartValue", () => {
        it("should return true for cart value over 100", () => {
            expect(isMaxCartValue(120)).toEqual(true);
        });

        it("should return false for cart value under 100", () => {
            expect(isMaxCartValue(40)).toEqual(false);
        });
    });
});
