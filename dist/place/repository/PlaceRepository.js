"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceRepository = void 0;
const errors_1 = require("@feathersjs/errors");
const DateHelper_1 = require("../../helpers/DateHelper");
class PlaceRepository {
    storage;
    constructor(storage) {
        this.storage = storage;
    }
    async get(id) {
        return this.storage.data[String(id)];
    }
    async find(filter) {
        if (filter.coordinates[0] !== 59.9386 || filter.coordinates[1] !== 30.3141) {
            return [];
        }
        let places = Object.values(this.storage.data);
        if (filter.maxPrice !== 0) {
            places = places.filter((place) => {
                return place.price <= filter.maxPrice;
            });
        }
        const dateRange = DateHelper_1.DateHelper.generateDateRange(filter.startDate, filter.endDate);
        places = places.filter((place) => {
            return this.checkIfPlaceAreAvailableForDates(place, dateRange);
        });
        return places;
    }
    async book(place, dateRange) {
        if (!this.checkIfPlaceAreAvailableForDates(place, dateRange)) {
            throw new errors_1.BadRequest(`Place ${place.id} is not available for dates ${dateRange.join(",")}.`);
        }
        const bookedDates = dateRange.map((date) => {
            return date.getTime();
        });
        place.bookedDates = bookedDates;
        this.storage.data[String(place.bookedDates)] = place;
        await this.storage.write();
        return place;
    }
    checkIfPlaceAreAvailableForDates(place, dateRange) {
        return dateRange.every((date) => {
            return !place.bookedDates.includes(date.getTime());
        });
    }
}
exports.PlaceRepository = PlaceRepository;
