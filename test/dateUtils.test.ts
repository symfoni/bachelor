import assert from 'assert';
import { describe } from 'mocha';
import { computeYearsBetweenDates } from '../src/utils/dateUtils';

describe('dateUtils', function () {
	describe('computeYearsBetweenDates', () => {
		it('should return the correct amount of years between two dates', () => {
			const years = computeYearsBetweenDates('2020-01-01', '2018-01-01');
			assert.equal(years, 2);
		});

		it('should return the correct amount of years between todays date and the year 2000', () => {
			// this will fail in the year 2023 :)
			const todaysDate = new Date().toISOString();
			const years = computeYearsBetweenDates(todaysDate, '2000-01-01');
			assert.equal(years, 22);
		});
	});
});