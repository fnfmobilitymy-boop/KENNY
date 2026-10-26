export type AuthMode = "login" | "signup" | "forgot-password";
export interface AuthValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acknowledged: boolean;
  remember: boolean;
}
export type AuthErrors = Partial<Record<keyof AuthValues, string>>;
