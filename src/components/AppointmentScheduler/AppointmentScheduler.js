import React, { useState, useEffect, useMemo, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppointmentScheduler.css';
import DateNavigator from '../DateNavigator';
import TimeSlotList from '../TimeSlotsList';
import ConfirmationForm from '../ConfirmationForm/ConfirmationForm';
import { fetchProfileData, fetchAvailableSlots } from './apiService';

const AppointmentScheduler = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [slotsData, setSlotsData] = useState({ timeZone: null, intervalo: 30, modalidad: 'presencial' });
  const [profileData, setProfileData] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);

  useEffect(() => {
    const interviewConfirmed = localStorage.getItem('interviewConfirmed');
    if (interviewConfirmed === 'true') {
      setConfirmed(true);
    }
  }, []);

  const organizeSlots = useCallback(
    (slots) => {
      const organized = slots.reduce((acc, slot) => {
        const date = new Date(slot);
        const dateKey = date.toLocaleDateString('en-US', { timeZone: slotsData.timeZone });
        const formattedTime = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: slotsData.timeZone,
        });

        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push({ isoTime: slot, displayTime: formattedTime });
        return acc;
      }, {});

      return Object.keys(organized).map((date) => ({
        dia: date,
        horarios: organized[date],
      }));
    },
    [slotsData.timeZone]
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const profileData = await fetchProfileData();
        const slotsData = await fetchAvailableSlots();

        setProfileData(profileData);
        setSlotsData({
          timeZone: slotsData.timezone || 'UTC',
          intervalo: slotsData.intervalo || 30,
          modalidad: slotsData.modalidad || 'presencial',
        });

        const organizedSlots = organizeSlots(slotsData.available_slots);
        console.log('Organized Slots:', organizedSlots);

        setAvailableDates(organizedSlots);
        setIsConfigLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [organizeSlots]);

  const handleDateChange = useCallback(
    (direction) => {
      setCurrentDateIndex((prevIndex) =>
        direction === 'prev' ? Math.max(prevIndex - 1, 0) : Math.min(prevIndex + 1, availableDates.length - 1)
      );
      setSelectedTime(null);
    },
    [availableDates.length]
  );

  const handleTimeClick = useCallback((isoTime) => setSelectedTime(isoTime), []);

  const handleConfirm = useCallback(() => setConfirmed(true), []);

  const handleChangeAppointment = useCallback(() => setConfirmed(false), []);

  const currentDayData = useMemo(() => availableDates[currentDateIndex], [availableDates, currentDateIndex]);

  if (isLoading || !isConfigLoaded) return <div>Loading...</div>;

  if (!currentDayData) return <div>No available dates.</div>;

  return (
    <div className="h-100" style={{ overflow: 'hidden auto' }}>
      {!confirmed ? (
        <>
          <DateNavigator
            currentDayData={currentDayData}
            currentDateIndex={currentDateIndex}
            availableDates={availableDates}
            onDateChange={handleDateChange}
            slotsData={slotsData}
          />
          <TimeSlotList
            currentDayData={currentDayData}
            selectedTime={selectedTime}
            onTimeClick={handleTimeClick}
            onConfirm={handleConfirm}
            slotsData={slotsData}
          />
        </>
      ) : (
        <ConfirmationForm
          profileData={profileData}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          currentDayData={currentDayData}
          onConfirm={handleConfirm}
          onChangeAppointment={handleChangeAppointment}
          slotsData={slotsData}
        />
      )}
    </div>
  );
};

export default AppointmentScheduler;
