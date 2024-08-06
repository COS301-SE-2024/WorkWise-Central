import { Transform } from 'class-transformer';

export function CapitalizeWords() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
    }
    return value;
  });
}
