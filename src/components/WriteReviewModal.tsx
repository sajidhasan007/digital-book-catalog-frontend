import { FC, useEffect, useState } from 'react';
import { Modal, Button, message, Rate } from 'antd';
import { Form, useForm } from 'react-hook-form';

interface IData {
  rate: number;
  comment: string;
}

interface IWriteReview {
  isModalVisible?: boolean;
  toggleModal?: () => void;
  slug: string;
}
export const WriteReview: FC<IWriteReview> = ({
  isModalVisible,
  toggleModal,
  slug,
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

  const onSubmit = async (data: IData) => {
    console.log('data is = ', data);
  };

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
          <h1 className="section-title text-center mb-8">Write a Review</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-base"> Rate this book</p>
              <div className="text-sm">
                <Rate disabled value={4} />
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
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};
