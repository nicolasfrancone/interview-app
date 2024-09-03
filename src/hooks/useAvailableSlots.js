import { useState, useEffect } from 'react';
import { fetchAvailableSlots } from '../services/apiService';

const useAvailableSlots = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeZone, setTimeZone] = useState('UTC');
  const [intervalo, setIntervalo] = useState(30);
  const [modalidad, setModalidad] = useState("presencial");
  const [isSlotsLoading, setIsSlotsLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setIsSlotsLoading(true);
        const data = await fetchAvailableSlots();
        if (data.timezone) setTimeZone(data.timezone);
        if (data.intervalo) setIntervalo(data.intervalo);
        if (data.modalidad) setModalidad(data.modalidad);
        if (data.available_slots) setAvailableDates(organizeSlots(data.available_slots));
      } catch (error) {
        console.error('Error fetching available slots:', error);
      } finally {
        setIsSlotsLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const organizeSlots = (slots) => {
    const organized = slots.reduce((acc, slot) => {
      const date = new Date(slot);
      const dateKey = date.toLocaleDateString('en-US', { timeZone });
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone,
      });

      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push({ isoTime: slot, displayTime: formattedTime });
      return acc;
    }, {});

    return Object.keys(organized).map(date => ({
      dia: date,
      horarios: organized[date]
    }));
  };

  return {
    availableDates,
    currentDateIndex,
    setCurrentDateIndex,
    selectedTime,
    setSelectedTime,
    timeZone,
    intervalo,
    modalidad,
    isSlotsLoading,
    organizeSlots,
  };
};

export default useAvailableSlots;
