
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
                    <MDBRow >
                      <MDBCol md="5">
                        <h4 className="dedsss">Global stats Covid</h4>
                        <MDBRow className="wwdd" style={{display:"flex", justifyContent:"center"}}>
                          <div className="ddffdd" style={{padding:"26px 40px"}}>
                            <strong>Deaths </strong> <br /> {this.state.data.deaths}
                          </div>
                          <div className="ddffddxx" style={{padding:"26px 40px"}}>
                            <strong>Confirmed </strong> <br /> {this.state.data.confirmed}
                          </div>

                        </MDBRow>

                        <h4 className="dedsss">Today stats Covid</h4>
                        <MDBRow className="wwdd" style={{display:"flex", justifyContent:"center"}}>
                          <div className="ddffdd" style={{padding:"26px 40px"}}>
                            <strong>Deaths </strong> <br /> {this.state.data.newdeaths}
                          </div>
                          <div className="ddffddxx" style={{padding:"26px 40px"}}>
                            <strong>Confirmed </strong> <br /> {this.state.data.newconfirmed}
                          </div>

                        </MDBRow>

                      </MDBCol>
                      <MDBCol md="7">
                        <img src={require('../piechart.png')} style={{width:"52%"}} />
                        <img src={require('../pie.png')} style={{width:"52%"}} />
                      </MDBCol>
                    </MDBRow>
                
            </>
            
            }

      </div>
    );
  }
}

export default FullPageIntroWithNonFixedNavbar;



