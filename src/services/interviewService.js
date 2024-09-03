// services/interviewService.js
import { sendInterviewDetails, fetchEventId, sendCancelInterview } from '../services/apiService';
import { formatToISO } from '../utils/dateUtils';

export const confirmInterview = async (profileData, selectedSlot, timeZone, intervalo, onConfirm, setConfirmed) => {

  const startDateTime = new Date(selectedSlot.isoTime);
  const endDateTime = new Date(startDateTime.getTime() + intervalo * 60000);

  const interviewDetails = {
    ...profileData,
    interview_datetime: selectedSlot.isoTime,
    interview_end_datetime: formatToISO(endDateTime),
    timezone: timeZone,
  };

  try {
    await sendInterviewDetails(interviewDetails);
    setConfirmed(true);
    onConfirm();
  } catch (error) {
    console.error('Error sending interview details:', error);
  }
};

export const cancelInterview = async (eventId, setEventId, setCanceled) => {
  try {

    const fetchedEventId = eventId || await fetchEventId();
    if (!eventId) setEventId(fetchedEventId);
    await sendCancelInterview(fetchedEventId);
    setCanceled(true);

  } catch (error) {
    console.error('Error cancelling interview:', error);
  }
};
