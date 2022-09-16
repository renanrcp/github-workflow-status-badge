import { ChangeEventHandler } from "react";

export type FieldInputProps = {
  fieldName: string;
  displayName: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const FieldInput = ({ fieldName, displayName, onChange }: FieldInputProps) => {
  return (
    <div className="pt-8">
      <label htmlFor={fieldName} className="pr-8">{displayName}</label>
      <input type='text' id={fieldName} name={fieldName} onChange={onChange} />
    </div>
  )
};

export default FieldInput;