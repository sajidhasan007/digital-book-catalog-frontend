import { FC } from 'react';
import { Controller } from 'react-hook-form';
import type { RangePickerProps } from 'antd/es/date-picker';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

interface DatePickerProps {
  name: string;
  control: any;
  errors?: any;
  defaultValue?: any;
  disabled?: boolean;
  placeholder?: string;
  format?: string;
  className?: string;
  allowClear?: boolean;
  checkAdult?: boolean;
  showTime?: boolean;
  onChangeField?: () => void;
}
export const DatePickerControl: FC<DatePickerProps> = ({
  name,
  control,
  errors,
  defaultValue,
  disabled = false,
  placeholder = '2022-01-01',
  format = 'YYYY',
  className = '',
  allowClear = false,
  checkAdult = false,
  showTime = false,
  onChangeField,
}) => {
  const errMsg = errors?.[name]?.message;
  return (
    <div className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            allowClear={allowClear}
            {...field}
            id={name}
            // defaultValue={defaultValue}
            picker="year"
            className={`!rounded-xs my-1 w-full ${className}`}
            status={errMsg && 'error'}
            size="large"
            disabled={disabled}
            placeholder={placeholder}
            value={field.value ? dayjs(field.value) : null}
            placement={'bottomLeft'}
            format={'YYYY'}
            onChange={(e) => {
              onChangeField && onChangeField();
              field.onChange(e ? e.toDate() : null);
            }}
            // disabledDate={checkAdult ? disabledForAduldDate : disabledDate}
          />
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </div>
  );
};
