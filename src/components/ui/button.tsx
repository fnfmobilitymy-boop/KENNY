import type { ComponentPropsWithRef } from "react";
type Props = ComponentPropsWithRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
};
export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={`button button-${variant} ${className}`}
      {...props}
    />
  );
}
