import { FC } from 'react';
import { Modal, Button, message, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { RateControl, TextareaControl } from './controls';
import { useCreateReviewMutation } from '@/redux/features/books/bookApi';
import { LoadingOutlined } from '@ant-design/icons';

interface IData {
  rate: number;
  comment: string;
}

interface IWriteReview {
  isModalVisible?: boolean;
  toggleModal?: () => void;
  bookId: string | undefined;
}
export const WriteReview: FC<IWriteReview> = ({
  isModalVisible,
  toggleModal,
  bookId,
}) => {
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
      comment: '',
      rate: NaN,
    },
  });

  const [createReview, { data, isSuccess, isLoading }] =
    useCreateReviewMutation();

  if (isSuccess) {
    toggleModal!();
  }

  const onSubmit = (formData: IData) => {
    const data = {
      ...formData,
      book: bookId,
    };
    createReview(data);
  };
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />
  );

  return (
    <>
      {contextHolder}

      <Modal
        open={isModalVisible}
        onOk={toggleModal}
        onCancel={toggleModal}
        className="check-availability"
        width={630}
      >
        <div className="py-16 px-24">
          <h1 className="text-lg font-bold text-center mb-8">Write a Review</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-base"> Rate this book</p>
              <div className="text-sm">
                <RateControl name="review" control={control} />
              </div>
            </div>
            <div className="mb-6 ">
              <p className="text-base mb-2">Write your comment</p>
              <div>
                <TextareaControl name="comment" control={control} />
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
      </Modal>
    </>
  );
};