import { Component, h, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';
import moment from 'moment';
import { datetimeTools } from '../../tools/datetimeTools';

@Component({
  tag: 'app-datetime',
  styleUrl: 'app-datetime.css',
})
export class DateTimePicker {
  @Event() onDateSelected: EventEmitter<Date>;

  @Prop({
    mutable: true,
    reflectToAttr: true
  }) 
  public selectedDate: Date = new Date();

  @Watch('selectedDate')
    watchHandler(newDate: Date): void {
      this.reloadCalendar(newDate);
    }

  @State() daysInMonth: string [];
  @State() selectedTime: string;


  private currentMonth: Date;
  private currentHours: number = +datetimeTools.getHours(this.selectedDate);
  private currentMinutes: number = +datetimeTools.getMinutes(this.selectedDate);
  private currentSection: string = datetimeTools.getSection(this.selectedDate);

  private reloadCalendar(newDate: Date): void {
    this.currentMonth = moment(newDate).startOf('month').toDate();
    this.daysInMonth = datetimeTools.getDayOfMonth(this.currentMonth);
  }

  private onNextMonthClicked(): void {
    this.currentMonth = datetimeTools.getNextMonth(this.currentMonth);
    this.daysInMonth = datetimeTools.getDayOfMonth(this.currentMonth)
  }

  private onPreviousMonthClicked(): void {
    this.currentMonth = datetimeTools.getPreviousMonth(this.currentMonth);
    this.daysInMonth = datetimeTools.getDayOfMonth(this.currentMonth)
  }

  private onDaySelected(day: any): void {
    if(day) {
      this.selectedDate = moment(new Date(day)).toDate();
      this.onDateSelected.emit(day);
    }
  }

  private onHoursChanged(event: any): void {
    this.currentHours =  event.target.value;
    this.watchHandler(this.selectedDate);
  }

  private onMinutesChanged(event: any): void {
    this.currentMinutes =  event.target.value;
    this.watchHandler(this.selectedDate);
  }

  private onSectionChanged(event: any): void {
    this.currentSection =  event.target.value;
    this.watchHandler(this.selectedDate);
  }

  componentWillLoad() {
    this.watchHandler(this.selectedDate);
  }

  render() {
    return (
      <div class="container">

        <div class="container-month">      
          <ul>
            <li class="prev" onClick={() => {this.onPreviousMonthClicked()}}>
              &#10094;
            </li>
            <li class="next" onClick={() => {this.onNextMonthClicked()}}>
              &#10095;
            </li>
            <li>
              {datetimeTools.getMonthNameFromDate(this.currentMonth)}
            </li>
          </ul>
        </div>

        <ul class="container-week">
          <li>Mo</li>
          <li>Tu</li>
          <li>We</li>
          <li>Th</li>
          <li>Fr</li>
          <li>Sa</li>
          <li>Su</li>
        </ul>

        <ul class="container-days">  
          {this.daysInMonth.map((day) =>
            <li class={(datetimeTools.getDayFromDate(day) ? 'clickable': '')}
                onClick={() => {this.onDaySelected(day)}}>
              <span class={(datetimeTools.dateIsEqual(this.selectedDate, new Date(day)) ? 'active': '')}>
                {datetimeTools.getDayFromDate(day)}
              </span>
            </li>
          )}
        </ul>

        <div class="container-time">
          <div class="hours">
            <input class="input-time" type="number" min="1" max="12" value={this.currentHours}  
                  onInput={(event) => {this.onHoursChanged(event)}}/>
          </div>
          <span class="separator">:</span>
          <div class="minutes">
            <input class="input-time" type="number" min="0" max="59" value={this.currentMinutes} 
                  onInput={(event) => {this.onMinutesChanged(event)}} />
          </div>
          <div class="section">
            <input class="input-time" type="text" value={datetimeTools.getSection(this.selectedDate)}
                  onInput={(event) => {this.onSectionChanged(event)}} />          
          </div>
        </div>
      
        <p>
          The datetime selected is <b>
          {datetimeTools.getFullDate(this.selectedDate, 
                                    this.currentHours,
                                    this.currentMinutes,
                                    this.currentSection)}</b>
        </p>

      </div>
    )
  }
}
