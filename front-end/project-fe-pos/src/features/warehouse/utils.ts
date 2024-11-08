import { EnumWarehouseType } from './configs/enum';

export function getWarehouseTypeName(value: EnumWarehouseType): string {
  switch (value) {
    case EnumWarehouseType.PICKUP:
      return 'warehouse:pickup';
    default: //return: 2 || 3
      return 'warehouse:return';
  }
}
