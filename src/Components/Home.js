import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userData: [],
            first_name: '',
            last_name: '',
            pin: '',
            // address: '',
            apart: '',
            city: '',
            country: '',
            state: '',
            phone: ''
        }
    }
    input_change = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state.pin, this.state.pin.length);
        let pin_code = e.target.value
        console.log(pin_code, pin_code.length);
         
        if(pin_code.length == 6) {
            this.input_submit(pin_code)
        }    
    }
    input_submit = (zip_code) => {
        let pin_code = zip_code
        console.log(pin_code);
        

        axios.get('https://api.postalpincode.in/pincode/' + pin_code)
            .then(response => {
                console.log(response.data[0].PostOffice);
                this.setState({ userData: response.data[0]['PostOffice'][0] })
                console.log(response.data[0]['PostOffice'][0]);
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        console.log(this.state.userData.Block);
        let block = this.state.userData.Block
        let city = this.state.userData.District
        let country = this.state.userData.Country
        let state = this.state.userData.State
        return (
            <div className="container mt-5">
                <div class="card">
                    <div class="card-body">
                        <h5 class="font-weight-bold">Shipping Address</h5>
                        <form>
                            <div class="form-row mt-4">
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="First name (Optional)" name="first_name" value={this.state.first_name} onChange={this.input_change} />
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Last name" name="last_name" value={this.state.last_name} onChange={this.input_change} />
                                </div>
                            </div>
                            <div class="form-row mt-3">
                                <div class="col">
                                    <input type="number" maxlength="6" class="form-control" placeholder='PIN CODE       &#xe56a;' name="pin" onChange={this.input_change} />
                                </div>
                                
                            </div>
                            <input type="text" class="form-control mt-3" placeholder="Address" name="address" value={block !== undefined ? block : null} />
                            <input type="text" class="form-control mt-3" placeholder="Apartment, suite, etc. (optional)" name="apart" value={this.state.apart} onChange={this.input_change} />
                            <input type="text" class="form-control mt-3" placeholder="City" name="city" value={city !== undefined ? city : null}/>
                            <div class="form-row mt-4">
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Country/Region" name="country" value={country !== undefined ? country : null} />
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="State" name="state" value={state !== undefined ? state : null} />
                                </div>
                            </div>
                            <input type="number" class="form-control mt-3" placeholder="Phone" name="phone" value={this.state.phone} onChange={this.input_change} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
