"use strict";
exports.__esModule = true;
var main_1 = require("../src/main");
var chai_1 = require("chai");
describe('The validate function', function () {
    it('should return true if a valid IBAN is given', function () {
        var result = (0, main_1.validate)('DE22790200760027913168');
        (0, chai_1.expect)(result).to.be["true"];
    });
    it('should return false if an invalid IBAN is given', function () {
        var result = (0, main_1.validate)('DE21790200760027913173');
        (0, chai_1.expect)(result).to.be["false"];
    });
    it('should return false if an IBAN with an invalid length is given', function () {
        var result = (0, main_1.validate)('DE227902007600279131');
        (0, chai_1.expect)(result).to.be["false"];
    });
    it('should return false if an IBAN with an unknown country code is given', function () {
        var result = (0, main_1.validate)('XX22790200760027913168');
        (0, chai_1.expect)(result).to.be["false"];
    });
});
//# sourceMappingURL=main.spec.js.map