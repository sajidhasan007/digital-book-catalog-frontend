import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import { BookCard } from '@/components/BookCard';

export default function Allbooks() {
  return (
    <>
      <div className="content-container ">
        <div className="my-32">
          <h1 className="text-6xl font-black text-primary mb-2">Latest Book</h1>
          <BookCard
            book={{
              _id: 'dslfhgsdklfgjhdk',
              title: 'The art of thinking clearly',
              author: 'rolef doblli',
              genre: 'Motivation',
              publicationDate: '1955-04-10',
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
