/* eslint-disable react/prop-types */
// components/InterviewInfo.js
import React from 'react';
import { formatDate } from '../utils/dateUtils';

const InterviewInfo = ({ modalidad, currentDayData, selectedTime }) => (
  <ul className="list-group mb-4">
    <li className="list-group-item d-flex align-items-center">
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="me-2" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path>
      </svg>
      <span>Entrevista {modalidad}</span>
    </li>
    <li className="list-group-item d-flex align-items-center">
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="me-2" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
        <path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path>
      </svg>
      <span>{formatDate(currentDayData.dia, currentDayData.timeZone)} / {currentDayData.horarios.find(slot => slot.isoTime === selectedTime)?.displayTime}</span>
    </li>
  </ul>
);

export default InterviewInfo;
