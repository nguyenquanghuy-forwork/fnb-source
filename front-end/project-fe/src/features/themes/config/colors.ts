import {
  IColors,
  ICriticalColor,
  ICyanColor,
  IDefaultColor,
  IGrayScaleColor,
  IOrangeColor,
  IPinkColor,
  IPrimaryColor,
  ISecondaryColor,
  ISuccessColor,
  ITealColor,
  IWarningColor,
} from '../types';

const primaryColor: IPrimaryColor = {
  FnB200: '#40367D',
  FnB100: '#50429B',
  FnB90: '#5A4BAF',
  FnB80: '#6E5DC8',
  FnB70: '#7461DB',
  FnB60: '#8574E7',
  FnB50: '#9B8CF2',
  FnB40: '#B9AEFA',
  FnB30: '#E1DBFF',
  FnB20: '#F5F2FF',
};

const secondaryColor: ISecondaryColor = {
  Secondary200: '#833E00',
  Secondary100: '#AF5300',
  Secondary90: '#DA6800',
  Secondary80: '#FF7D07',
  Secondary70: '#FF8C24',
  Secondary60: '#FFA350',
  Secondary50: '#FFBA7C',
  Secondary40: '#FFD1A7',
  Secondary30: '#FFE4CC',
  Secondary20: '#FFFAF5',
};

const successColor: ISuccessColor = {
  Success200: '#024C1B',
  Success100: '#036523',
  Success90: '#047E2C',
  Success80: '#059735',
  Success70: '#05A83B',
  Success60: '#06C946',
  Success50: '#1AF864',
  Success40: '#5BFA90',
  Success30: '#9DFCBC',
  Success20: '#DEFEE9',
};

const warningColor: IWarningColor = {
  Warning200: '#A4610E',
  Warning100: '#B4720E',
  Warning90: '#D08B0B',
  Warning80: '#E2A108',
  Warning70: '#F7B801',
  Warning60: '#FEC92E',
  Warning50: '#FED662',
  Warning40: '#FFE18A',
  Warning30: '#FFEBB1',
  Warning20: '#FFF5D8',
};

const criticalColor: ICriticalColor = {
  Critical200: '#580B0B',
  Critical100: '#820014',
  Critical90: '#780F0F',
  Critical80: '#BA1717',
  Critical70: '#DB1B1B',
  Critical60: '#E73737',
  Critical50: '#EB5A5A',
  Critical40: '#f18989',
  Critical30: '#f6b8b8',
  Critical20: '#FCE7E7',
};

const grayScaleColor: IGrayScaleColor = {
  Gray200: '#45434F',
  Gray100: '#585664',
  Gray90: '#6B6879',
  Gray80: '#767387',
  Gray70: '#8B8899',
  Gray60: '#A5A3B0',
  Gray50: '#B8B6C1',
  Gray40: '#CBCAD2',
  Gray30: '#DFDEE3',
  Gray20: '#F2F2F4',
};

const defaultColor: IDefaultColor = {
  Black: '#2F2D39',
  White: '#F9F9FB',
};

// ACCENT COLOURS - design will implement
const cyanColor: ICyanColor = {
  Cyan400: 'string',
  Cyan300: 'string',
  Cyan200: 'string',
  Cyan100: 'string',
  Cyan90: 'string',
  Cyan80: 'string',
  Cyan70: 'string',
  Cyan60: 'string',
  Cyan50: 'string',
  Cyan40: 'string',
  Cyan30: 'string',
  Cyan20: 'string',
  Cyan10: 'string',
};

const tealColor: ITealColor = {
  Teal400: 'string',
  Teal300: 'string',
  Teal200: 'string',
  Teal100: 'string',
  Teal90: 'string',
  Teal80: 'string',
  Teal70: 'string',
  Teal60: 'string',
  Teal50: 'string',
  Teal40: 'string',
  Teal30: 'string',
  Teal20: 'string',
  Teal10: 'string',
};

const orangeColor: IOrangeColor = {
  Orange400: 'string',
  Orange300: 'string',
  Orange200: 'string',
  Orange100: 'string',
  Orange90: 'string',
  Orange80: 'string',
  Orange70: 'string',
  Orange60: 'string',
  Orange50: 'string',
  Orange40: 'string',
  Orange30: 'string',
  Orange20: 'string',
  Orange10: 'string',
};

const pinkColor: IPinkColor = {
  Pink400: 'string',
  Pink300: 'string',
  Pink200: 'string',
  Pink100: 'string',
  Pink90: 'string',
  Pink80: 'string',
  Pink70: 'string',
  Pink60: 'string',
  Pink50: 'string',
  Pink40: 'string',
  Pink30: 'string',
  Pink20: 'string',
  Pink10: 'string',
};

export const colors: IColors = {
  primaryColor,
  secondaryColor,
  successColor,
  warningColor,
  criticalColor,
  grayScaleColor,
  defaultColor,
};
