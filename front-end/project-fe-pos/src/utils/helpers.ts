import { DateFormat } from '@/contants/string.constants';
import { i18n } from '@/features/language';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';

export function getQueryParam(name: string): string | null {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(name);
}
export const tokenExpired = (token: string) => {
  const decoded = jwtDecode(token);
  const utcTime = moment.unix(decoded.exp || 0);
  const tokenExpireDate = new Date(utcTime.format('M/DD/YYYY hh:mm:ss A UTC'));
  const currentDate = Date.now();
  const tokenExpired = moment(currentDate).isAfter(tokenExpireDate) ?? false;
  return tokenExpired;
};

/**
 * Capitalize the first letter of each word in a string
 * @param {*} string
 * @input "i have learned something new today"
 * @output "I Have Learned Something New Today"
 **/
export const capitalizeFirstLetterEachWord = (words: string) => {
  if (words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
      separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(' ');
  }
  return '';
};

/**
 * Capitalize uppercase a string
 * @param {*} string
 * @output "I HAVE LEARNED SOMETHING NEW TODAY"
 **/
export const capitalizeUpperCaseWord = (words: string) => {
  if (words) {
    return words.toUpperCase();
  }
  return '';
};

/// Format date
export const formatDate = (date: any, format: string) => {
  if (format) {
    return moment.utc(date).local().format(format);
  }
  return moment.utc(date).local().format(DateFormat.DD_MM_YYYY);
};

export const stringDate = (languageCode: any) => {
  return moment()
    .toDate()
    .toLocaleDateString(languageCode || 'en-US');
};

export const formatShortDate = (datetimeString: any) => {
  const languageCode = i18n.language;
  const date = new Date(datetimeString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString(languageCode, { month: 'short' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

/**
 * Convert utc time to local time
 * @example utc 1AM => local time = 8AM (+7 GMT)
 * @param {*} dateTime
 * @returns
 */
export const convertUtcToLocalTime = (dateTime: any) => {
  if (dateTime) return moment.utc(dateTime).local();
  return null;
};

/// Run the function in next tick
export const executeAfter = (ms: any, callback: any) => {
  clearTimeout((window as any).searchTimeout);
  return new Promise((resolve: any) => {
    (window as any).searchTimeout = setTimeout(() => {
      callback();
      resolve();
    }, ms);
  });
};
