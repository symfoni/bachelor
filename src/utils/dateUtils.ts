import moment from 'moment';

/**
 * computeYearsBetweenDates computes the year difference between two dates.
 * @param date1 the first date as a string
 * @param date2 the second date as a string
 * @returns the absolute value of the year difference.
 */
export function computeYearsBetweenDates(date1: string, date2: string): number {
	const momentDate1 = moment(date1);
	const momentDate2 = moment(date2);

	const yearDiff = momentDate1.diff(momentDate2,'years');
    
	return Math.abs(yearDiff);
}

/**
 * computeMonthsBetweenDates computes the month difference between two dates.
 * @param date1 the first date as a string
 * @param date2 the second date as a string
 * @returns the absolute value of the month difference.
 */
export function computeMonthsBetweenDates(date1: string, date2: string): number{
	const momentDate1 = moment(date1);
	const momentDate2 = moment(date2);

	const monthDiff = momentDate1.diff(momentDate2, 'months');

	return Math.abs(monthDiff);
}