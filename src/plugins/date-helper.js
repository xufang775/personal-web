import moment from 'moment';
import { DateType } from './constant'

const format = {
  datetime:'YYYY-MM-DD hh:mm:ss',
  date:'YYYY-MM-DD',
  month:'YYYY-MM',
  year:'YYYY',
  ymd:'YYYY-MM-DD',
  y:'YYYY',
}

export class DateHelper{
  constructor(currTime){
    this.currTime = currTime ? moment(currTime) : moment();
    // 是否是今天
    // 周的数字: 0 - 6
    this.day = this.currTime.day();
    this.week = this.day;
    this.date = this.currTime.date();
    this.month = this.currTime.month() + 1;
    this.year = this.currTime.year();
    // 当前时间是否是周期
    this.isWeekend = this.week == 6 || this.week == 0 ? true: false;
    //
    // this.month =

    this.isToday = this.currTime.date() == moment().date()
  }
  format(type){
    return type ? this.currTime.format(format[type]) : this.currTime.format(format.date)
  }
  first(type){
    switch (type){
      case DateType.week:
        // return moment(moment(this.currTime.format()).subtract(this.week,'d'));   // 0-6
        // return moment(moment(this.currTime.format()).subtract(this.week-1,'d'));   // 1-7
        return new DateHelper(moment(this.currTime.format()).subtract(this.week-1,'d'));
        break;
      case DateType.month:
        // return moment(moment(this.currTime).format('YYYY-MM-01'));
        return new DateHelper(moment(moment(this.currTime).format('YYYY-MM-01')));
        break;
      case DateType.year:
        // return moment(this.currTime.year()+'-01-01');
        return new DateHelper(moment(this.currTime.year()+'-01-01'));
        break;
      default:
        return new DateHelper(moment(moment(this.currTime).format('YYYY-MM-01')))
        // return  moment(moment(this.currTime).format('YYYY-MM-01'));
        break;
    }
  }

  last(type){
    switch (type){
      case DateType.week:
        // return moment(moment(this.currTime.format()).add(6-this.week,'d'));   // 0-6
        return new DateHelper(moment(moment(this.currTime.format()).add(7-this.week,'d')));   // 1-7
        break;
      case DateType.month:
        // return  new DateHelper(this.currTime.addMonth(1).format('YYYY-MM-01')).addDate(-1);
        return  new DateHelper(moment(moment(this.currTime.format()).add(1,'M').format('YYYY-MM-01')).subtract(1,'d'));
        break;
      case DateType.year:
        return  new DateHelper(moment(this.currTime.year()+'-12-31'));;
        break;
      default:
        return  new DateHelper(moment(moment(this.currTime.format()).add(1,'M').format('YYYY-MM-01')).subtract(1,'d'));
        break;
    }
  }
  addMonth(m){
    let dhDate = this.currTime.add(m,'M');
    return new DateHelper(dhDate);
  }
  addYear(m){
    let dhDate = this.currTime.add(m,'Y');
    return new DateHelper(dhDate);
  }
  addDate(m){
    let dhDate = this.currTime.add(m,'d');
    return new DateHelper(dhDate);
  }
  add(m,type){
    let ret;
    switch (type){
      case DateType.date:
        ret = this.addDate(m);
        break;
      case DateType.month:
        ret = this.addMonth(m);
        break;
      case DateType.year:
        ret = this.addYear(m);
        break;
    }
    return ret;
  }

  // month(type){
  //
  // }
}

export default {
  install(Vue,opetions){

    Vue.prototype.$now = new DateHelper();  // moment().format(datetimeFormat);

    Vue.prototype.$dateHelper = function (currTime) {
      let datetime = currTime ? moment(currTime) : moment();
      return new DateHelper(datetime);
    };
    // 日期格式化
    Vue.prototype.$format = format;

    Vue.prototype.$getDateStr = function (iDate, dateNum) {
      if( iDate instanceof DateHelper){
        let year = iDate.year;
        let month = iDate.month;
        return new DateHelper(`${year}-${month}-${dateNum}`);
      }
    }

      // Vue.mixin({
      //   $new : moment().format(datetimeFormat)
      // })

      // Vue.prototype.$new = function () {
      //   // console.log('23444')
      //   return moment().format(datetimeFormat);
      // }

  }
}
