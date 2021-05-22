import { default as React } from 'react';
import './header.scss';
import { NavLink } from "react-router-dom";
const Header = (props) => {


  return (

    
    <div class="ui vertical menu header-menu">

      <div class="item header-item">
        <a  href="/" class="header-title">De Flandriens</a>
      </div>

      <div class="item header-link">
        <NavLink  activeClassName="activelink" to="/dashboard/overview" class="header-subtitle"> <i class="icon fas fa-tachometer-alt"></i> Overzicht</NavLink>
      </div>
      <div class="item header-link">
        <NavLink  activeClassName="activelink" to="/dashboard/renners" class="header-subtitle">  <i class="icon fas fa-bicycle"></i> Renners</NavLink>
      </div>
      <div class="item header-link">
        <NavLink  activeClassName="activelink" to="/dashboard/ritten" class="header-subtitle"> <i class="icon fas fa-road"></i> Ritten</NavLink>
      </div>
      <div class="item header-link">
        <NavLink  activeClassName="activelink" to="/dashboard/periodes" class="header-subtitle"><i class="icon fas fa-history"></i>Periodes</NavLink>
      </div>
    </div>

  );
};

export default Header;