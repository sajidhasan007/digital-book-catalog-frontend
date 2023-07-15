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
        <h2 className="tex-lg font-bold">User name</h2>
        <Rate disabled value={4} />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          animi quidem nesciunt aut ipsa eum vero exercitationem possimus amet
          iusto fuga iure consequuntur sint veritatis eius, porro perferendis
          facere sunt numquam optio quas veniam autem? Esse, id laborum est
          nobis aperiam magnam odit cum! Quisquam reiciendis nulla nam ducimus
          sapiente!
        </p>
      </div>
    </div>
  );
};
