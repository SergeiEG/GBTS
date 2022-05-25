"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateHelper = void 0;
class DateHelper {
    static calculateDifferenceInDays(startDate, endDate) {
        const diffTime = endDate.getTime() - startDate.getTime();
        if (diffTime <= 0) {
            throw new Error("End date must be greater than start date.");
        }
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }
    static generateDateRange(from, to) {
        const dates = [];
        const differenceInDays = DateHelper.calculateDifferenceInDays(from, to);
        dates.push(new Date(from.getFullYear(), from.getMonth(), from.getDate()));
        for (let i = 1; i <= differenceInDays; i++) {
            dates.push(new Date(from.getFullYear(), from.getMonth(), from.getDate() + i));
        }
        return dates;
    }
    static resetTimeInDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
}
exports.DateHelper = DateHelper;
