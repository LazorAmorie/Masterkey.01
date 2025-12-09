import { useState, useEffect, useRef } from 'react';

const useDashboardState = () => {
    const [activeTab, setActiveTab] = useState(() => {
        // Initialize from localStorage or default to 'overview'
        const saved = localStorage.getItem('dashboardActiveTab');
        return saved ? saved : 'overview';
    });

    const [sidebarOpen, setSidebarOpen] = useState(() => {
        const saved = localStorage.getItem('dashboardSidebarOpen');
        return saved ? JSON.parse(saved) : true;
    });

    const [lastVisitedTabs, setLastVisitedTabs] = useState(() => {
        const saved = localStorage.getItem('dashboardTabHistory');
        return saved ? JSON.parse(saved) : ['overview'];
    });

    const [pageLoadTime] = useState(new Date());
    const tabHistoryRef = useRef(lastVisitedTabs);

    // Save activeTab to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('dashboardActiveTab', activeTab);
        
        // Update tab history in ref and localStorage
        tabHistoryRef.current = Array.from(new Set([...tabHistoryRef.current, activeTab]));
        localStorage.setItem('dashboardTabHistory', JSON.stringify(tabHistoryRef.current));
        setLastVisitedTabs([...tabHistoryRef.current]);
    }, [activeTab]);

    // Save sidebarOpen to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('dashboardSidebarOpen', JSON.stringify(sidebarOpen));
    }, [sidebarOpen]);

    // Handle page unload (before user leaves)
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem('dashboardLastActiveTab', activeTab);
            localStorage.setItem('dashboardLastVisitTime', new Date().toISOString());
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [activeTab]);

    // Handle page visibility change (tab/window blur)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Page is hidden
                localStorage.setItem('dashboardHiddenAt', new Date().toISOString());
            } else {
                // Page is visible again - restore state
                const hiddenAt = localStorage.getItem('dashboardHiddenAt');
                if (hiddenAt) {
                    localStorage.removeItem('dashboardHiddenAt');
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    // Function to go back to previous tab
    const goBackTab = () => {
        if (lastVisitedTabs.length > 1) {
            const previousTab = lastVisitedTabs[lastVisitedTabs.length - 2];
            setActiveTab(previousTab);
        }
    };

    // Function to restore previous state after page reload
    const restoreLastState = () => {
        const lastTab = localStorage.getItem('dashboardLastActiveTab');
        if (lastTab) {
            setActiveTab(lastTab);
            localStorage.removeItem('dashboardLastActiveTab');
        }
    };

    // Function to clear all dashboard state
    const clearDashboardState = () => {
        localStorage.removeItem('dashboardActiveTab');
        localStorage.removeItem('dashboardSidebarOpen');
        localStorage.removeItem('dashboardTabHistory');
        localStorage.removeItem('dashboardLastActiveTab');
        localStorage.removeItem('dashboardLastVisitTime');
        setActiveTab('overview');
        setSidebarOpen(true);
        setLastVisitedTabs(['overview']);
    };

    // Function to get tab history for debugging/UI
    const getTabHistory = () => lastVisitedTabs;

    // Function to check if dashboard was recently accessed
    const getLastVisitTime = () => {
        const time = localStorage.getItem('dashboardLastVisitTime');
        return time ? new Date(time) : null;
    };

    return {
        activeTab,
        setActiveTab,
        sidebarOpen,
        setSidebarOpen,
        lastVisitedTabs,
        goBackTab,
        restoreLastState,
        clearDashboardState,
        getTabHistory,
        getLastVisitTime,
        pageLoadTime,
    };
};

export default useDashboardState;
