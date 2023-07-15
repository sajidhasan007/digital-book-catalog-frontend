import { FC } from 'react';
import { Controller } from 'react-hook-form';
import type { RangePickerProps } from 'antd/es/date-picker';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return dayjs() <= current;
};

const disabledForAduldDate: RangePickerProps['disabledDate'] = (current) => {
  return dayjs().add(-18, 'years') < current;
};
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
  onChangeField?: () => void;
}
export const DatePickerControl: FC<DatePickerProps> = ({
  name,
  control,
  errors,
  defaultValue,
  disabled = false,
  placeholder = '2022-01-01',
  format = 'YYYY-MM-DD',
  className = '',
  allowClear = false,
  checkAdult = false,
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
            defaultValue={defaultValue}
            className={`!rounded-xs my-1 w-full ${className}`}
            status={errMsg && 'error'}
            size="large"
            disabled={disabled}
            placeholder={placeholder}
            placement={'bottomLeft'}
            format={'YYYY-MM-DD'}
            onChange={(e) => {
              onChangeField && onChangeField();
              field.onChange(e);
            }}
            disabledDate={checkAdult ? disabledForAduldDate : disabledDate}
          />
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </div>
  );
};

