import { Button } from '@chakra-ui/button';
import { Grid, Text } from '@chakra-ui/layout';

interface SubscriptionsProps {
  Title: string;
  ButtonText: string;
  onClickFunction: () => void;
}

function HeaderSpaceBetween({ Title, ButtonText , onClickFunction }: SubscriptionsProps) {
  return (
    <>
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '20px',
        }}
      >
        <Text
          padding="12px"
          borderRadius="8px"
          fontFamily="Graphik LCG"
          fontSize="29px"
          fontWeight="500"
          lineHeight="29px"
          letterSpacing="-0.01em"
        >
          {Title}
        </Text>

        <Button
          w="143px"
          h="40px"
          padding="12px"
          bg="#F5B50E"
          borderRadius="8px"
          fontSize="14px"
          fontFamily="Roboto"
          boxShadow="0px 2px 8px rgba(251, 203, 24, 0.24)"
          onClick={onClickFunction}
        >
          {ButtonText}
        </Button>
      </Grid>
    </>
  );
}

export default HeaderSpaceBetween;