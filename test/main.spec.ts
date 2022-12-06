import { validate } from '../src/main';
import { expect } from 'chai';

describe('The validate function', function () {
    it('should return true if a valid IBAN is given', function () {
        const result = validate('DE22790200760027913168');

        expect(result).to.be.true;
    });

    it('should return false if an invalid IBAN is given', function () {
        const result = validate('DE21790200760027913173');

        expect(result).to.be.false;
    });

    it('should return false if an IBAN with an invalid length is given', function () {
        const result = validate('DE227902007600279131');

        expect(result).to.be.false;
    });

    it ('should return false if an IBAN with an unknown country code is given', function () {
        const result = validate('XX22790200760027913168');

        expect(result).to.be.false;
    });
});