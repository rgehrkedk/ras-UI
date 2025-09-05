import Layout from "./Layout.jsx";

import Home from "./Home";

import Clubs from "./Clubs";

import ClubDetail from "./ClubDetail";

import MyBookings from "./MyBookings";

import BookFacility from "./BookFacility";

import ClubPricing from "./ClubPricing";

import ClubOnboarding from "./ClubOnboarding";

import ClubDashboard from "./ClubDashboard";

import BookingAdmin from "./BookingAdmin";

import ClubContent from "./ClubContent";

import ClubMembers from "./ClubMembers";

import ClubSettings from "./ClubSettings";

import ResetUser from "./ResetUser";

import RasUIDemo from "./RasUIDemo";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Clubs: Clubs,
    
    ClubDetail: ClubDetail,
    
    MyBookings: MyBookings,
    
    BookFacility: BookFacility,
    
    ClubPricing: ClubPricing,
    
    ClubOnboarding: ClubOnboarding,
    
    ClubDashboard: ClubDashboard,
    
    BookingAdmin: BookingAdmin,
    
    ClubContent: ClubContent,
    
    ClubMembers: ClubMembers,
    
    ClubSettings: ClubSettings,
    
    ResetUser: ResetUser,
    
    RasUIDemo: RasUIDemo,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Clubs" element={<Clubs />} />
                
                <Route path="/ClubDetail" element={<ClubDetail />} />
                
                <Route path="/MyBookings" element={<MyBookings />} />
                
                <Route path="/BookFacility" element={<BookFacility />} />
                
                <Route path="/ClubPricing" element={<ClubPricing />} />
                
                <Route path="/ClubOnboarding" element={<ClubOnboarding />} />
                
                <Route path="/ClubDashboard" element={<ClubDashboard />} />
                
                <Route path="/BookingAdmin" element={<BookingAdmin />} />
                
                <Route path="/ClubContent" element={<ClubContent />} />
                
                <Route path="/ClubMembers" element={<ClubMembers />} />
                
                <Route path="/ClubSettings" element={<ClubSettings />} />
                
                <Route path="/ResetUser" element={<ResetUser />} />
                
                <Route path="/RasUIDemo" element={<RasUIDemo />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}