// UserProvider.js
import PropTypes from 'prop-types';
import React from 'react';
import { useLocales } from 'src/locales';
import { EnumContext } from './EnumContext';

const EnumProvider = ({ children }) => {

  const { t } = useLocales();

  const BANNER_TYPES = [
    {
      name: t('home'),
      value: 0,
    },
    {
      name: t('tvSeriesDetail'),
      value: 1,
    },
    {
      name: t('inTheaters'),
      value: 2,
    },
    {
      name:  t('nextProgram'),
      value: 3,
    },
  ];

  const CONTENT_TYPES = [
    {
      name: t('confidentialityAgreement'),
      value: 0,
    },
    {
      name: t('cookiePolicy'),
      value: 1,
    },
    {
      name: t('aboutUs'),
      value: 2,
    },
  ];

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <EnumContext.Provider value={{ BANNER_TYPES, CONTENT_TYPES }}>{children}</EnumContext.Provider>
  );
};

export default EnumProvider;

EnumProvider.propTypes = {
  children: PropTypes.node,
};
