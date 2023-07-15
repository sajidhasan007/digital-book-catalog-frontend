import Footer from '@/layouts/Footer';
import { BookCard } from '@/components/BookCard';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import { Spin } from 'antd';
import { IBook } from '@/types/globalTypes';

export default function Allbooks() {
  const { data, isLoading, error } = useGetBooksQuery(undefined);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <>
      <div className="content-container ">
        <div className="mb-32 mt-10">
          <h1 className="text-2xl font-black text-primary mb-4">All Books</h1>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.data.map((book: IBook) => (
              <BookCard book={book} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
