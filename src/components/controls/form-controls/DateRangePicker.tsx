import { FC } from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;
interface DateRangePickerProps {
  name: string;
  control: any;
  errors?: any;
  disabled?: boolean;
  placeholder?: string;
  format?: string;
  className?: string;
  defaultPickerValue?: [Dayjs, Dayjs] | undefined | null;
}
export const DateRangePickerControl: FC<DateRangePickerProps> = ({
  name,
  control,
  errors,
  disabled = false,
  format = "YYYY-MM-DD",
  className = "",
  defaultPickerValue,
}) => {
  const errMsg = errors?.[name]?.message;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RangePicker
            allowClear
            {...field}
            id={name}
            className={`!my-1 !w-full  ${className}`}
            status={errMsg && "error"}
            size="large"
            disabled={disabled}
            placement={"bottomRight"}
            value={defaultPickerValue}
            format={format}
          />
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </>
  );
};
