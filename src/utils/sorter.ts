import moment from 'moment'

/**
 * @param {string} dateA - a date, represented in string format
 * @param {string} dateB - a date, represented in string format
 */
const dateSort = (dateA, dateB) => moment(dateA).diff(moment(dateB))
const numberSort = ((numberA, numberB) => { 
  return numberA - numberB
})
const textSort = ((textA, textB) => { 
  return textA?.length - textB?.length 
})

/**
 *
 * @param {number|string} a
 * @param {number|string} b
 */
const defaultSort = (a, b) => {
  if (a < b) return -1
  if (b < a) return 1
  return 0
}
export const Sorter = {
  DEFAULT: defaultSort,
  DATE: dateSort,
  NUMBER: numberSort,
  TEXT: textSort
}
