import React, { useState } from 'react';

import useSocketManager from '../../Context/SocketManagerProvider';
import { MODULE_PACKAGE_KEY, START_APP_MESSAGE } from '@main/constants';
import PlayModule from './PlayModule';
import { ErrorPopup } from './ErrorPopup';
import { useNavigate } from 'react-router-dom';

const ConnectedVR = (props: any) => {
  const navigate = useNavigate();
  const { dispatchPlayModuleMessage, checkIfServiceExists } =
    useSocketManager();
  const [notFound, setNotFound] = useState(false);
  const [openRunningPopup, setOpenRunningPopup] = useState(false);

  const handleSubmit = async () => {
    const { packageName, headsetId, sessionId } = props;
    const existingDevice = await checkIfServiceExists(headsetId);

    if (existingDevice) {
      const socketMessage = {
        sessionId,
        [MODULE_PACKAGE_KEY]: packageName,
      };

      dispatchPlayModuleMessage(START_APP_MESSAGE, socketMessage, {
        headsetId, // TODO this is a temporary placeholder add setting as key-value pairs here
      });
      setOpenRunningPopup(true);
    } else {
      console.log(headsetId);
      console.log(existingDevice);
      setNotFound(true);
    }
  };

  const cancelSession = () => {
    setNotFound(false);
    props.closSelectingAModule();
    props.closeSelectingAHeadset();
    navigate('/');
  };

  const closeErrorModal = () => {
    setNotFound(false);
    props.closSelectingAModule();
  };

  const selectAnotherHeadset = () => {
    setNotFound(false);
    props.closSelectingAModule();
  };

  return notFound ? (
    <ErrorPopup
      isOpen={notFound}
      onClose={closeErrorModal}
      closeSelectingAHeadset={props.closeSelectingAHeadset}
      onCancelSession={cancelSession}
      onSelectAnotherHeadset={selectAnotherHeadset}
      errorMessages={'No headset found'}
    />
  ) : (
    <PlayModule
      handleSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.closSelectingAModule}
      headsetId={props.headsetId}
      openRunningPopup={openRunningPopup}
      setOpenRunningPopup={setOpenRunningPopup}
      closeSelectingAHeadset={props.closeSelectingAHeadset}
      closeSelectingAModule={props.closSelectingAModule}
      closeConnectedVrPopup={props.closeConnectedVrPopup}
    />
  );
};

export default ConnectedVR;
