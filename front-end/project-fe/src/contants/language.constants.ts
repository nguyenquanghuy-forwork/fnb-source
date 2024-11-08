import React from 'react';
import { VNFlagIcon } from './../assets/icons/VNFlagIcon';
import { UKFlagIcon } from './../assets/icons/UKFlagIcon';

export const languageCode = {
  en: 'en',
  vi: 'vi',
  ko: 'ko',
  ja: 'ja',
  zh: 'zh',
  th: 'th',
  ms: 'ms',
  id: 'id',
};

type FlagIconProps = {
  width?: string;
  height?: string;
  color?: string;
};

interface LanguageItem {
  name: string;
  emoji: string;
  isPublish: boolean;
  isDefault: boolean;
  languageCode: string;
  countryCode: string;
  flag: React.ComponentType<FlagIconProps>; // Specify component type
}

export const listDefaultLanguage: LanguageItem[] = [
  {
    name: 'common:english',
    emoji: 'GB',
    isPublish: false,
    isDefault: true,
    languageCode: 'en',
    countryCode: 'US',
    flag: UKFlagIcon,
  },
  {
    name: 'common:vietnamese',
    emoji: 'VN',
    isPublish: false,
    isDefault: true,
    languageCode: 'vi',
    countryCode: 'VN',
    flag: VNFlagIcon,
  },
];

export const languageCodeLocalStorageKey = 'i18nextLng';
