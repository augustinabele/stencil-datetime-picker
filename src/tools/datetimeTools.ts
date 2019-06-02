import moment from 'moment';

export class datetimeTools {

  private static getStartOfMonth(date: Date): string {
    return moment(date).startOf('month').format('YYYY-MM-DD');
  }

  private static getEndOfMonth(date: Date): string {
    return moment(date).endOf('month').format('YYYY-MM-DD');
  }

  // Get time from moment's s library
  public static getTime(date: Date): string {
    return moment(date).format('h:mm A');
  }

  public static getHours(date: Date): string {
    return moment(date).format('h');
  }

  public static getMinutes(date: Date): string {
    return moment(date).format('mm');
  }

  public static getSection(date: Date): string {
    return moment(date).format('A');
  }

  // Get date from moment's library
  public static getNextMonth(date: Date): Date {
    return moment(date).add(1, "month").startOf('month').toDate()
  }

  public static getPreviousMonth(date: Date): Date {
    return moment(date).subtract(1, "month").startOf('month').toDate()
  }

  public static getDayFromDate(date: string): string {
    return  date ? moment(new Date(date)).format('DD') : "";
  }

  public static getDayOfMonth(date: Date): string[] {
    const daysOfMonth: string[] = [];

    const currentDayOfWeek = moment(date).startOf('month').day();
    for(let i = 1; i < currentDayOfWeek; i++) {
      daysOfMonth.push(null);
    }

    const startOfMonth = this.getStartOfMonth(date);
    const endOfMonth   = this.getEndOfMonth(date);
    const dayCounter = moment(startOfMonth);
    
    for(let i = 1; i <= +this.getDayFromDate(endOfMonth); i++) {
      daysOfMonth.push(dayCounter.toString());
      dayCounter.add(1, "day");
    }

    return  daysOfMonth;
  }

  // utils
  public static dateIsEqual(first: Date, second: Date): boolean {
    const response: boolean =
    moment(first).date() === moment(second).date() &&
    moment(first).month() === moment(second).month() &&
    moment(first).year() === moment(second).year();

    return response;
  }

  public static getMonthNameFromDate(date: Date):string {
    return  moment(date).format('MMMM YYYY');
  }

  public static getShortDate(date: Date): string {
    return  moment(date).format('YYYY-MM-DD');
  }

  public static getFullDate(date: Date, hours: number, minutes: number,
    section: string): string {

    // Check hours
    if (isNaN(Number(hours)) || hours < 1 || hours > 12) {
      return ' wrong !'
    }
    // Check mintues
    if (isNaN(Number(minutes)) || minutes < 0 || minutes > 59) {
      return ' wrong !'
    }
    // Check section
    if (section == 'AM' || section == 'am') {
      section = 'AM';
    } else if (section == 'PM' || section == 'pm') {
      section = 'PM';
    } else {
      return ' wrong !'
    }

    return ' ' + this.getShortDate(date) + ' '
      + hours + ':' + (minutes < 10 ? '0' : '') + minutes
      + ' ' + section;
  }
}
