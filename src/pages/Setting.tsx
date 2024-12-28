import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Setting() {
  const { t } = useTranslation();

  return <div>{t('setting')}</div>;
}
