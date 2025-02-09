// components/CommentCard.tsx
import React from "react";

interface CommentCardProps {
  name: string;
  message: string;
  date: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ name, message, date }) => {
  return (
    <div className="bg-gradient-to-b from-sunsetPeach to-white shadow-lg rounded-lg p-6 mb-6 max-w-md w-full mx-auto">
      <h3 className="text-xl font-semibold text-sunsetOrange">{name}</h3>
      <p className="text-gray-700 mt-2">{message}</p>
      <p className="text-sm text-gray-500 mt-4">{date}</p>
    </div>
  );
};

export default CommentCard;
