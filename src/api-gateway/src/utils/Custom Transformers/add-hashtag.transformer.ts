import { Transform } from 'class-transformer';

export function AddHashtag() {
  return Transform(({ value }) => {
    if (typeof value === 'string' && !value.startsWith('#')) {
      return `#${value}`;
    }
    return value;
  });
}
