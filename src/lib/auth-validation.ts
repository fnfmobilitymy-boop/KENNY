import type { AuthMode, AuthValues, AuthErrors } from "../types/auth";
export function validateAuth(mode: AuthMode, values: AuthValues): AuthErrors {
  const errors: AuthErrors = {};
  if (
    !values.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  )
    errors.email = "Enter a valid email address.";
  if (values.email.length > 254)
    errors.email = "Use an email address with no more than 254 characters.";
  if (mode === "login" && !values.password)
    errors.password = "Enter your password.";
  if (mode === "signup") {
    if (values.name.trim().length < 2 || values.name.trim().length > 80)
      errors.name = "Enter your name using 2–80 characters.";
    if (
      values.password.length < 12 ||
      !/[A-Z]/.test(values.password) ||
      !/[a-z]/.test(values.password) ||
      !/[0-9]/.test(values.password)
    )
      errors.password =
        "Use at least 12 characters, including an uppercase letter, a lowercase letter and a number.";
    if (values.password !== values.confirmPassword || !values.confirmPassword)
      errors.confirmPassword = "Passwords must match.";
    if (!values.acknowledged)
      errors.acknowledged =
        "Acknowledge the demo and placeholder legal pages to continue.";
  }
  return errors;
}
