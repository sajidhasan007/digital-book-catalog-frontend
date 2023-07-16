import { FC } from 'react';
import { Modal, Button, message, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { Input, RateControl, TextareaControl } from './controls';
import { useCreateReviewMutation } from '@/redux/features/books/bookApi';
import { LoadingOutlined } from '@ant-design/icons';

interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

interface IWriteReview {
  isUpdate?: boolean;
}
export const AddNewBookForm: FC<IWriteReview> = ({ isUpdate = false }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const successMsg = (msg: string) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      publicationDate: '',
    },
  });

  const [createReview, { data, isSuccess, error, isLoading }] =
    useCreateReviewMutation();

  if (isSuccess) {
    successMsg('Book added successfully');
    // toggleModal!();
  }

  // if (error?.data) {
  //   errorMsg(error?.data?.message);
  // }
  const onSubmit = (formData: IBook) => {
    const data = {
      ...formData,
      //   book: bookId,
    };
    createReview(data);
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
              <Input name="genre" control={control} placeholder="e.g Drama" />
            </div>
          </div>
          <div className="mb-6 flex flex-col">
            <p className="text-base mb-2">Publication Date</p>
            <div className="text-sm">
              <Input
                name="publicationDate"
                control={control}
                placeholder="e.g 2023-01-01"
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
