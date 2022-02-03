import React, { useContext, useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

//import { AuthContext } from "../context/auth";

function MenuBar() {
  //getting user from context
  const { user, logout } = useContext(AuthContext);

  //gets the http path from browser url
  const pathname = window.location.pathname;

  //getting the compoment name from url
  const path = pathname === "/" ? "home" : pathname.substring(1);

  //sets active item on menu bar by using component name
  const [activeItem, setActiveItem] = useState(path);

  //click on menubar item, goes to that router link
  const handleItemClick = (e, { name }) => setActiveItem(name);

  //if user logs in / exists
  //show lastname as home, inventory, logout
  //unauthorized surfer show home, login, registration
  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item>
        <Icon name="shopping cart" size="large" color="teal"></Icon>
        <span>Teebay</span>
      </Menu.Item>
      <Menu.Item
        name={user.last_name}
        active={
          activeItem === "home" ||
          activeItem === `${user.last_name}` ||
          activeItem === "/"
        }
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item
        name="inventory"
        active={activeItem === "inventory"}
        onClick={handleItemClick}
        as={Link}
        to="/inventory"
      />

      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} as={Link} to="/" />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item>
        <Icon name="shopping cart" size="large" color="teal"></Icon>
        <span>Teebay</span>
      </Menu.Item>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
