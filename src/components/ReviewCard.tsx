import { IBook } from '@/types/globalTypes';
import { Avatar, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface IProps {
  review: any;
}

export const ReviewCard = ({ review }: IProps) => {
  return (
    <div className="flex my-4 bg-gray-600  p-5 rounded-md text-white">
      <div>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
      <div className="ml-5">
        <h2 className="tex-lg font-bold mb-2">{review?.user?.name}</h2>
        <Rate disabled value={review?.review} className="mb-2" />
        <p>{review?.comment}</p>
      </div>
    </div>
  );
};
