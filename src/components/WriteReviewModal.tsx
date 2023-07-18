/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { Modal, Button, message, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { RateControl, TextareaControl } from './controls';
import { useCreateReviewMutation } from '@/redux/features/books/bookApi';
import { LoadingOutlined } from '@ant-design/icons';

interface IData {
  review: number;
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

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: {
      comment: '',
      review: NaN,
    },
  });

  const [createReview, { isSuccess, isLoading }] = useCreateReviewMutation();

  if (isSuccess) {
    successMsg('Review added successfully');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    toggleModal!();
  }

  // if (error?.data) {
  //   errorMsg(error?.data?.message);
  // }
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
        footer={null}
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
