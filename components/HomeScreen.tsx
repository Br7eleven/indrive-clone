import React, { useState, useEffect, useRef } from 'react';
import type { RideDetails, Screen } from '../types';
import { AppScreen } from '../types';
import { InDriveLogoIcon, BellIcon, UserIcon, LocationPinIcon, SearchIcon } from './icons/Icons';
import { GoogleGenAI, Type } from "@google/genai";

interface HomeScreenProps {
  onFindDriver: (details: RideDetails) => void;
  onNavigate: (screen: Screen) => void;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const HomeScreen: React.FC<HomeScreenProps> = ({ onFindDriver, onNavigate }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<string[]>([]);
  const [activeInput, setActiveInput] = useState<'pickup' | 'dropoff' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const actionSheetRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    if (pickup && dropoff) {
      onFindDriver({ pickup, dropoff });
    }
  };

  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setPickupSuggestions([]);
      setDropoffSuggestions([]);
      return;
    }
    setIsLoading(true);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on this partial address, suggest 5 likely full addresses in a major US city: "${query}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        suggestions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                                description: 'A potential full address suggestion.'
                            }
                        }
                    }
                }
            }
        });
        
        const jsonResponse = JSON.parse(response.text);
        const suggestions = jsonResponse.suggestions || [];
        
        if (activeInput === 'pickup') {
            setPickupSuggestions(suggestions);
        } else if (activeInput === 'dropoff') {
            setDropoffSuggestions(suggestions);
        }
    } catch (error) {
        console.error("Error fetching address suggestions:", error);
        setPickupSuggestions([]);
        setDropoffSuggestions([]);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
    }
    const query = activeInput === 'pickup' ? pickup : dropoff;
    if (query && activeInput) {
        debounceTimer.current = setTimeout(() => {
            fetchSuggestions(query);
        }, 500);
    } else {
        setPickupSuggestions([]);
        setDropoffSuggestions([]);
    }
    return () => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
    }
  }, [pickup, dropoff, activeInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (actionSheetRef.current && !actionSheetRef.current.contains(event.target as Node)) {
            setActiveInput(null);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
      if(activeInput === 'pickup') {
          setPickup(suggestion);
          setPickupSuggestions([]);
      } else if (activeInput === 'dropoff') {
          setDropoff(suggestion);
          setDropoffSuggestions([]);
      }
      setActiveInput(null);
  }

  const mapImageUrl = "https://images.unsplash.com/photo-1594140995479-808381ac68a9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const suggestions = activeInput === 'pickup' ? pickupSuggestions : dropoffSuggestions;

  return (
    <div 
      className="relative h-full w-full bg-gray-900 text-white bg-cover"
      style={{ 
          backgroundImage: `url(${mapImageUrl})`,
          backgroundPosition: '50% 50%',
          animation: 'subtle-pan 40s infinite ease-in-out'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-center p-4 pt-6 h-20 shrink-0 bg-transparent">
            <div className="flex items-center space-x-2 p-2 rounded-full bg-black/30 backdrop-blur-sm shadow-lg">
                <InDriveLogoIcon className="h-9 w-9" />
                <span className="text-xl font-bold tracking-tight text-white">inDrive</span>
            </div>
            <div className="flex items-center space-x-2">
                <button onClick={() => onNavigate(AppScreen.Activity)} className="p-2 rounded-full bg-black/30 backdrop-blur-sm shadow-lg hover:bg-gray-700/50 transition-colors">
                    <BellIcon className="w-6 h-6 text-gray-200"/>
                </button>
                <button onClick={() => onNavigate(AppScreen.Profile)} className="p-2 rounded-full bg-black/30 backdrop-blur-sm shadow-lg hover:bg-gray-700/50 transition-colors">
                    <UserIcon className="w-6 h-6 text-gray-200"/>
                </button>
            </div>
        </div>

        <div className="flex-grow"></div>

        <div ref={actionSheetRef} className="bg-gray-800/80 backdrop-blur-md pt-1 relative">
            <div className="p-6 pt-5 space-y-4">
              <div className="relative">
                <LocationPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onFocus={() => setActiveInput('pickup')}
                  placeholder="Pickup location"
                  className="w-full bg-gray-700/80 border-2 border-gray-600/80 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-white placeholder-gray-400"
                  autoComplete="off"
                />
              </div>
              <div className="relative">
                <LocationPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                <input
                  type="text"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  onFocus={() => setActiveInput('dropoff')}
                  placeholder="Destination"
                  className="w-full bg-gray-700/80 border-2 border-gray-600/80 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-white placeholder-gray-400"
                  autoComplete="off"
                />
              </div>
               {activeInput && suggestions.length > 0 && (
                <div className="absolute bottom-full left-6 right-6 mb-2 bg-gray-700/90 backdrop-blur-md border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    <ul>
                    {suggestions.map((s, i) => (
                        <li key={i} onClick={() => handleSuggestionClick(s)} className="p-3 cursor-pointer hover:bg-green-500/50 transition-colors text-sm border-b border-gray-600 last:border-b-0">
                            {s}
                        </li>
                    ))}
                    </ul>
                </div>
              )}
              {isLoading && <div className="absolute bottom-full right-8 mb-4 text-xs text-gray-400">Loading...</div>}
              <button
                onClick={handleSearch}
                disabled={!pickup || !dropoff}
                className="w-full bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out hover:bg-green-600 active:scale-95 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                <SearchIcon className="w-6 h-6" />
                <span>Find a driver</span>
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;