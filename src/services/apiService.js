/* eslint-disable no-undef */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const WEBHOOK_URL = process.env.REACT_APP_WEBHOOK_URL;

export const fetchProfileData = async () => {
  const response = await fetch(`${API_BASE_URL}/api/getSheetData`);
  if (!response.ok) {
    throw new Error('Failed to fetch profile data');
  }
  return await response.json();
};

export const fetchAvailableSlots = async () => {
  const response = await fetch(`${API_BASE_URL}/api/getAvailableSlots`);
  if (!response.ok) {
    throw new Error('Failed to fetch available slots');
  }
  return await response.json();
};

export const sendInterviewDetails = async (interviewDetails) => {
  console.log('Datos que se enviarán al webhook:', interviewDetails);

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(interviewDetails),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.text();  // El texto de la respuesta puede ser un mensaje o un simple "OK"
};

export const fetchEventId = async () => {
  const response = await fetch(`${API_BASE_URL}/api/getEventId`, {  
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch event ID');
  }

  const data = await response.json();
  return data.event_id;  // Regresa el event_id recibido
};



export const sendCancelInterview = async (eventId) => {
  console.log('Cancelando entrevista con event_id:', eventId);

  const response = await fetch(WEBHOOK_URL, {  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event_id: eventId }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.text();
};
