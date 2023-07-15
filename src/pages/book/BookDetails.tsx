import Footer from '@/layouts/Footer';
import noImage from '@/assets/images/noImage.png';
import { ReviewCard } from '@/components/ReviewCard';
import { Button } from 'antd';

export default function BookDetails() {
  const book = {
    _id: 'dslfhgsdklfgjhdk',
    title: 'The art of thinking clearly',
    author: 'rolef doblli',
    genre: 'Motivation',
    publicationDate: '1955-04-10',
  };
  return (
    <>
      <div className="content-container">
        <h1 className="text-4xl font-black text-primary my-2">Book Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20 ">
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
                <h1 className="text-xl font-semibold">{book?.title}</h1>

                <div className="text-base mt-10 flex flex-col gap-10 ">
                  <p>Author: {book?.author}</p>
                  <hr />
                  <p>Genre: {book?.genre}</p>
                  <hr />
                  <p>Publiction Date: {book?.publicationDate}</p>
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
            <Button>Write a Review</Button>
          </div>
          <div>
            <ReviewCard review={{}} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
