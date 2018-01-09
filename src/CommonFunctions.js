import React from 'react';
import MenuItem from 'material-ui/MenuItem';

export function calculateHours(day, breakAfter, breakTime) {

  breakTime = breakTime/60;

  // const { enterTime, exitTime } = day;
  //
  // const enterSeparated = enterTime.split(':');
  // const exitSeparated = exitTime.split(':');
  //
  // const enterHourIntInMinutes = parseInt(enterSeparated[0], 10) * 60;
  // const enterMinuteIntInMinutes = parseInt(enterSeparated[1], 10);
  // const exitHourIntInMinutes = parseInt(exitSeparated[0], 10) * 60;
  // const exitMinuteIntInMinutes = parseInt(exitSeparated[1], 10);
  //
  // const enterAsMinutes = enterHourIntInMinutes + enterMinuteIntInMinutes;
  // const exitAsMinutes = exitHourIntInMinutes + exitMinuteIntInMinutes;
  //
  // const numberOfHours = (exitAsMinutes - enterAsMinutes) / 60;

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

  const array = new Array(numOfDaysInMonth);
  for (var i = 0; i < array.length; i++) {
    array[i] = i;
  }
  return (
    array.map((i) => {
      return <MenuItem key={i} value={i+1} primaryText={i+1} />;
    })
  )
}

export function getDayOfWeek(date) {
  // const date = `${day.month}/${day.day}/${day.year}`;

  // const dateString = new Date(date);
  // const dayNumber = dateString.getDay();
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
      // maybe we dont need the parseFloat
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
  let { hourly, drives, others } = settingsObject;
  const wage100 = arrayOfHours[3] * hourly;
  const wage125 = arrayOfHours[4] * hourly * 1.25;
  const wage150 = arrayOfHours[5] * hourly * 1.5;
  drives = arrayOfHours[0] * drives;
  return wage100 + wage125 + wage150 + drives + others;
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

export function getNeto(bruto, tax, settingsObject) {

  const { pension } = settingsObject;
  const pensionReduction = bruto * pension / 100;

  return bruto - pensionReduction - tax;
}
