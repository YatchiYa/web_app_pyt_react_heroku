
import 'mdbreact/dist/css/mdb.css';
import '../styles/chat.scss'
import '../styles/home.scss'

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
                symptomes:[],
                redirect: false
            }
          }
    componentDidMount() {     
    }

    register() {
        var myParams = {
            data: this.state
        }
        axios.post('/api/register', myParams)
            .then(res => {
                this.setState({
                  redirect : true
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    async add_symp(key, value){

      var index = -1
      index = await this.state.symptomes.indexOf(value); // Let's say it's Bob
      if (index != -1){
          this.setState({
                symptomes : this.state.symptomes.splice(index, 1)
          })
      }
      else{

          this.setState({
                symptomes : this.state.symptomes.concat(value)
          })
      }

  }


  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/login'/>;
    }
    return (
      <div className="builder-v2">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="4" style={{margin : "3% 30%"}}>
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

                                <div class="custom-control custom-checkbox checkk">
                                  <div class="choice">
                                    <input type="checkbox" class="custom-control-input" id="Fièvre"
                                    onChange={(e) => {
                                        console.log("e.checked")
                                        console.log(e.checked)
                                        this.add_symp(1, 'Fièvre')
                                    }} />
                                    <label class="custom-control-label" for="Fièvre">Fièvre</label><br />
                                  </div>
                                  <div class="choice">
                                    <input type="checkbox" class="custom-control-input" id="Mal_de_tete"
                                    onChange={(e) => {
                                        this.add_symp(2, 'Mal de tête')
                                    }} />
                                    <label class="custom-control-label" for="Mal_de_tete">Mal de tête</label><br />
                                  </div>
                                  <div class="choice">
                                    <input type="checkbox" class="custom-control-input" id="Courbature"
                                    onChange={(e) => {
                                        this.add_symp(3, 'Courbature')
                                    }} />
                                    <label class="custom-control-label" for="Courbature">Courbature</label><br />
                                  </div>
                                  <div class="choice">
                                    <input type="checkbox" class="custom-control-input" id="Fatigue"
                                    onChange={(e) => {
                                        this.add_symp(4, 'Fatigue')
                                    }} />
                                    <label class="custom-control-label" for="Fatigue">Fatigue</label><br />
                                  </div>
                                  <div class="choice">
                                    <input type="checkbox" class="custom-control-input" id="Perte_de_gout"
                                    onChange={(e) => {
                                        this.add_symp(5, 'Perte de goût')
                                    }} />
                                    <label class="custom-control-label" for="Perte_de_gout">Perte de goût</label><br />
                                  </div>
                                  <div class="choice">
                                    <input type="checkbox" class="custom-control-input" id="Perte_d_odorat"
                                    onChange={(e) => {
                                        this.add_symp(4, 'Perte odorat')
                                    }} />
                                    <label class="custom-control-label" for="Perte_d_odorat">Perte d'odorat</label><br />
                                  </div>

                              </div>
                      </div>
                      <br/>
                      <br/>
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
                    <br />
                    <a href="/reg" className="ref" style={{color: "#280707"}}>
                      To have another experience of form registration
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