import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export default function Subscriptions() {
  const { t } = useTranslation();

  return (
    <>
      <Text>{t('subscriptions')}</Text>
    </>
  );
}
