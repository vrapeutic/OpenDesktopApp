import axios from 'axios';
import { config } from '@renderer/config';
import { getMe } from '@renderer/cache';
import { useMutation } from '@tanstack/react-query';

const endSessionApi = async ({
  startSession,
  sessionId,
}: {
  startSession: any;
  sessionId: any;
}) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

  // Format the date string
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  const date1String = startSession;
  const date2String = formattedDate;
  console.log(date1String, date2String);

  // Create Date objects
  const date1: any = new Date(date1String);
  const date2: any = new Date(date2String);

  // Calculate the difference in milliseconds
  const timeDifferenceInMilliseconds = Math.abs(date2 - date1);
  console.log(timeDifferenceInMilliseconds);
  // Convert milliseconds to seconds
  const differenceInMinutes = Math.floor(
    (timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  const token = getMe()?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios.put(
    `${config.apiURL}/api/v1/sessions/${sessionId}/end_session`,
    { vr_duration: differenceInMinutes },
    { headers }
  );
};

const useEndSession = () => {
  return useMutation(endSessionApi);
};

export default useEndSession;
