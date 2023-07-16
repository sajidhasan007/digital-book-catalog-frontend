import Footer from '@/layouts/Footer';
import { BookCard } from '@/components/BookCard';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import { Spin } from 'antd';
import { genreOptions, IBook } from '@/types/globalTypes';
import { useForm } from 'react-hook-form';
import { SearchControl, Select } from '@/components/controls';
import { useEffect } from 'react';

export default function Allbooks() {
  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      genre: null,
      search: '',
    },
  });
  const genre = watch('genre');
  const search = watch('search');
  const { data, isLoading, error } = useGetBooksQuery({
    searchTerm: search,
    genre: genre,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log(search);
    console.log(genre);
  }, [genre, search]);

  return (
    <>
      <div className="content-container">
        <div className="mt-6 flex flex-col md:flex-row justify-between gap-6">
          <SearchControl
            name="search"
            control={control}
            placeholder="Select your Genre"
          />
          <Select
            name="genre"
            control={control}
            placeholder="Select your Genre"
            options={genreOptions}
          />
        </div>
        <div className="mb-32 mt-10">
          <h1 className="text-2xl font-black text-primary mb-4">All Books</h1>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.data.map((book: IBook) => (
              <BookCard key={book?._id} book={book} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
