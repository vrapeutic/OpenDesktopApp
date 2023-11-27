import { Flex, HStack } from '@chakra-ui/layout';

import { Frame } from '@renderer/assets/icons/Frame';
import { Refresh } from '@renderer/assets/icons/Refresh';
import Notifications from './Notifications';
import MessageQuestions from './MessageQuestions';
import { useState } from 'react';
import { FullScreen } from '@renderer/assets/icons/FullScreen';

const Icons = (props: any) => {
  const [fullScreen, setFullScreen] = useState(true);

  const fullScreenHandler = () => {
    setFullScreen(!fullScreen);
  };

  return (
    <>
      <Flex pl="91px">
        <HStack cursor="pointer" onClick={fullScreenHandler}>
          {fullScreen ? <Frame /> : <FullScreen />}
        </HStack>
        <HStack pl="22.17px">
          <Refresh />
        </HStack>
        <HStack>
          <MessageQuestions />
        </HStack>
        <Notifications />
      </Flex>
    </>
  );
};

export default Icons;
