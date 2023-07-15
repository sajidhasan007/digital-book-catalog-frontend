/** @format */

import {FC} from "react";
import {Controller} from "react-hook-form";
import {Checkbox} from "antd";
interface CheckboxControlProps {
  name: string;
  control: any;
  label: string;
  errors?: any;
  disabled?: boolean;
  className?: string;
  classNameLabel?: string;
}
const CheckbocControllers: FC<CheckboxControlProps> = ({
  name,
  control,
  label = "",
  errors,
  disabled = false,
  className = "",
  classNameLabel = "",
}) => {
  let errMsg = errors?.[name]?.message;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value}}) => (
          <Checkbox
            onChange={onChange}
            checked={value}
            disabled={disabled}
            className={`rounded my-1 ${className}`}
          >
            <span className={`${classNameLabel ? classNameLabel : "text-xs"}`}>
              {label}
            </span>
          </Checkbox>
        )}
      />
      <p className=" text-red-600 text-xs">{errMsg}</p>
    </>
  );
};
export default CheckbocControllers;
