/* eslint-disable react/prop-types */
import React from 'react';

const TimeSlotsList = ({ currentDayData, selectedTime, onTimeClick, onConfirm, slotsData }) => {
  const { timeZone } = slotsData; // Desestructurar timeZone de slotsData

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
    <div className="p-2 container h-100">
      <div className="mt-3 d-flex overflow-auto">
        <div className="col px-1">
          <button className="mb-2 text-capitalize btn btn-primary d-block w-100">
            {formatDate(currentDayData.dia)}
          </button>
          <div className="d-flex flex-column mt-3">
            {currentDayData.horarios.map((slot) => (
              <div key={slot.isoTime} className="d-flex mb-3 position-relative rounded">
                <button
                  className={`btn btn-outline-primary button-time ${selectedTime === slot.isoTime ? 'button-time__active' : ''}`}
                  onClick={() => onTimeClick(slot.isoTime)}
                >
                  {slot.displayTime}
                </button>
                <button
                  className={`btn btn-primary button-confirmation col ${selectedTime === slot.isoTime ? '' : 'd-none'}`}
                  onClick={onConfirm}
                >
                  Seleccionar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotsList;
