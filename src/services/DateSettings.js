class DateSettings {

  constructor(day) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    this.newDate = new Date(day)
    this.day = this.newDate.toLocaleDateString("EN", { weekday: 'long' })
    this.day_index = this.newDate.getDay()
    this.date = this.newDate.getDate();
    this.month = monthNames[this.newDate.getMonth()];
    this.year = this.newDate.getFullYear();
  }

  getDayIndex(){
    return this.day_index
  }

  getDay(){
    return this.day
  }

  getDate(){
    return this.date
  }

  getMonth(){
    return this.month
  }

  getYear(){
    return this.year
  }

  getMondayDate(){
    var monday = this.newDate;
    if([0,6].includes(this.day_index)){
      //next monday if Saturday-Sunday
      monday.setDate(monday.getDate() + (((1 + 7 - monday.getDay()) % 7) || 7));
    }
    else{
      //previous monday if Monday-Friday
      monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7);
    }
    return monday
  }

  getDayFromIndex(index){
    switch(index) {
      case 1:
        return "Monday";
        break;
      case 2:
        return "Tuesday";
        break;
      case 3:
        return "Wednesday";
        break;
      case 4:
        return "Thursday";
        break;
      case 5:
        return "Friday";
        break;
    }
  }
}

export default DateSettings;
