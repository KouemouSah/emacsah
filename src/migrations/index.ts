import * as migration_20260108_140000_add_missing_tables from './20260108_140000_add_missing_tables';

export const migrations = [
  {
    up: migration_20260108_140000_add_missing_tables.up,
    down: migration_20260108_140000_add_missing_tables.down,
    name: '20260108_140000_add_missing_tables'
  },
];
