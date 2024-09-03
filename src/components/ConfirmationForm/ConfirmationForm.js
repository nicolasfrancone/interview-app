/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { confirmInterview, cancelInterview } from '../../services/interviewService';
import InterviewInfo from '../../components/InterviewInfo';

const ConfirmationForm = ({ profileData, selectedTime, setSelectedTime, currentDayData, onConfirm, onChangeAppointment, slotsData }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const [eventId, setEventId] = useState(null);

  const { timeZone, intervalo, modalidad } = slotsData;

  useEffect(() => {
    const storedSelectedTime = localStorage.getItem('selectedTime');
    if (storedSelectedTime) {
      setSelectedTime(storedSelectedTime); // Asegúrate de tener acceso a setSelectedTime
    }

    const interviewConfirmed = localStorage.getItem('interviewConfirmed');
    if (interviewConfirmed === 'true') {
      setConfirmed(true);
    }
  }, [setSelectedTime]);

  const handleConfirm = () => {
    const selectedSlot = currentDayData.horarios.find(slot => slot.isoTime === selectedTime);
    confirmInterview(profileData, selectedSlot, timeZone, intervalo, onConfirm, () => {
      setConfirmed(true);
      localStorage.setItem('interviewConfirmed', 'true');
      localStorage.setItem('selectedTime', selectedTime);
    });
  };

  const handleCancel = () => {
    cancelInterview(eventId, setEventId, () => {
      setCanceled(true);
      localStorage.removeItem('interviewConfirmed');
      localStorage.removeItem('selectedTime'); 
    });
  };
  
  if (canceled) {
    return (
      <div className="p-4 container h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="p-4 bg-light rounded shadow-sm text-center" style={{ maxWidth: '500px' }}>
          <h4 className="text-danger mb-3">Entrevista cancelada</h4>
          <p className="mb-4">La entrevista ha sido cancelada exitosamente.</p>
          <button type="button" className="btn btn-outline-primary re-schedule-interview-button" onClick={onChangeAppointment}>
            Re-agendar entrevista
          </button>
        </div>
      </div>
    );
  }
  

  if (confirmed) {
    return (
      <div className="p-4 container h-100">
        <div className="p-4 container bg-light rounded shadow-sm">
          <h4 className="text-success mb-4">¡Entrevista confirmada!</h4>
          <InterviewInfo modalidad={modalidad} currentDayData={currentDayData} selectedTime={selectedTime} />
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-outline-danger btn-sm cancel-interview-button" onClick={handleCancel}>
              Cancelar entrevista
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 container h-100">
      <form action="#">
        <h5 className="text-center">Confirmar su información de contacto</h5>
        <div className="d-grid mb-3">
          <label className="form-label" htmlFor="firstName">Nombre(s)</label>
          <input name="firstName" id="firstName" className="form-control" value={profileData.nombre} readOnly />
        </div>
        <div className="d-grid mb-3">
          <label className="form-label" htmlFor="lastName">Apellidos</label>
          <input name="lastName" id="lastName" className="form-control" value={profileData.apellido} readOnly />
        </div>
        <div className="d-grid mb-3">
          <label className="form-label" htmlFor="phone">Teléfono</label>
          <input name="phone" type="number" id="phone" className="form-control" value={profileData.telefono} readOnly />
        </div>
        <div className="d-grid mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input name="email" type="email" id="email" className="form-control" value={profileData.email} readOnly />
        </div>
        <div className="mb-3">
          <InterviewInfo modalidad={modalidad} currentDayData={currentDayData} selectedTime={selectedTime} />
          <div className="d-grid gap-2">
            <button type="button" className="btn btn-primary confirm-interview-button" onClick={handleConfirm}>
              Confirmar entrevista
            </button>
          </div>
          <div className="d-flex">
            <button type="button" className="text-center col-12 btn btn-link text-primary change-interview-button" onClick={onChangeAppointment}>
              <u>Cambiar cita</u>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConfirmationForm;
