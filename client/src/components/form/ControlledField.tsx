import { Controller } from "react-hook-form";
import Label from "../ui/atomic/Label";
import ErrorLabel from "../ui/atomic/ErrorLabel";

interface TControlledField {
  id?: string;
  className?: string;
  name: string;
  label?: string;
  control: any;
  errors?: any;
  required?: boolean;
  rules?: any;
  Component: any;
  componentProps?: any;
}

export default function ControlledField({
  id,
  className = "",
  name,
  label,
  control,
  errors,
  required,
  rules,
  Component,
  componentProps,
}: TControlledField) {
  const hasError = !!errors?.[name];
  const errorMsg = hasError ? errors[name].message : "";
  return (
    <div
      className={`leading-none ${className}`}
      data-test-id={`${name}-controlled-wrapper`}
    >
      {label && (
        <Label className="mb-1.5 h-5" id={id || name} required={required}>
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <Component
              data-test-id={`${name}-test-field`}
              {...field}
              {...componentProps}
            />
          );
        }}
      />
      {hasError && <ErrorLabel className="mt-1.5">{errorMsg}</ErrorLabel>}
    </div>
  );
}
