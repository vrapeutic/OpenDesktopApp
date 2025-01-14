import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { getMe } from '@renderer/cache';

import { END_SESSION_MESSAGE } from '@main/constants';
import { config } from '@renderer/config';
import { useStartSessionContext } from '@renderer/Context/StartSesstionContext';
import axios from 'axios';

import useSocketManager from '@renderer/Context/SocketManagerProvider';
import { useTranslation } from 'react-i18next';
import SelectEvaluation from '../Evaluation';

export default function OpenConnectedBed(props: any) {
  const { dispatchSocketMessage } = useSocketManager();
  const { startSession, sessionId, headsetKey } = useStartSessionContext();
  const toast = useToast();
  const {
    isOpen: isevaluationopen,
    onOpen: onevaluationOpen,
    onClose: onevalutionClose,
  } = useDisclosure();

  const handle = async () => {
    try {
      localStorage.removeItem('sessionID');
      dispatchSocketMessage(
        END_SESSION_MESSAGE,
        { deviceId: headsetKey },
        headsetKey
      );
      await endSissionApi();
      onevaluationOpen();
      // props.onClose();
      // props.onclosemodules();
      // navigate('/');
    } catch (error) {
      console.log(error.response);
      toast({
        title: 'error',
        description: `${error.response.data.error}`,
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
    }
  };
  const token = getMe().token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const endSissionApi = () => {
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

    console.log(formattedDate);

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
    console.log(differenceInMinutes);
    props.closeAllModalsAndToast();

    const api = axios.put(
      `${config.apiURL}/api/v1/sessions/${sessionId}/end_session`,
      { vr_duration: differenceInMinutes },
      { headers }
    );
    return api;
  };
  const handleSelectAnotherModule = () => {
    dispatchSocketMessage(
      END_SESSION_MESSAGE,
      { deviceId: headsetKey },
      headsetKey
    );
    props.onClose();
    props.closeAllModalsAndToast();
    props.onCloseSelectAttentionTypeBed();
    props.onCloseSelectEnvironmentBed();
    props.onCloseSelectAttentionSpan();
    props.onCloseSelectDistractors && props.onCloseSelectDistractors();
  };
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <Modal
          isOpen={props.isOpen}
          onClose={props.onClose}
          closeOnOverlayClick={false}
          closeOnEsc={false}
        >
          <ModalOverlay />
          <ModalContent
            h="400px"
            w="600px"
            bgColor="#FFFFFF"
            borderRadius="10px"
          >
            <ModalHeader textAlign="center" fontSize="1rem">
              {t('connectedVr')} {headsetKey}
            </ModalHeader>

            <ModalBody>
              <Text
                fontFamily="Graphik LCG"
                fontSize="1rem"
                fontWeight="600"
                textAlign="center"
                color="#595959"
              >
                {t('sessionInProgress')}
              </Text>

              <Text
                fontFamily="Graphik LCG"
                fontSize="1rem"
                fontWeight="400"
                textAlign="center"
                color="#A8A8A8"
              >
                {t('pressButtonToEnd')}
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button
                w="214px"
                h="54px"
                bg="#00DEA3"
                borderRadius="12px"
                color="#FFFFFF"
                fontFamily="Graphik LCG"
                fontWeight="700"
                fontSize="18px"
                marginRight="10px"
                onClick={handle}
              >
                {t('endSession')}
              </Button>
              <Button
                w="214px"
                h="54px"
                bg="#00DEA3"
                borderRadius="12px"
                color="#FFFFFF"
                fontFamily="Graphik LCG"
                fontWeight="700"
                fontSize="18px"
                marginLeft="10px"
                onClick={handleSelectAnotherModule}
              >
                {t('playAnotherModule')}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      {onevaluationOpen && (
        <SelectEvaluation
          isOpen={isevaluationopen}
          onClose={onevalutionClose}
          closeopenconnected={props.onClose}
          onclosemodules={props.onclosemodules}
        />
      )}
    </>
  );
}
