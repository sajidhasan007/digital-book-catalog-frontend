import Footer from '@/layouts/Footer';
import noImage from '@/assets/images/noImage.png';
import { ReviewCard } from '@/components/ReviewCard';
import { Button, Modal, Popconfirm, Spin } from 'antd';
import { WriteReview } from '@/components/WriteReviewModal';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useCreateBookMutation,
  useCreateFavoriteListMutation,
  useDleteBookMutation,
  useDleteFavoriteListMutation,
  useGetBookReviewQuery,
  useSingleBookQuery,
} from '@/redux/features/books/bookApi';
import { AddNewBookForm } from '@/components/AddNewBookForm';
import { RiDeleteBinLine } from 'react-icons/ri';
import dayjs from 'dayjs';
import { Navigate } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export default function BookDetails() {
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const { id } = useParams();
  const reviewToggleFilterModal = () => {
    setIsReviewModalVisible(!isReviewModalVisible);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const { data: book, isLoading } = useSingleBookQuery(id);
  const [deleteBook, { isSuccess: deleteSuccess }] = useDleteBookMutation();
  const { data: review } = useGetBookReviewQuery(id);
  const [createFavoriteList] = useCreateFavoriteListMutation();
  const [deleteFavoriteList] = useDleteFavoriteListMutation();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (deleteSuccess) {
    return <Navigate to="/" replace={true} />;
    console.log('success');
  }

  const handleDelete = (id: string | undefined) => {
    deleteBook(id);
  };

  const handleFavouriteList = async () => {
    createFavoriteList({ book: id });
    setIsFavourite(!isFavourite);
  };

  const handleRemoveFavouriteList = async () => {
    const options = {
      id: id,
      data: { book: id },
    };

    console.log('my delete options are = ', options);

    if (id) {
      deleteFavoriteList(id);
      setIsFavourite(!isFavourite);
    } else {
      console.error('Error: ID is undefined.');
    }
  };

  return (
    <>
      <div className="content-container">
        <h1 className="text-2xl font-black text-primary my-4">Book Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
          <div className="relative">
            <div className="h-[400px] w-full overflow-hidden">
              <img
                className="object-cover h-full w-full"
                src={noImage}
                alt="book"
              />
            </div>
            <div className="cursor-pointer">
              {isFavourite ? (
                <div onClick={() => handleRemoveFavouriteList()}>
                  <AiFillHeart className="text-red-600 text-2xl absolute z-50 top-0 " />
                </div>
              ) : (
                <div onClick={() => handleFavouriteList()}>
                  <AiOutlineHeart className="text-red-600 text-2xl absolute z-50 top-0 " />
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="">
              <div className="mt-4">
                <div className="flex flex-col mt-4 md:mt-0 md:flex-row justify-between items-center">
                  <h1 className="text-xl font-semibold">{book?.data?.title}</h1>
                  <div className="flex justify-end items-center gap-2">
                    <Button
                      onClick={() => {
                        toggleModal();
                      }}
                    >
                      Update
                    </Button>
                    <Popconfirm
                      placement="leftTop"
                      title={'Are you sure to delete this book?'}
                      // onConfirm={() => deleteProfile(record.id)}
                      onConfirm={() => handleDelete(id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <div
                        // type="button"
                        className="py-2 px-2 text-sm font-medium text-gray-900 bg-white rounded-l border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                      >
                        <RiDeleteBinLine className="text-red-600 cursor-pointer" />
                      </div>
                    </Popconfirm>
                    {/* <Button
                      onClick={() => {
                        handleDelete();
                      }}
                      className="bg-red-600 text-white"
                    >
                      Delete
                    </Button> */}
                  </div>
                </div>
                <div className="text-base mt-10 flex flex-col gap-10 ">
                  <p>Author: {book?.data?.author}</p>
                  <hr />
                  <p>Genre: {book?.data?.genre}</p>
                  <hr />
                  <p>
                    Publiction Date:
                    {dayjs(book?.data?.publicationDate).format('YYYY-MM-DD')}
                  </p>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black text-primary mb-2">
              Review & Ratting
            </h1>
            <Button
              onClick={() => {
                reviewToggleFilterModal();
              }}
            >
              Write a Review
            </Button>
          </div>
          <div>
            {review?.data.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              review?.data?.map((review: any) => <ReviewCard review={review} />)
            ) : (
              <div className="h-52 flex justify-center items-center">
                <h1 className="text-center text-lg font-semibold text-red-600">
                  No review yet
                </h1>
              </div>
            )}
          </div>
        </div>
        <WriteReview
          isModalVisible={isReviewModalVisible}
          toggleModal={reviewToggleFilterModal}
          bookId={id}
        />
        <Modal
          open={isModalVisible}
          onOk={toggleModal}
          onCancel={toggleModal}
          className="check-availability"
          width={630}
          footer={null}
        >
          <AddNewBookForm
            isUpdate={true}
            bookId={id}
            setIsModalOpen={toggleModal}
          />
        </Modal>
      </div>
      <Footer />
    </>
  );
}
