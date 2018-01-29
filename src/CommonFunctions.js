import React from 'react';
import MenuItem from 'material-ui/MenuItem';

export function calculateHours(day, breakAfter, breakTime) {

  breakTime = breakTime/60;

  const numberOfHours = getNumberOfHoursForADay(day);
  const hoursAfterUpgrade = 2;

  let numberOfHours100 = 0, numberOfHours125 = 0, numberOfHours150 = 0;

  if (numberOfHours < breakAfter) { // numberOfHours < 8
    numberOfHours100 = numberOfHours;
  }
  if (numberOfHours === breakAfter) { // numberOfHours = 8
    numberOfHours100 = breakAfter - breakTime;
  }
  if (numberOfHours > breakAfter && numberOfHours < (breakAfter + hoursAfterUpgrade)) { // 8 <= numberOfHours < 10
    numberOfHours100 = breakAfter - breakTime;
    numberOfHours125 = hoursAfterUpgrade - (numberOfHours - numberOfHours100);
  }
  if (numberOfHours === (breakAfter + hoursAfterUpgrade)) { // numberOfHours = 10
    numberOfHours100 = breakAfter - breakTime;
    numberOfHours125 = hoursAfterUpgrade - breakTime;
  }
  if (numberOfHours > (breakAfter + hoursAfterUpgrade)) { // numberOfHours >= 10
    numberOfHours100 = breakAfter - breakTime;
    numberOfHours125 = hoursAfterUpgrade;
    numberOfHours150 = numberOfHours - numberOfHours100 - numberOfHours125;
  }
  return [numberOfHours, numberOfHours100, numberOfHours125, numberOfHours150];
}

function getNumberOfHoursForADay(day) {
  const { enterTime, exitTime } = day;
  return (getTimeInMinutes(exitTime) - getTimeInMinutes(enterTime)) / 60;
}

function getTimeInMinutes(time) {
  const separated = time.split(':');
  const hourInMinutes = parseInt(separated[0], 10) * 60;
  const minutesInMinutes = parseInt(separated[1], 10);
  return hourInMinutes + minutesInMinutes;
}

export function populateOptionsForDayMonth(month) {
  let numOfDaysInMonth = 0;
  if (month === 2)
    numOfDaysInMonth = 28;
  else if (month === 4 || month === 6 || month === 9 || month === 11)
    numOfDaysInMonth = 30;
  else
    numOfDaysInMonth = 31;

  return (
    for (var i = 0; i < numOfDaysInMonth; i++) {
      return <MenuItem key={i} value={i+1} primaryText={i+1} />;
    }
  );

  // const array = new Array(numOfDaysInMonth);
  // for (var i = 0; i < array.length; i++) {
  //   array[i] = i;
  // }
  // return (
  //   array.map((i) => {
  //     return <MenuItem key={i} value={i+1} primaryText={i+1} />;
  //   })
  // )
}

export function getDayOfWeek(date) {
  const dayNumber = new Date(date).getDay();
  let dayString = '';
  switch(dayNumber) {
    case 0: dayString = "Sun"; break;
    case 1: dayString = "Mon"; break;
    case 2: dayString = "Tue"; break;
    case 3: dayString = "Wed"; break;
    case 4: dayString = "Thu"; break;
    case 5: dayString = "Fri"; break;
    case 6: dayString = "Sat"; break;
    default: dayString = "Sun"; break;
  }
  return dayString;
}

export function mapOnDays(days, breakAfter, breakTime) {
  let numberOfDays = 0, numberOfHours = 0, numberOfHoursNeto = 0;
  let numberOfHours100 = 0, numberOfHours125 = 0, numberOfHours150 = 0;

  days.map(day => {
    if (day.day !== 0) {
      const arrayOfHours = calculateHours(day, breakAfter, breakTime); // [numberOfHours, numberOfHours100, numberOfHours125, numberOfHours150]
      numberOfDays += 1;
      numberOfHours += arrayOfHours[0];
      numberOfHours100 += arrayOfHours[1];
      numberOfHours125 += arrayOfHours[2];
      numberOfHours150 += arrayOfHours[3];
      numberOfHoursNeto += arrayOfHours[1] + arrayOfHours[2] + arrayOfHours[3];
    }
    return day;
  });
  return [numberOfDays, numberOfHours, numberOfHoursNeto, numberOfHours100, numberOfHours125, numberOfHours150];
}

export function getBruto(arrayOfHours, settingsObject) {
  const { hourly, drives, others } = settingsObject;
  const wage100 = arrayOfHours[3] * hourly;
  const wage125 = arrayOfHours[4] * hourly * 1.25;
  const wage150 = arrayOfHours[5] * hourly * 1.5;
  const drivesIncome = arrayOfHours[0] * drives;
  return wage100 + wage125 + wage150 + drivesIncome + others;
}

export function getTax(bruto) {
  const steps = [5280, 9010, 14000, 20000, 41830];
  const stepsPer = [0.1, 0.14, 0.23, 0.30, 0.33, 0.45];
  let tax = 0, flag = 0;

  if (bruto > steps[0]) {
    tax += steps[0]*stepsPer[0];
    flag += 1;
  }
  if (bruto > steps[1]) {
    tax += (steps[1]-steps[0])*stepsPer[1];
    flag += 1;
  }
  if (bruto > steps[2]) {
    tax += (steps[2]-steps[1])*stepsPer[2];
    flag += 1;
  }
  if (bruto > steps[3]) {
    tax += (steps[3]-steps[2])*stepsPer[3];
    flag += 1;
  }
  if (bruto > steps[4]) {
    tax += (steps[4]-steps[3])*stepsPer[4];
    flag += 1;
  }
  if (flag !== 0) {
    tax += (bruto - steps[flag-1]) * stepsPer[flag];
  }

  return tax;
}

export function getNeto(bruto, tax, pension) {
  const pensionReduction = bruto * pension / 100;
  return bruto - pensionReduction - tax;
}

export function getCorrectTime(day) {
  const { enterTime, enterTime } = day;
  // const enterTimeHour = (day.enterTime.getHours() < 10 ? `0${day.enterTime.getHours()}` : day.enterTime.getHours());
  // const enterTimeMinute = (day.enterTime.getMinutes() < 10 ? `0${day.enterTime.getMinutes()}` : day.enterTime.getMinutes());
  // const exitTimeHour = (day.exitTime.getHours() < 10 ? `0${day.exitTime.getHours()}` : day.exitTime.getHours());
  // const exitTimeMinute = (day.exitTime.getMinutes() < 10 ? `0${day.exitTime.getMinutes()}` : day.exitTime.getMinutes());

  const enterTimeHour = addZeroIfNeeded(enterTime.getHours());
  const enterTimeMinute = addZeroIfNeeded(enterTime.getMinutes());
  const exitTimeHour = addZeroIfNeeded(exitTime.getHours());
  const exitTimeMinute = addZeroIfNeeded(exitTime.getMinutes());

  const fullEnterTime = `${enterTimeHour}:${enterTimeMinute}`;
  const fullExitTime = `${exitTimeHour}:${exitTimeMinute}`;

  return [fullEnterTime, fullExitTime];
}

function addZeroIfNeeded(number) {
  return number < 10 ? `0${number}` : number;
}

export function isValidDayOfMonth(days, newDay) {
  // for(var i=0;i<days.length;i++) {
  //   console.log("current day: " + days[i].day);
  //   console.log("newDay: " + newDay);
  //   if(days[i].day === newDay) {
  //     console.log("trying to return false");
  //     return false;
  //   }
  // }
  // return true;

  let flag = 0;

  days.map(day => {
    console.log("day.day: " + day.day);
    console.log("newDay: " + newDay);
    if(day.day === newDay) {
      console.log("trying to return false");
      flag = 1;
    }
    return day;
  });
  return flag === 1 ? false : true;
}

export function singIn() {

}

export function singUp() {

}
