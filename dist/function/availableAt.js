"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAvailableat = void 0;
function setAvailableat() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const randomDate = Math.floor(Math.random() * 15);
    const newDate = new Date(today.setDate(today.getDate() + randomDate));
    const randomHours = Math.floor(Math.random() * 9) + 8;
    newDate.setHours(randomHours, 0, 0, 0);
    return newDate;
}
exports.setAvailableat = setAvailableat;
