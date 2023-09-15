import React, { useState } from 'react';
import HomePage from './Pages/HomePage/HomePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ContextBooking } from './context/booking.context';
import OverviewPage from './Pages/OverviewPage/OverviewPage';
import FrontdeskPage from './Pages/FrontdeskPage/FrontdeskPage';
import GuestPage from './Pages/GuestPage/GuestPage';
import RoomPage from './Pages/RoomPage/RoomPage';
import DealPage from './Pages/DealPage/DealPage';
import RatePage from './Pages/RatePage/RatePage';
import AdvancedPage from './Pages/AdvancedPage/AdvancedPage';

function App() {
  const [themeMenu, setThemeMenu] = useState('light');

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      children: [
        {
          path: 'frontdesk',
          element: <FrontdeskPage />,
        },
        {
          path: 'guest',
          element: <GuestPage />,
        },
        {
          path: 'rooms',
          element: <RoomPage />,
        },
        {
          path: 'deal',
          element: <DealPage />,
        },
        {
          path: 'rate',
          element: <RatePage />,
        },
        {
          path: 'advanced',
          element: <AdvancedPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <ContextBooking.Provider value={{ themeMenu, setThemeMenu }}>
        <RouterProvider router={router} />
      </ContextBooking.Provider>
    </>
  );
}

export default App;