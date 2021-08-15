import React from 'react';
import Popup from 'reactjs-popup';
const Modal = (props) => {


    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }


    const handleModal = async () => {
       const name = document.getElementById('name').value;
       const location = document.getElementById('location').value;
       const age = document.getElementById('age').value;
       setCookie("name", name)
       setCookie("location", location)
       setCookie("age", age)
    }


    return (
        <Popup
        trigger={<button className="button complete-btn"> START DE RONDLEIDING</button>}
        modal
        nested       
      >
        {close => (
          <div className="popup-modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            {/* <div className="header">Info</div> */}
            <div className="content">
                <p>DOORHEEN DEZE INTERACTIEVE RONDLEIDING KRIJG JE 
                TWEE ICONEN TER BESCHIKKING. DEZE WERKEN VOLGENS HET "DRAG AND DROP" PRINCIPE.
                </p>
                <div className="popup-iconen">
    
                </div>
            </div>
            <div className="actions">
              <button
                className="complete-btn-small"
                onClick={() => {
                  handleModal();
                  close();
                }}
              >
                OK, BEGREPEN!
              </button>
            </div>
          </div>
        )}
      </Popup>
    )
}

export default Modal