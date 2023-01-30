const lastDayList = [31,28,31,30,31,30,31,31,30,31,30,31];

const getStartDay = (year, month) => {
    let startIndex = 0;

    let basicDay = 365 * (year - 1); // 현재 월 기준 전년까지 기본 일 수
    // 윤년 계산
    let leafDay = Math.floor((year-1)/4) -  Math.floor((year-1)/100) +  Math.floor((year-1)/400);
    // 현재 해 오늘까지의 일 수
    let currentYearDay = 1;

    if(month > 1 && year%4 === 0 && (year%100 !== 0 || year%400 === 0)) {
        lastDayList[1] = 29;
    } else {
        lastDayList[1] = 28;
    }

    for(let i=0;i<(month - 1); i++) {
        currentYearDay += lastDayList[i];
    }
    startIndex = (basicDay + leafDay + currentYearDay)%7;
    return startIndex;
};

const setCalendar = (year, month) => {
    let startDay = getStartDay(year, month);

    let dayList = [];

    let currLast = lastDayList[month-1];
    let prevLast = (month === 1) ? 31 : lastDayList[month - 2];

    let currDay = 1;
    let nextDay = 1;

    for(let i=0;i<6; i++) {
        for(let j=0; j<7; j++) {
            if(i===0 && j < startDay) {
                dayList.push(prevLast + (j - startDay) + 1);
            } else if(currDay <= currLast) {
                dayList.push(currDay);
                currDay++
            } else {
                dayList.push(nextDay);
                nextDay++
            }
        }
    }
    if(nextDay > 7) {
        dayList = dayList.slice(0,-7)
    }

    return dayList;
};

const setFormatTime = (time, unit) => {
    // 분 : 60 | 시 : 60 | 일 : 24
    let unitType = 1;
    switch (unit) {
        case 'm':
            unitType = 60;
            break;
        case 'h':
            unitType = 60*60;
            break;
        case 'd':
            unitType = 60*60*24;
            break;
        default:
            unitType = 1
    }
    return Math.floor(time.getTime()/1000/unitType);
}

export {setCalendar, getStartDay, setFormatTime};