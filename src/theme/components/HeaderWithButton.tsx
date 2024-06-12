import { HStack, Text, Grid, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

interface HeaderWithButtonProps {
  leftText: string;
  rightText: string;
  onButtonClick: () => void;
}

export default function HeaderWithButton({
  leftText,
  rightText,
  onButtonClick,
}: HeaderWithButtonProps) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
      <HStack w="143px" h="40px" ml="24px" mt="55px">
        <ArrowBackIcon onClick={goBack} />
        <Text  fontSize={"29px"}  fontWeight={"500"} whiteSpace={'nowrap'}>{leftText}</Text>
      </HStack>
      <Button
        w="143px"
        h="40px"
        ml="24px"
        mt="55px"
        mr={18}
        padding="12px 24px"
        bg="#4AA6CA"
        borderRadius="8px"
        fontSize="14px"
        fontFamily="Roboto"
        onClick={onButtonClick}
        boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
      >
        {rightText}
      </Button>
    </Grid>
  );
}