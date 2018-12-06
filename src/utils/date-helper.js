import moment from 'moment';

export function month(currDay) {
  const dateFormat = 'YYYY-MM-DD';
  let today = currDay? moment(currDay):moment();
  let todayStr = today.format(dateFormat);
  let todayDate = today.date()
  let todayDateStr =  ( todayDate<10 ? '0' + todayDate : todayDate);
  let todayDay = today.day();
  let isToday = moment().date() == todayDate  ;
  let isWeekend = todayDay === 6 || todayDay ===0 ? true: false
  let first = moment(moment(todayStr).format('YYYY-MM-01'));
  let last = moment(moment(todayStr).add(1,'M').format('YYYY-MM-01')).subtract(1,'d');
  let monthStr = today.format('YYYY-MM');
  const firstStr = first.format(dateFormat);
  const lastStr = last.format(dateFormat);
  const firstNum = first.date();
  const lastNum = last.date();
  return {
    today,
    todayDate,
    todayDateStr,
    todayDay,
    isToday,
    isWeekend,
    todayStr,
    first,
    last,
    firstNum,
    lastNum,
    firstStr,
    lastStr,
    monthStr
  }
}
//
// export default {
//   today: moment(),
//   firstDate:moment(moment().format('YYYY-MM-01')),
//   lastDate:moment(moment().add(1,'M').format('YYYY-MM-01')).subtract(1,'d'),
//   firstDateNum :this.firstDate.date(),
//   lastDateNum : lastDate.date()
// }
