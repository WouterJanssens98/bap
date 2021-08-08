import { default as React,Fragment, useState } from 'react';
import { NavLink } from "react-router-dom";
import Popup from 'reactjs-popup';

const InfoIcon = (props) => {
  const contentStyle = { width: '30px !important' };

  

  return (
    <Popup
    trigger={hover => (
      <i className={`InfoIcon ${props.className} fas fa-info-circle`}></i>
    )}
    position="right center"
    on={['hover', 'focus']}
    {...{contentStyle}}
    closeOnDocumentClick
  >
    <span>Tekst weergeven</span>
  </Popup>
  )
  ;
};

export default InfoIcon;