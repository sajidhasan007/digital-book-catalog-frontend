import Footer from '@/layouts/Footer';
import noImage from '@/assets/images/noImage.png';
import { ReviewCard } from '@/components/ReviewCard';
import { Button, Spin } from 'antd';
import { WriteReview } from '@/components/WriteReviewModal';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetBookReviewQuery,
  useSingleBookQuery,
} from '@/redux/features/books/bookApi';

export default function BookDetails() {
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const { id } = useParams();
  const reviewToggleFilterModal = () => {
    setIsReviewModalVisible(!isReviewModalVisible);
  };
  // const book = {
  //   _id: 'dslfhgsdklfgjhdk',
  //   title: 'The art of thinking clearly',
  //   author: 'rolef doblli',
  //   genre: 'Motivation',
  //   publicationDate: '1955-04-10',
  // };

  const { data: book, isLoading } = useSingleBookQuery(id);
  const { data: review, isLoading: isReviewLoading } =
    useGetBookReviewQuery(id);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="content-container">
        <h1 className="text-2xl font-black text-primary my-4">Book Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
          <div>
            <div className="h-[400px] w-full overflow-hidden">
              <img
                className="object-cover h-full w-full"
                src={noImage}
                alt="book"
              />
            </div>
          </div>
          <div>
            <div className="">
              <div className="mt-4">
                <h1 className="text-xl font-semibold">{book?.data?.title}</h1>

                <div className="text-base mt-10 flex flex-col gap-10 ">
                  <p>Author: {book?.data?.author}</p>
                  <hr />
                  <p>Genre: {book?.data?.genre}</p>
                  <hr />
                  <p>Publiction Date: {book?.data?.publicationDate}</p>
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
      </div>
      <Footer />
    </>
  );
}
