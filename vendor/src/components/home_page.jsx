
import 'mdbreact/dist/css/mdb.css';
import '../styles/home.scss'
import Map from './map';

import React, {Component} from "react";
import { Redirect } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol,MDBIcon, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios'

export class Auth extends Component {

        constructor(props) {
            super(props);
            this.state = {
                redirect : false,
                user : {},
                myclass: '',
                myclassx: '',
            }
            this.divclicked = this.divclicked.bind(this);
          }

        ajout_symp(sym, key){
            console.log("sym")
        }

        divclicked() {
          if (this.state.myclass === '') {
           this.setState({
            myclass: 'coolclass'
           })
          }
         else {
          this.setState({
            myclass: '',
          })
         }
        }
        divclickedx() {
          if (this.state.myclassx === '') {
           this.setState({
            myclassx: 'coolclassx'
           })
          }
         else {
          this.setState({
            myclassx: '',
          })
         }
        }


        async componentDidMount(){
          console.log(this.props.location.state)
          await this.setState({
            user: this.props.location.state.data.user,
            redirect : true
          })
        }

        async componentWillMount(){
          await this.setState({
            user: this.props.location.state.data.user,
            redirect : true
          })
        }

  render() {
    if (this.state.redirect === false) {
      return <Redirect to={{
                pathname: "/"
              }}
      />      
    }
    return (
      <div className="builder_homepage">
        {
          this.state.user && 
          <>
              <MDBCol md="2" className="col_aside">
                        <MDBRow className="nom_holder">
                            
                            <h4> <MDBIcon icon="user" className="icoon" /> <label>{this.state.user.nom} {this.state.user.prenom}</label></h4>
                        </MDBRow>
                        <MDBRow className="infos" onClick={() => {
                          this.divclicked()
                        }}>
                          My peronal informations
                        </MDBRow>
                        <MDBRow id="seconddiv" className={this.state.myclass}>
                          <MDBRow className="dom_holder">
                            <h5>Email : <span>{this.state.user.email} </span> </h5>
                            <h5>Tel : <span>{this.state.user.tel} </span> </h5>
                            <h5>Adresse : <span> {this.state.user.adress} </span> </h5>
                          </MDBRow>
                        </MDBRow>
                        <MDBRow className="infosx" onClick={() => {
                          this.divclickedx()
                        }}>
                          Symptomes
                        </MDBRow>
                        <MDBRow id="seconddivx" className={this.state.myclassx}>
                          <MDBRow className="sym_holder">
                            {this.state.user.symptomes.map((data) => 
                            
                              <div class="choice">
                                <input type="checkbox" class="custom-control-input" id={data} checked disabled />
                                <label class="custom-control-label" for={data}>{data}</label><br />
                              </div>
                            )}
                          </MDBRow>
                        </MDBRow>
                      

                        <MDBRow className="logout_holder">
                          <MDBBtn onClick={() => {
                            this.setState({
                              user : {},
                              redirect : false
                            })
                            this.props.history.push("/")
                          }}>
                            Logout
                          </MDBBtn>
                        </MDBRow>

                      </MDBCol>
                      
                      <MDBCol  md="10" style={{padding: "0"}}>
                        <MDBRow className="bodydd">
                          <h3>Covid Project Simulation</h3>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="12" className="map_holder">
                              <Map {...this.props}  />
                          </MDBCol>
                        </MDBRow>
                        
                      </MDBCol>
          </>
        }
        


    </div>
    )
  }
}

export default Auth