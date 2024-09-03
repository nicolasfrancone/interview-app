import { useState, useEffect } from 'react';
import { fetchProfileData } from '../services/apiService';

const useProfileData = () => {
  const [profileData, setProfileData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  });
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchProfileData();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profileData, isProfileLoading };
};

export default useProfileData;
