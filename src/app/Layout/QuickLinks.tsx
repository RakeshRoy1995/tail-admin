import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function QuickLinks() {
  const location = useLocation();
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const routeGroups = [
    {
      id: 1,
      title: "/phase-overview",
    },
    {
      id: 2,
      title: "/block-overview",
    },
    {
      id: 3,
      title: "/phase-output",
    },
    {
      id: 4,
      title: "/block-output",
    },
    {
      id: 5,
      title: "/ai-model-mgmt",
    },
    {
      id: 6,
      title: "/guide-prompts",
    },
    {
        id: 7,
        title: "/admin",
    },

  ];
  const routes = [
    {
      id: 1,
      icon: "asset/assets/img/left-bar-icon1.png",
      title: "Add to Knowledgebase",
      routeGroupsId: [ 2, 3, 4, 5, 6 , 7],
    },
    {
      id: 2,
      icon: "asset/assets/img/left-bar-icon2.png",
      title: "Add new case",
      routeGroupsId: [ 2, 3, 4, 5, 6 , 7],
    },
    {
      id: 3,
      icon: "asset/assets/img/left-bar-icon3.png",
      title: "Modify existing case",
      routeGroupsId: [ 2, 3, 4, 5, 6 , 7],
    },
    {
      id: 4,
      icon: "asset/assets/img/left-bar-icon4.png",
      title: "Modify prompt",
      routeGroupsId: [ 2, 3, 4, 5, 6 , 7],
    },
    {
      id: 5,
      icon: "asset/assets/img/left-bar-icon5.png",
      title: "Archive phase output",
      routeGroupsId: [ 2, 3, 4, 5, 6 , 7],
    },
    {
      id: 6,
      icon: "asset/assets/img/left-bar-icon6.png",
      title: "Archive block Output",
      routeGroupsId: [ 2, 3, 4, 5, 6 , 7],
    },
    {
      id: 7,
      icon: "asset/assets/img/left-bar-icon7.png",
      title: "Disconnect phase",
      routeGroupsId: [ 2, 3, 4, 5, 6 , 7],
    },
    {
      id: 8,
      icon: "asset/assets/img/left-bar-icon8.png",
      title: "Disconnect blocks",
      routeGroupsId: [ 2, 3, 4, 5, 6 , 7],
    },
    {
      id: 9,
      icon: "asset/assets/img/left-bar-icon9.png",
      title: "Logs",
      routeGroupsId: [ 2, 3, 4, 5, 6 , 7],
    },

    {
        id: 9,
        icon: "asset/assets/img/left-bar-icon9.png",
        title: "Back To Workspace",
        routeGroupsId: [1],
        route: "/admin",
    },

    {
        id: 10,
        icon: "asset/assets/img/left-bar-icon8.png",
        title: "Disconnect Phase for spacific project",
        routeGroupsId: [1],
    },
  ];

  useEffect(() => {
    // Trigger on every route change
    const handleRouteChange = () => {
      const pathname = window.location.pathname;
      const currentRouteGroup = routeGroups.find(
        (group) => group.title.includes(pathname) ,
      );
      console.log(`pathname`, pathname , routeGroups , currentRouteGroup );
      const currentRouteGroupId = currentRouteGroup?.id;
      const updatedFilteredRoutes = routes.filter((route) =>
        route.routeGroupsId.includes(currentRouteGroupId!),
      );
      setFilteredRoutes(updatedFilteredRoutes);
    };
    handleRouteChange();
  }, [location]);
  
  console.log(`filteredRoutes`, location);


  return (
    <div className="col-lg-3 col-md-3">
      <div className="left-sidebar-menu">
        <h3>QUICK ACTIONS</h3>
        <div className="menu-bar">
          <ul>
            {filteredRoutes.map((item) => (
              <li key={item.id}>
                <Link to={item.route ? item.route : item.title.toLowerCase().replace(/\s+/g, "-")}>
                  <span className="menu-icon">
                    <img src={item.icon} alt="" />
                  </span>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
