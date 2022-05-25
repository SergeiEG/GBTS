"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceRestController = void 0;
const errors_1 = require("@feathersjs/errors");
const joi_1 = __importDefault(require("joi"));
const DateHelper_1 = require("../../helpers/DateHelper");
class PlaceRestController {
    placeRepository;
    constructor(placeRepository) {
        this.placeRepository = placeRepository;
    }
    async get(id, params) {
        const numericId = Number(id);
        if (!isFinite(numericId) || numericId <= 0) {
            throw new errors_1.BadRequest();
        }
        const coordinates = params?.query?.coordinates || "";
        const place = await this.placeRepository.get(numericId);
        if (place != null && coordinates === "") {
            place.remoteness = 0;
        }
        return place;
    }
    async find(params) {
        const query = params?.query || {};
        const minDate = DateHelper_1.DateHelper.resetTimeInDate(new Date());
        const filterSchema = joi_1.default.object({
            coordinates: joi_1.default.string()
                .pattern(new RegExp("^[0-9]{1,3}.[0-9]{1,15},[0-9]{1,3}.[0-9]{1,15}$"))
                .required(),
            checkInDate: joi_1.default.date().timestamp("unix").min(minDate).required(),
            checkOutDate: joi_1.default.date()
                .timestamp("unix")
                .greater(joi_1.default.ref("checkInDate"))
                .required(),
            maxPrice: joi_1.default.number().min(1).default(0),
        });
        const validationResult = filterSchema.validate(query);
        if (validationResult.error != null) {
            throw new errors_1.BadRequest(validationResult.error.message, validationResult.error.details);
        }
        const validatedParams = validationResult.value;
        const coordinatesArray = validatedParams.coordinates.split(",");
        const filter = {
            coordinates: [Number(coordinatesArray[0]), Number(coordinatesArray[1])],
            startDate: validatedParams.checkInDate,
            endDate: validatedParams.checkOutDate,
            maxPrice: validatedParams.maxPrice,
        };
        return await this.placeRepository.find(filter);
    }
    async patch(id, data, params) {
        const numericId = Number(id);
        if (!isFinite(numericId) || numericId <= 0) {
            throw new errors_1.BadRequest("Place ID is not correct.");
        }
        const placeToBook = await this.get(id);
        if (placeToBook == null) {
            throw new errors_1.NotFound("Place not found.");
        }
        const minDate = DateHelper_1.DateHelper.resetTimeInDate(new Date());
        const query = params?.query || {};
        const bookingSchema = joi_1.default.object({
            checkInDate: joi_1.default.date().timestamp("unix").min(minDate).required(),
            checkOutDate: joi_1.default.date()
                .timestamp("unix")
                .greater(joi_1.default.ref("checkInDate"))
                .required(),
        });
        const validationResult = bookingSchema.validate(query);
        if (validationResult.error != null) {
            throw new errors_1.BadRequest(validationResult.error.message, validationResult.error.details);
        }
        const validatedParams = validationResult.value;
        const booking = validatedParams;
        const dateToBook = DateHelper_1.DateHelper.generateDateRange(booking.checkInDate, booking.checkOutDate);
        return await this.placeRepository.book(placeToBook, dateToBook);
    }
}
exports.PlaceRestController = PlaceRestController;
