
import 'mdbreact/dist/css/mdb.css';
import '../styles/chat.scss'

import React, {Component} from "react";
import { Redirect } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios'

export class Auth extends Component {

        constructor(props) {
            super(props);
            this.state = {
                nom : '',
                prenom : '',
                email : '',
                password : '',
                tel : '',
                adress : '',
            }
            this.data= {
              redirect : false
            }
          }


    register() {
        var myParams = {
            data: this.state
        }
        axios.post('/api/register', myParams)
            .then(function(response){
                console.log(response.data.status)
                console.log("calbacl  --- ")
                this.setState({
                  redirect: true
                })
            })
            .catch(function(error){
              alert("error : user already exists !")
                console.log(error)
            })

    }

  render() {
    if (this.props.data.redirect) {
      return <Redirect to='/login'/>;
    }
    return (
      <div className="builder">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="4">
                <MDBCard style={{"padding": " 10px 42px"}}>
                  <MDBCardBody>
                    <form>
                      <p className="h4 text-center py-4">Sign up</p>
                      <div className="grey-text">
                        <MDBInput
                          label="Your name"
                          value = {this.state.nom}
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={(e) => {
                              this.setState({
                                  nom:e.target.value
                              })
                          }}
                        />

                        <MDBInput
                          label="Your first name"
                          value = {this.state.prenom}
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={(e) => {
                              this.setState({
                                  prenom:e.target.value
                              })
                          }}
                        />

                        <MDBInput
                          value = {this.state.adress}
                          label="adress"
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={(e) => {
                              this.setState({
                                  adress:e.target.value
                              })
                          }}
                        />


                        <MDBInput
                          value = {this.state.tel}
                          label="phone number"
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={(e) => {
                              this.setState({
                                  tel:e.target.value
                              })
                          }}
                        />



                        <MDBInput
                          value = {this.state.email}
                          label="Your email"
                          icon="envelope"
                          group
                          type="email"
                          validate
                          error="wrong"
                          success="right"
                          onChange={(e) => {
                              this.setState({
                                  email:e.target.value
                              })
                          }}
                        />
                        <MDBInput
                          label="Your password"
                          value = {this.state.password}
                          icon="lock"
                          group
                          type="password"
                          validate
                          onChange={(e) => {
                              this.setState({
                                  password:e.target.value
                              })
                          }}
                        />
                      </div>
                      <div className="text-center py-4 mt-3">
                        <MDBBtn color="cyan" onClick={(e) => {
                          e.preventDefault()
                          this.register()
                        }}>
                          Register
                        </MDBBtn>
                      </div>
                    </form>
                    <a href="/login" className="ref" >
                      you already have an account ? login 
                    </a>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
    </div>
    )
  }
}

export default Auth