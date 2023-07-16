import Footer from '@/layouts/Footer';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import { AddNewBookForm } from '@/components/AddNewBookForm';
import { Spin } from 'antd';

export default function AddNewBook() {
  const { data, isLoading, isSuccess } = useGetBooksQuery(undefined);

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
          <AddNewBookForm />
        </div>
      </div>

      <Footer />
    </>
  );
}
