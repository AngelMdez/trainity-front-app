export type User = {
  id: number;
  email: string;
  name?: string;
};

export type CreateUserInput = {
  email: string;
  name?: string;
};
