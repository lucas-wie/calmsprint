// src/Card.tsx
import React, { useRef } from 'react';
import './Styles/Card.css';

interface CardProps {
  index: number;
  text: string;
  status: number;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnter: (index: number) => void;
  handleDragEnd: () => void;
  activeItem: number | null;
  setActiveItem: React.Dispatch<React.SetStateAction<number | null>>;
}

const Card: React.FC<CardProps> = ({
  index,
  text,
  status,
  handleDragStart,
  handleDragEnter,
  handleDragEnd,
  activeItem,
  setActiveItem,
}) => {
  const dragItem = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnterWrapper = () => {
    if (dragItem.current !== null) {
      handleDragEnter(index);
    }
  };

  const handleDragLeave = () => {
    if (dragItem.current !== null) {
      setActiveItem(null);
    }
  };

  return (
    <div
      className={`card ${activeItem === index ? 'active' : ''}`}
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragEnter={handleDragEnterWrapper}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      ref={dragItem}
    >
      <p>{text}</p>
      <span>Status: {status}</span>
    </div>
  );
};

export default Card;
