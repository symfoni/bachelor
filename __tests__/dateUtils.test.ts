import assert from 'assert';
import { describe } from 'mocha';
import { computeMonthsBetweenDates, computeYearsBetweenDates } from '../src/utils/dateUtils';

describe('dateUtils', function () {
	describe('computeYearsBetweenDates', () => {
		it('should return the correct amount of years between two dates', () => {
			const years = computeYearsBetweenDates('2020-01-01', '2018-01-01');
			assert.equal(years, 2);
		});

		it('should return the correct amount of years between todays date and the year 2000', () => {
			// ! this will fail in the year 2023 :)
			const todaysDate = new Date().toISOString();
			const years = computeYearsBetweenDates(todaysDate, '2000-01-01');
			assert.equal(years, 22);
		});
		
		it('should return an error if given an invalid date', ()=>{
			const result = computeYearsBetweenDates('gibberish', 'foobar');
			if (result instanceof Error) {
				assert.ok;
			}
		});
	});
	
	describe('computeMonthsBetweenDates', ()=>{
		it('should return the correct amount of months between two dates', ()=>{
			const months = computeMonthsBetweenDates('2022-01-01', '2022-04-04');
			assert.equal(months, 3);
		});
		
		it('should return an error if given an invalid date', ()=>{
			const result = computeMonthsBetweenDates('gibberish', 'foobar');
			if (result instanceof Error) {
				assert.ok;
			}
		});
	});
});