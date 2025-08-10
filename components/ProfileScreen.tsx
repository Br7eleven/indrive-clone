import React from 'react';
import Header from './Header';
import StarRating from './StarRating';
import type { UserProfile } from '../types';
import { CreditCardIcon, QuestionMarkCircleIcon, CogIcon, LogoutIcon, ChevronRightIcon } from './icons/Icons';

interface ProfileScreenProps {
    user: UserProfile;
}

const ProfileOption: React.FC<{ icon: React.ReactNode, label: string, isDestructive?: boolean }> = ({ icon, label, isDestructive }) => (
    <button className={`flex items-center w-full p-4 rounded-lg transition-colors ${isDestructive ? 'bg-red-900/50 hover:bg-red-900/80' : 'bg-gray-700 hover:bg-gray-600'}`}>
        {icon}
        <span className={`flex-grow text-left ${isDestructive ? 'text-red-400' : 'text-white'}`}>{label}</span>
        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
    </button>
)

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user }) => {
    return (
        <div className="flex flex-col h-full bg-gray-800 text-white">
            <Header title="Profile" />
            <div className="p-6 flex flex-col items-center space-y-2 border-b border-gray-700/50">
                <img src={user.avatarUrl} alt="User" className="w-24 h-24 rounded-full border-4 border-gray-600 object-cover" />
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <div className="flex items-center space-x-2">
                    <StarRating rating={user.rating} />
                    <span className="text-sm text-gray-400">{user.rating.toFixed(1)}</span>
                </div>
            </div>
            <div className="p-6 flex-grow space-y-3">
                <ProfileOption icon={<CreditCardIcon className="w-6 h-6 mr-4 text-green-400" />} label="Payment Methods" />
                <ProfileOption icon={<QuestionMarkCircleIcon className="w-6 h-6 mr-4 text-green-400" />} label="Help & Support" />
                <ProfileOption icon={<CogIcon className="w-6 h-6 mr-4 text-green-400" />} label="Settings" />
            </div>
            <div className="p-6">
                 <ProfileOption icon={<LogoutIcon className="w-6 h-6 mr-4 text-red-400" />} label="Log Out" isDestructive />
            </div>
        </div>
    );
};

export default ProfileScreen;