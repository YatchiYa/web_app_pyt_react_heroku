import React, { Component } from "react";
import {MDBBtn } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import axios from 'axios'
import '../index.css';

export class Header extends Component {

  show(){
    axios.post('/map_world')
    .then(res => {
      console.log("ok")
    })
    .catch(err => {
        console.log(err)
    })
  }


  render() {
    return (
      <header id="header">
        <div className="covid_ov">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1 style={{
                      color:" #521919",
                      fontStyle: "italic",
                      fontWeight: "bold"
                  }}>
                    {this.props.data ? this.props.data.title : "Loading"}
                    <span></span>
                  </h1>
                  <h3 style={{color : "white"}}>
                    {this.props.data ? this.props.data.paragraph : "Loading"}
                  </h3>
                  < br />
                  < br />
                  <MDBBtn gradient="aqua" >
                    <a
                      onClick={(e) => {
                        e.preventDefault()
                        this.show()
                      }}
                      className="btn btn-custom btn-lg page-scroll "
                      style={{fontSize: "17px"}}
                    >
                      Learn More
                    </a>{" "}
                  </MDBBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
