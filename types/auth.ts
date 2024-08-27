export type CreateUserPayload = {
  email: string;
  username: string;
  password: string;
};

export type SignInPayload = Omit<CreateUserPayload, "username">;
