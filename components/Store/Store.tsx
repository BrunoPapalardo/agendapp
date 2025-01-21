import React from "react";

interface Props {
  id: number;
  name: string;
  address: string;
}

const Store: React.FC<Props> = ({ name, address }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-500">{address}</p>
    </div>
  );
};

export default Store;