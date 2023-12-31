import { IBook } from '@/types/globalTypes';
import noImage from '@/assets/images/noImage.png';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface IProps {
  book: IBook;
  isFavourite?: boolean;
}

export const BookCard = ({ book, isFavourite = false }: IProps) => {
  return (
    <div>
      <Link to={`/book-details/${book._id}`} className="w-full">
        <div className="rounded-2xl h-[400px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
          <div className="relative">
            <div className="h-[200px] w-full overflow-hidden ">
              <img
                className="object-cover h-full w-full"
                src={noImage}
                alt="book"
              />
            </div>
            {isFavourite ? (
              <AiFillHeart className="text-red-600 text-2xl absolute z-50 top-0 " />
            ) : (
              <AiOutlineHeart className="text-red-600 text-2xl absolute z-50 top-0 " />
            )}
          </div>
          <div className="mt-4">
            <h1 className="text-xl font-semibold">{book?.title}</h1>

            <div className="text-base mt-2">
              <p>Author: {book?.author}</p>
              <p>Genre: {book?.genre}</p>
              <p>Publiction Date: {book?.publicationDate}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
