import React, { useState } from 'react';

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

  const { dispatchSocketMessage, checkIfServiceExists } = useSocketManager();
  const [notFound, setNotFound] = useState(false);
  const [errorMEssage, setErrorMessages] = useState(null);
  const [openRunningPopup, setOpenRunningPopup] = useState(false);

  const handleSubmit = async () => {
    const { packageName, headsetId, sessionId } = props;
    const existingDevice = await checkIfServiceExists(headsetId);

    if (existingDevice) {
      const socketMessage = {
        sessionId,
        [MODULE_PACKAGE_KEY]: packageName,
        deviceId: headsetId,
      };

      dispatchSocketMessage(
        START_APP_MESSAGE,
        socketMessage,
        headsetId,
        ...[1, 2] // this array for holding settings
      );
      socketError
        ? () => {
            setNotFound(true);
            setErrorMessages(socketError);
          }
        : setOpenRunningPopup(true);
    } else {
      console.log(headsetId);
      console.log(existingDevice);
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

  return notFound ? (
    <ErrorPopup
      isOpen={notFound}
      onClose={closeErrorModal}
      closeSelectingAHeadset={closeSelectingAHeadset}
      onCancelSession={cancelSession}
      onSelectAnotherHeadset={selectAnotherHeadset}
      errorMessages={errorMEssage || 'No headset found'}
    />
  ) : (
    <PlayModule
      handleSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={closeSelectingAModule}
      headsetId={props.headsetId}
      openRunningPopup={openRunningPopup}
      setOpenRunningPopup={setOpenRunningPopup}
    />
  );
};

export default ConnectedVR;
