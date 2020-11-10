
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
                redirect: false,
                showtype : 1
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
      if (index !== -1){
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
      return <Redirect to={{
                pathname: "/home",
                state : {
                  data : {
                    user : this.state
                  }
                }
              }}
      /> 
    }
    return (
      <div className="builder-second">
      <h3 className="title" >Sign Up</h3>
      <h3 className="title" style={{marginTop: "11%"}} >Hello ! we will proceed to your registration : </h3>
      <h5 className="title" style={{marginTop: "14%", fontSize: "14px"}} >if you already have an account please clique  
        <a href="/login" style={{marginLeft: "3px"}}>
          Login
        </a>
      </h5>
      
        <div className="buiii">
          <MDBContainer className="bbb">
              {this.state.showtype === 1 && 
                  <MDBRow className="name_builder">
                    <label className="label_builder">Hi sir, Please give us your name :</label>
                    <MDBInput
                          style={{color: "white"}}
                          placeholder="Name : "
                          value = {this.state.nom}
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
                        <MDBBtn gradient="aqua" className="btn-next" onClick={() => {
                          this.setState({
                              showtype: 2
                          })
                        }}>
                          Ok
                        </MDBBtn>
                  </MDBRow>
                }
            {this.state.showtype === 2 && 
                <MDBRow className="firstname_builder">
                  
                  <label className="label_builder">Ok M : {this.state.nom}, now please give us your first name :</label>
                  <MDBInput
                        style={{color: "white"}}
                        placeholder="First name : "
                        value = {this.state.prenom}
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
                      <MDBBtn gradient="aqua" className="btn-next" onClick={() => {
                            this.setState({
                                showtype: 3
                            })
                          }}>
                        Ok
                      </MDBBtn>
                      <MDBBtn gradient="blue" className="btn-next" onClick={() => {
                            this.setState({
                                showtype: 1
                            })
                          }}>
                        Previous
                      </MDBBtn>
              </MDBRow>
            }
            
            {this.state.showtype === 3 && 
                <MDBRow className="firstname_builder">
                  
                  <label className="label_builder">Good M : {this.state.prenom} {this.state.nom}, can you give us ur phone number, so we can contact you :</label>
                  <MDBInput
                        style={{color: "white"}}
                        placeholder="Phone : "
                        value = {this.state.tel}
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
                      <MDBBtn gradient="aqua" className="btn-next" onClick={() => {
                            this.setState({
                                showtype: 4
                            })
                          }}>
                        Ok
                      </MDBBtn>
                      <MDBBtn gradient="blue" className="btn-next" onClick={() => {
                            this.setState({
                                showtype: 2
                            })
                          }}>
                        Previous
                      </MDBBtn>
              </MDBRow>
            }
            
            {this.state.showtype === 4 && 
                <MDBRow className="firstname_builder">
                  
                  <label className="label_builder">Great !! M {this.state.nom} {this.state.prenom}, now we need your adress :</label>
                  <MDBInput
                        style={{color: "white"}}
                        placeholder="Email : "
                        value = {this.state.adress}
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
                      <MDBBtn gradient="aqua" className="btn-next" onClick={() => {
                            this.setState({
                                showtype: 5
                            })
                          }}>
                        Ok
                      </MDBBtn>
                      <MDBBtn gradient="blue" className="btn-next" onClick={() => {
                            this.setState({
                                showtype: 3
                            })
                          }}>
                        Previous
                      </MDBBtn>
              </MDBRow>
            }
            
            
            {this.state.showtype === 5 && 
                <MDBRow className="firstname_builder">
                  
                  <label className="label_builder">Great !!, maybe you can give us your email :</label>
                  <MDBInput
                        style={{color: "white"}}
                        placeholder="Email : "
                        value = {this.state.email}
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={(e) => {
                            this.setState({
                                email:e.target.value
                            })
                        }}
                      />
                      <MDBBtn gradient="aqua" className="btn-next" onClick={() => {
                            this.setState({
                                showtype: 6
                            })
                          }}>
                        Ok
                      </MDBBtn>
                      <MDBBtn gradient="blue" className="btn-next" onClick={() => {
                            this.setState({
                                showtype: 4
                            })
                          }}>
                        Previous
                      </MDBBtn>
              </MDBRow>
            }

            
            {this.state.showtype === 6 && 
                <MDBRow className="firstname_builder">
                  
                  <label className="label_builder">Great !! Enter your password to create your account :</label>
                  <MDBInput
                        style={{color: "white"}}
                        placeholder="Email : "
                        value = {this.state.password}
                        group
                        type="password"
                        validate
                        error="wrong"
                        success="right"
                        onChange={(e) => {
                            this.setState({
                              password:e.target.value
                            })
                        }}
                      />
                      <MDBBtn gradient="aqua" className="btn-next" onClick={() => {
                            this.setState({
                                showtype: 7
                            })
                          }}>
                        Ok
                      </MDBBtn>
                      <MDBBtn gradient="blue" className="btn-next" onClick={() => {
                            this.setState({
                                showtype: 5
                            })
                          }}>
                        Previous
                      </MDBBtn>
              </MDBRow>
            }

            
            {this.state.showtype === 7 && 
                <MDBRow className="firstname_builder">
                  <div>
                    <label className="label_builder">Great !! we are almost done, just define your differents symptomes please :</label>
                  </div>
                  <br />
                  
                  <div class="custom-control custom-checkbox checkk">
                  <br />
                  <br />
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
                      <MDBBtn gradient="aqua" className="btn-next" onClick={(e) => {
                          e.preventDefault()
                          this.register()
                          }}>
                        Confime
                      </MDBBtn>
                      <MDBBtn gradient="blue" className="btn-next" onClick={() => {
                            this.setState({
                                showtype: 6
                            })
                          }}>
                        Previous
                      </MDBBtn>
              </MDBRow>
            }
           </MDBContainer>
    
    </div>
    </div>
    )
  }
}

export default Auth