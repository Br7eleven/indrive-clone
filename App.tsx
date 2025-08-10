import React, { useState, useCallback, useMemo } from 'react';
import type { Screen, RideDetails, Driver, UserProfile } from './types';
import { AppScreen } from './types';
import HomeScreen from './components/HomeScreen';
import RideRequestScreen from './components/RideRequestScreen';
import DriverDetailsModal from './components/DriverDetailsModal';
import TabBar from './components/TabBar';
import ServicesScreen from './components/ServicesScreen';
import ActivityScreen from './components/ActivityScreen';
import ProfileScreen from './components/ProfileScreen';
import RideTrackingScreen from './components/RideTrackingScreen';

const App: React.FC = () => {
    const [screen, setScreen] = useState<Screen>(AppScreen.Home);
    const [rideDetails, setRideDetails] = useState<RideDetails | null>(null);
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [confirmedDriver, setConfirmedDriver] = useState<Driver | null>(null);
    
    const [previousScreen, setPreviousScreen] = useState<Screen | null>(null);
    const [animationKey, setAnimationKey] = useState(0);

    const userProfile: UserProfile = {
      name: 'Jane Doe',
      avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      rating: 4.9,
    };

    const navigateTo = useCallback((newScreen: Screen) => {
        if (newScreen === screen) return;
        setPreviousScreen(screen);
        setScreen(newScreen);
        setAnimationKey(prev => prev + 1);
    }, [screen]);

    const handleFindDriver = (details: RideDetails) => {
        setRideDetails(details);
        navigateTo(AppScreen.RideRequest);
    };

    const handleGoBack = () => {
        if (screen === AppScreen.RideRequest || screen === AppScreen.RideTracking) {
            navigateTo(AppScreen.Home);
        }
    };
    
    const handleSelectDriver = (driver: Driver) => {
        setSelectedDriver(driver);
    };
    
    const handleConfirmRide = (driver: Driver) => {
        setConfirmedDriver(driver);
        setSelectedDriver(null);
        navigateTo(AppScreen.RideTracking);
    };

    const handleCloseModal = () => {
        setSelectedDriver(null);
    };

    const animationClass = useMemo(() => {
        if (previousScreen === null) return 'animate-fade-in';
        
        const rideFlowScreens = [AppScreen.Home, AppScreen.RideRequest, AppScreen.RideTracking];
        const tabScreens: Screen[] = [AppScreen.Home, AppScreen.Services, AppScreen.Activity, AppScreen.Profile];
        
        const getScreenTab = (s: Screen) => s === AppScreen.RideRequest ? AppScreen.Home : s;

        const prevIndexInRideFlow = rideFlowScreens.indexOf(previousScreen);
        const currentIndexInRideFlow = rideFlowScreens.indexOf(screen);

        if (prevIndexInRideFlow !== -1 && currentIndexInRideFlow > prevIndexInRideFlow) {
            return 'animate-slide-in-right'; // Forward in ride flow
        }
        if (prevIndexInRideFlow > currentIndexInRideFlow) {
            return 'animate-slide-in-left'; // Backward in ride flow
        }
        
        const prevTabIndex = tabScreens.indexOf(getScreenTab(previousScreen));
        const currentTabIndex = tabScreens.indexOf(getScreenTab(screen));

        if (prevTabIndex !== -1 && currentTabIndex !== -1) {
             if (prevTabIndex < currentTabIndex) return 'animate-slide-in-right';
             if (prevTabIndex > currentTabIndex) return 'animate-slide-in-left';
        }

        return 'animate-fade-in';
    }, [screen, previousScreen]);


    const renderScreen = () => {
        switch (screen) {
            case AppScreen.Home:
                return <HomeScreen onFindDriver={handleFindDriver} onNavigate={navigateTo} />;
            case AppScreen.RideRequest:
                if (!rideDetails) return <HomeScreen onFindDriver={handleFindDriver} onNavigate={navigateTo} />;
                return (
                    <RideRequestScreen 
                        rideDetails={rideDetails}
                        onSelectDriver={handleSelectDriver}
                        onBack={handleGoBack}
                    />
                );
            case AppScreen.RideTracking:
                 if (!confirmedDriver || !rideDetails) return <HomeScreen onFindDriver={handleFindDriver} onNavigate={navigateTo} />;
                 return (
                    <RideTrackingScreen 
                        driver={confirmedDriver}
                        rideDetails={rideDetails}
                        onCancel={() => navigateTo(AppScreen.Home)}
                    />
                 )
            case AppScreen.Services:
                return <ServicesScreen />;
            case AppScreen.Activity:
                return <ActivityScreen />;
            case AppScreen.Profile:
                return <ProfileScreen user={userProfile} />;
            default:
                return <HomeScreen onFindDriver={handleFindDriver} onNavigate={navigateTo} />;
        }
    };
    
    const screensWithTabBar = [AppScreen.Home, AppScreen.Services, AppScreen.Activity, AppScreen.Profile];

    return (
        <div className="min-h-screen bg-transparent text-white flex justify-center items-center p-4 font-sans">
            <div className="w-full max-w-[390px] h-[844px] max-h-[95vh] bg-gray-900 rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative border-4 border-gray-700/50">
                <div className="flex-grow overflow-y-auto overflow-x-hidden relative">
                    <div key={animationKey} className={animationClass}>
                         {renderScreen()}
                    </div>
                </div>

                {screensWithTabBar.includes(screen) && <TabBar activeScreen={screen} onNavigate={navigateTo} />}

                {selectedDriver && (
                    <DriverDetailsModal 
                        driver={selectedDriver} 
                        onClose={handleCloseModal} 
                        onConfirm={handleConfirmRide}
                    />
                )}
            </div>
            <style>
                {`
                @keyframes slide-in-right {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slide-in-left {
                    from { transform: translateX(-100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                 @keyframes fade-in {
                    from { opacity: 0.6; }
                    to { opacity: 1; }
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.35s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }
                .animate-slide-in-left {
                    animation: slide-in-left 0.35s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }
                .animate-fade-in {
                     animation: fade-in 0.3s ease-in-out forwards;
                }
                `}
            </style>
        </div>
    );
};

export default App;