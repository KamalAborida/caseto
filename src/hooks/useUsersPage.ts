import { useState, useCallback } from "react";

export const useUsersPage = () => {
  const [isFormOpened, setIsFormOpened] = useState(false);

  const openForm = useCallback(() => {
    setIsFormOpened(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsFormOpened(false);
  }, []);

  return {
    isFormOpened,
    openForm,
    closeForm,
  };
};

