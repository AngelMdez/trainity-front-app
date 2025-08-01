import { CreateUserInput } from './types';

export function isValidUser(input: CreateUserInput): boolean {
  return !!input.email && input.email.includes('@');
}
