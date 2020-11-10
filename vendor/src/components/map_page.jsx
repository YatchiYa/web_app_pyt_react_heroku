
import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBView, MDBMask, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

import 'mdbreact/dist/css/mdb.css';
import '../styles/chat.scss'
import axios from "axios"

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
      mode : 1,
      data : {}
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  async componentDidMount(){
        
    
    axios.get('/daystats')
    .then(res => {
      console.log("dede")
      console.log(res)
      this.setState({
        data : res.data.data
      })
    })
    .catch(err => {
        console.log(err)
    })

    
    fetch('/daystats')
    .then(res => {
      console.log("dede")
      console.log(res)
      this.setState({
        data : res.data.data
      })
    })
    .catch(err => {
        console.log(err)
    })

    fetch('/map_world')
    .then(res => {
        console.log("ok")
    })
    .catch(err => {
        console.log("err")
        console.log(err)
    })

}

  render() {
    return (
      <div>
            <MDBNavbar color="black" fixed="top" dark expand="md">
              <MDBContainer>
                <MDBNavbarBrand href="/">
                  <strong>Covid Simulation</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.onClick} />
                <MDBCollapse isOpen={this.state.collapse} navbar>
                  <MDBNavbarNav left>
                    <MDBNavItem active>
                      <MDBNavLink to="/">Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="/login">Profile</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="/reg">Authentification</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>


          <MDBRow className="rowooo">
            <MDBCol md="5">
              <MDBBtn outline color="secondary" onClick={(e) => {
                e.preventDefault()
                this.setState({
                  mode : 1
                })
              }}>Map</MDBBtn>
            </MDBCol>
            <MDBCol md="5">
              <MDBBtn outline color="primary" onClick={(e) => {
                e.preventDefault()
                this.setState({
                  mode : 2
                })
              }}>Stats</MDBBtn>
            </MDBCol>
          </MDBRow>
            
            {this.state.mode == 1 && 
            <>

                <div className="dddmap">

                <div dangerouslySetInnerHTML={iframe()} />
                </div>

                <div className="dddmap">
                  <h4>this is a map that represent Covid contamination in the world</h4>
                </div>
            </>
            
            }
            
            {this.state.mode == 2 && 
            <>
                    <div className="dddmap">
                      <h4>Covid stats : </h4>
                    </div>
                    <div className="dddmap">
                      <h4>date : {this.state.data.date}</h4>
                    </div>
                    <MDBRow>
                      <MDBCol md="3">
                        <h4 className="dedsss">Global stats Covid</h4>
                        <MDBRow className="wwdd">
                          <div className="ddffdd">
                            <strong>Deaths </strong> <br /> {this.state.data.deaths}
                          </div>

                        </MDBRow>
                        <MDBRow className="wwdd">
                          <div className="ddffddxx">
                            <strong>Confirmed </strong> <br /> {this.state.data.confirmed}
                          </div>

                        </MDBRow>

                      </MDBCol>
                      <MDBCol md="6" style={{display:"flex"}}>
                        <img src={require('../piechart.png')} />
                        <img src={require('../pie.png')} />
                      </MDBCol>
                      <MDBCol md="3">
                        <h4 className="dedsss">Today stats Covid</h4>
                        <MDBRow className="wwdd">
                          <div className="ddffdd">
                            <strong>Deaths </strong> <br /> {this.state.data.newdeaths}
                          </div>

                        </MDBRow>
                        <MDBRow className="wwdd">
                          <div className="ddffddxx">
                            <strong>Confirmed </strong> <br /> {this.state.data.newconfirmed}
                          </div>

                        </MDBRow>

                      </MDBCol>
                    </MDBRow>
                
            </>
            
            }

      </div>
    );
  }
}

export default FullPageIntroWithNonFixedNavbar;



