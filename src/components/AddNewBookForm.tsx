import { FC, useEffect } from 'react';
import { Button, message, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { DatePicker, Input, Select } from './controls';
import {
  useCreateBookMutation,
  useSingleBookQuery,
  useUpdateBookMutation,
} from '@/redux/features/books/bookApi';
import { LoadingOutlined } from '@ant-design/icons';
import { genreOptions, option } from '@/types/globalTypes';
import { Navigate } from 'react-router-dom';

interface IBook {
  title: string;
  author: string;
  genre: option[] | null;
  publicationDate: Date;
}

interface IWriteReview {
  isUpdate?: boolean;
  bookId?: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setIsModalOpen?: any;
}
export const AddNewBookForm: FC<IWriteReview> = ({
  isUpdate = false,
  bookId,
  setIsModalOpen,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const successMsg = (msg: string) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };

  const {
    control,

    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      genre: null,
      publicationDate: new Date(),
    },
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: bookDetails } = useSingleBookQuery(bookId);

  useEffect(() => {
    if (isUpdate) {
      reset({
        title: bookDetails?.data?.title,
        author: bookDetails?.data?.author,
        genre: bookDetails?.data?.genre,
        publicationDate: new Date(bookDetails?.data?.publicationDate),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Add an empty dependency array

  const [createBook, { isSuccess, isLoading }] = useCreateBookMutation();
  const [updateBook, { isSuccess: updateSuccess }] = useUpdateBookMutation();

  if (isSuccess) {
    successMsg('Book added successfully');
    return <Navigate to="/" replace={true} />;
  }

  if (updateSuccess) {
    successMsg('Book update successfully');
  }

  const onSubmit = (formData: IBook) => {
    // return;

    if (isUpdate) {
      const data = {
        data: { ...formData },
        id: bookId,
      };
      updateBook(data);
      setIsModalOpen();
    } else {
      const data = {
        ...formData,
      };
      createBook(data);
    }
  };
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />
  );

  return (
    <>
      {contextHolder}

      <div
        className={`${
          isUpdate
            ? 'py-16 px-6 w-full mx-auto'
            : 'py-16 px-24 w-full md:w-10/12 lg:w-1/2 mx-auto'
        }`}
      >
        <h1 className="text-lg font-bold text-center mb-8">Add a New Book</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 flex flex-col">
            <p className="text-base mb-2">Title</p>
            <div className="text-sm">
              <Input
                name="title"
                control={control}
                placeholder="e.g Power of Habit"
              />
            </div>
          </div>
          <div className="mb-6 flex flex-col">
            <p className="text-base mb-2">Author</p>
            <div className="text-sm">
              <Input
                name="author"
                control={control}
                placeholder="e.g J.K Rouling"
              />
            </div>
          </div>
          <div className="mb-6 flex flex-col">
            <p className="text-base mb-2">Genre</p>
            <div className="text-sm">
              <Select
                name="genre"
                control={control}
                placeholder="Select your Genre"
                options={genreOptions}
              />
            </div>
          </div>
          <div className="mb-6 flex flex-col">
            <p className="text-base mb-2">Publication Date</p>
            <div className="text-sm">
              {/* <Input
                name="publicationDate"
                control={control}
                placeholder="e.g 2023-01-01"
              /> */}
              <DatePicker
                name="publicationDate"
                control={control}
                placeholder="Select Publication Date"
              />
            </div>
          </div>
          <Button
            disabled={!isDirty || !isValid}
            className="button-secondary w-full"
            htmlType="submit"
          >
            {isLoading ? <Spin indicator={antIcon} /> : 'Submit'}
          </Button>
        </form>
      </div>
    </>
  );
};
