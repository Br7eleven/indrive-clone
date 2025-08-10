
import React from 'react';
import { ArrowLeftIcon } from './icons/Icons';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  return (
    <div className="flex items-center p-4 bg-gray-800 border-b border-gray-700 h-16 relative">
      {onBack && (
        <button 
          onClick={onBack} 
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          <ArrowLeftIcon className="w-6 h-6 text-white" />
        </button>
      )}
      <h1 className="text-xl font-bold text-center w-full">
        {title}
      </h1>
    </div>
  );
};

export default Header;
