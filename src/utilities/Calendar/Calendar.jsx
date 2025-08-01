import React, { useState } from 'react';
import './Calendar.css';
import leftArrowIcon from '../../assets/icons/Microsoft Windows 3 Arrow Left.ico';
import rightArrowIcon from '../../assets/icons/Microsoft Windows 3 Arrow Right.ico';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  
  const currentMonth = months[selectedDate.getMonth()];
  const currentYear = selectedDate.getFullYear();
  const currentDay = selectedDate.getDate();
  const currentDayName = days[selectedDate.getDay()];

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const resetToToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="month-year">
          {currentMonth} {currentYear}
        </div>
      </div>
      
      <div className="calendar-body">
        <img 
          src={leftArrowIcon} 
          alt="Previous Day" 
          className="nav-icon prev-icon" 
          onClick={goToPreviousDay}
        />
        <div className="day-number" onDoubleClick={resetToToday}>
          {currentDay}
        </div>
        <img 
          src={rightArrowIcon} 
          alt="Next Day" 
          className="nav-icon next-icon" 
          onClick={goToNextDay}
        />
      </div>
      
      <div className="calendar-footer">
        <div className="day-name">
          {currentDayName}
        </div>
      </div>
    </div>
  );
};

export default Calendar; 