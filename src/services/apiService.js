export const fetchProfileData = async () => {
  const response = await fetch('https://apli-wi38.onrender.com/api/getSheetData');
  if (!response.ok) {
    throw new Error('Failed to fetch profile data');
  }
  return await response.json();
};

export const fetchAvailableSlots = async () => {
  const response = await fetch('https://apli-wi38.onrender.com/api/getAvailableSlots');
  if (!response.ok) {
    throw new Error('Failed to fetch available slots');
  }
  return await response.json();
};

export const sendInterviewDetails = async (interviewDetails) => {
  console.log('Datos que se enviarán al webhook:', interviewDetails);

  const response = await fetch('https://hook.us1.make.com/xwcrlk3q7t9ys0qprc6nv1h5dy3c1bod', {
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
  const response = await fetch('https://apli-wi38.onrender.com/api/getEventId', {  
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

  const response = await fetch('https://hook.us1.make.com/xwcrlk3q7t9ys0qprc6nv1h5dy3c1bod', {  
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
