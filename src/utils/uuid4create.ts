import { randomUUID } from 'crypto';

export async function uuid4() {
  return randomUUID();
}
