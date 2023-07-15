import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import { BookCard } from '@/components/BookCard';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import { IBook } from '@/types/globalTypes';
import { Spin } from 'antd';

export default function Home() {
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
          <h1 className="text-2xl font-black text-primary mb-4">
            Latest Books
          </h1>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.data.map((book: IBook) => (
              <BookCard book={book} />
            ))}
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button className="mt-10" asChild>
              <Link to="/all-books">Brows all products</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
