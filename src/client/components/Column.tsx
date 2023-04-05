import React from 'react';

type Props = {
  column: {
    title: string;
  };
}

const Column: React.FC<Props> = ({ column }) => {
  return (
    <div>{column.title}</div>
  );
}

export default Column;