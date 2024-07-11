import React, { useEffect, useState } from 'react';

import useSocketManager from '../../Context/SocketManagerProvider';
import { MODULE_PACKAGE_KEY, START_APP_MESSAGE } from '@main/constants';
import PlayModule from './PlayModule';
import { ErrorPopup } from './ErrorPopup';
import { useNavigate } from 'react-router-dom';
import usePopupsHandler from '@renderer/Context/PopupsHandlerContext';

const ConnectedVR = (props: any) => {
  const navigate = useNavigate();

  const { socketError } = useSocketManager();
  const { popupFunctions } = usePopupsHandler();
  const { closeSelectingAHeadset, closeSelectingAModule } = popupFunctions;

  const {
    dispatchSocketMessage,
    checkIfServiceExists,
    checkAppNetWorkConnection,
  } = useSocketManager();

  const [notFound, setNotFound] = useState(false);
  const [errorMEssage, setErrorMEssage] = useState(null);

  const handleSubmit = async () => {
    
const HEADSET_FIELD = 'headset';
    const { packageName, headsetKey, sessionId } = props;
    const existingDevice = await checkIfServiceExists(headsetKey);
    const appIsConnectedToInternet = await checkAppNetWorkConnection(); //TODO: consider move this flow to HOC

    if (appIsConnectedToInternet && existingDevice) {
      const socketMessage = {
        sessionId,
        [MODULE_PACKAGE_KEY]: packageName,
        deviceId: headsetKey,
      };

      dispatchSocketMessage(
        START_APP_MESSAGE,
        socketMessage,
        headsetKey,
        ...[1, 2] // this array for holding settings
      );
      props.setOpenRunningPopup(true);
    } else {
      console.log(headsetKey);
      console.log(existingDevice);
      const errorMessage = !appIsConnectedToInternet
        ? 'You are not connected to the internet'
        : 'No headset found';

      setErrorMEssage(errorMessage);
      setNotFound(true);
    }
  };

  const cancelSession = () => {
    setNotFound(false);
    closeSelectingAModule();
    closeSelectingAHeadset();
    navigate('/');
  };

  const closeErrorModal = () => {
    setNotFound(false);
    closeSelectingAModule();
  };

  const selectAnotherHeadset = () => {
    setNotFound(false);
    closeSelectingAModule();
  };

  if (socketError) {
    return null;
  }

  return notFound ? (
    <ErrorPopup
      isOpen={notFound}
      onClose={closeErrorModal}
      closeSelectingAHeadset={closeSelectingAHeadset}
      onCancelSession={cancelSession}
      onSelectAnotherHeadset={selectAnotherHeadset}
      errorMessages={errorMEssage}
    />
  ) : (
    <PlayModule
      handleSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={closeSelectingAModule}
      headsetKey={props.headsetKey}
      openRunningPopup={props.openRunningPopup}
      setOpenRunningPopup={props.setOpenRunningPopup}
    />
  );
};

export default ConnectedVR;
