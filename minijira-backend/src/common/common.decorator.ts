import { Transform } from 'class-transformer';

export function NormalizeEnumString() {
  return Transform(({ value }: { value: string }) => {
    if (typeof value !== 'string') return value;
    return value.trim().toLowerCase().replace(/-/g, '_');
  });
}
