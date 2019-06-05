import { useState, useEffect } from 'react';

const useUserStatus = (): boolean => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect((): void => {
    setIsLoggedIn(false);
  }, []);

  return isLoggedIn;
};

export default useUserStatus;
