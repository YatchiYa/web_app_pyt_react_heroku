
import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBView, MDBMask } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

import 'mdbreact/dist/css/mdb.css';
import '../styles/chat.scss'

function iframe() {
    return {
        __html: '<iframe src="./map_v2.html" width="1000" height="500"></iframe>'
    }
}



class FullPageIntroWithNonFixedNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  componentDidMount(){
        
    fetch('/map_world')
    .then(res => {
        console.log("ok")
        console.log(res)
    })
    .catch(err => {
        console.log("err")
        console.log(err)
    })
}

  render() {
    return (
      <div>

          <div className="dddmap">

             <div dangerouslySetInnerHTML={iframe()} />
          </div>
          
          <div className="dddmap">
                <h4>this is a map that represent Covid contamination in the world</h4>
          </div>

      </div>
    );
  }
}

export default FullPageIntroWithNonFixedNavbar;



