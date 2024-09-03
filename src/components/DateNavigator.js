/* eslint-disable react/prop-types */
import React from 'react';

const DateNavigator = ({ currentDayData, currentDateIndex, availableDates, onDateChange, slotsData }) => {
  const { timeZone, modalidad } = slotsData; // Desestructurar slotsData

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: timeZone, // Usa la zona horaria de slotsData
    }).replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <div className="h-100" style={{ overflow: 'hidden auto' }}>
      <div className="p-2 container">
        <div>
          <div className="row justify-content-center d-flex px-1 mb-2">
            <div className="col-12 text-center">
              <strong>Entrevista {modalidad}</strong>
            </div>
          </div>
          <div className="row align-items-center d-flex px-1 mb-2">
            <div className="col-3">
              <button 
                className="btn btn-link text-primary text-size-12"
                disabled={currentDateIndex === 0} 
                onClick={() => onDateChange('prev')}
              >
                &lt; Días anteriores
              </button>
            </div>
            <div className="col-6">
              <p className="text-center m-0">
                {formatDate(currentDayData.dia)}
              </p>
            </div>
            <div className="col-3 d-flex justify-content-end">
              <button 
                className="btn btn-link text-primary text-size-12"
                disabled={currentDateIndex === availableDates.length - 1} 
                onClick={() => onDateChange('next')}
              >
                Siguientes fechas &gt;
              </button>
            </div>
          </div>
          <div className="text-center">
            <span>Elige el día y horario que mejor te acomode</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateNavigator;
