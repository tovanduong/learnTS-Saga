import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.scss';
const Navigation = () => {
  return (
    <div className="Navigation-container">
      <div className="Navigation">
        <ul className="list">
          <li className={`item `}>
            <NavLink to="/admin/user" className="link-navigation">
              <HomeIcon />
              <span> User</span>
            </NavLink>
          </li>
          <li className={`item `}>
            <NavLink to="/admin/order" className="link-navigation">
              <ChatBubbleOutlineOutlinedIcon />
              <span>Order</span>
            </NavLink>
          </li>
          <li className={`item `}>
            <NavLink to="/admin/product" className="link-navigation">
              <PersonIcon />
              <span>Product</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
