import React, { useState } from 'react'
import home from  "../assets/home.png"
import roles from "../assets/roles.png"
import user from "../assets/user.png"
import active from "../assets/active.png"
import inactiveTab from  "../assets/inactive.png"
import { Link , useLocation } from 'react-router-dom'


const SideBar = () => {
    const [activeTab, setActiveTab] = useState('')
    const location = useLocation();

    const tabs = [
      { id: 'home', label: 'Home', icon: home, href: '/home' },
      { id: 'roles', label: 'Roles', icon: roles, href: '/roles' },
      { id: 'users', label: 'Users', icon: user, href: '/users' },
    ]

    useState(() => {
      const currentPath = location.pathname;
      const currentTab = tabs.find(tab => currentPath.includes(tab.id));
      if (currentTab) setActiveTab(currentTab.id);
    }, [location.pathname]);
  
    return (
      
      <div className="w-64 bg-gray-100 h-full">
      <nav className="mt-5">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.href}
            className={`flex items-center justify-between px-4 py-3 ${
              location.pathname.includes(tab.id) ? 'bg-yellow-200 text-gray-800' : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="flex items-center">
              <img src={tab.icon} className="w-5 h-5 mr-3" alt={tab.label} />
              <span className="text-sm font-medium">{tab.label}</span>
            </div>
            <div className="w-4 h-4">
              {activeTab === tab.id ? (
                <img src={active} alt="active" />
              ) : (
                <img src={inactiveTab} alt="inactive" />
              )}
            </div>
          </Link>
        ))}
      </nav>
    </div>
    )
}

export default SideBar