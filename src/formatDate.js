'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function convertYear(year) {
  return year >= 30
    ? '19' + year
    : '20' + year;
}

function formatDate(date, fromFormat, toFormat) {
  const splitDate = date.split(fromFormat[fromFormat.length - 1]);
  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      let year = (splitDate[fromFormat.indexOf('YY')]
                  || splitDate[fromFormat.indexOf('YYYY')]);

      if (toFormat[i] === 'YY') {
        if (year.length === 4) {
          year = year.slice(2);
        }
      } else if (toFormat[i] === 'YYYY') {
        if (year.length === 2) {
          const convertedYear = convertYear(year);

          result.push(convertedYear);
          continue;
        }
      }

      result.push(year);
    } else if (toFormat[i] === 'MM') {
      result.push(splitDate[fromFormat.indexOf('MM')]);
    } else if (toFormat[i] === 'DD') {
      result.push(splitDate[fromFormat.indexOf('DD')]);
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
