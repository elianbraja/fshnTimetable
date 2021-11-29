class DateSettings {

  constructor(day) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    var newDate = new Date(day)
    this.day = newDate.toLocaleDateString("EN", { weekday: 'long' })
    this.date = newDate.getDate();
    this.month = monthNames[newDate.getMonth()];
    this.year = newDate.getFullYear();
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
