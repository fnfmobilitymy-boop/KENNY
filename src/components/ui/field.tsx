import type { InputHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
};
export function Field({
  id,
  label,
  hint,
  error,
  "aria-describedby": describedBy,
  ...props
}: Props) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [
            hint ? `${id}-hint` : null,
            error ? `${id}-error` : null,
            describedBy,
          ]
            .filter(Boolean)
            .join(" ") || undefined
        }
        {...props}
      />
      {hint && <small id={`${id}-hint`}>{hint}</small>}
      {error && (
        <small className="field-error" id={`${id}-error`}>
          {error}
        </small>
      )}
    </div>
  );
}
