import React ,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

constructor(props) {
super(props);

this.state = {
amount: 1,
//country: '',
tocountry: '',
frcountry: '',
convertedValue: 0,
currencyCodes: []
}
}

componentWillMount = () => {
console.log("will mount")
this.setState({
convertedValue:"",
amount:""
})
}

componentDidMount = () => {
console.log("did mount");
axios({
method: "GET",
url: "https://free.currconv.com/api/v7/currencies?apiKey=b2926387e0a03a02fa74"
}).then((res) => {
let countryCodes = [];
// console.log(res.data.results);
let currencyCodes = Object.keys(res.data.results);
// console.log(currencyCodes);

currencyCodes.forEach((cc) => {
// console.log(res.data.results[cc].currencyName);
countryCodes.push({
currencyName: res.data.results[cc].currencyName,
currencyCode: cc
})
})

this.setState({
currencyCodes: countryCodes
})


}).catch((err) => {
console.log(err)
})
}

convertCurrency = () => {
if(this.state.tocountry === '' && this.state.frcountry === '') {
alert("pls select a county")
}
if(this.state.amount === '') {
alert("pls Enter Amount")
}

// validation for amount
let q = `${this.state.tocountry}_${this.state.frcountry}`
axios({
method:'GET',
url:`https://free.currconv.com/api/v7/convert?q=${q}&apiKey=b2926387e0a03a02fa74&compact=ultra`
}).then((res)=>{
console.log(res.data[q]);

let convertedValue = 0;
convertedValue=this.state.amount*res.data[q];

this.setState({
convertedValue:convertedValue,
amount:""
})

}).catch((err)=>{
console.log(err)
})
}

render() {
return (
<div className="App">
  <section className="hero is-medium is-primary is-bold">
    <div className="hero-body">

      <div className="container">
        <br />
        <h1>Curency Converter React js</h1>
        <hr />

      </div>
      <div className="container">
        <div className="columns is-desktop">
          <div className="column">
            <div className="control has-icons-left has-icons-right">
              <input className="input" className="input is-rounded" type="number" placeholder="amount" value={this.state.amount}
                onChange={(e)=> {
              this.setState({
              amount: e.target.value
              })
              }}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-coins"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <div className="control has-icons-left">
                <div className="select is-rounded is-fullwidth">
                  <select onChange={(e)=> {
                    this.setState({
                    tocountry: e.target.value
                    })
                    }}>
                    <option value="">select a country </option>
                    {this.state.currencyCodes.map((cc, i) => {
                    return(
                    <option value={cc.currencyCode}>{cc.currencyCode} - {cc.currencyName}</option>
                    )
                    })}
                  </select>
                </div>
                <div className="icon is-small is-left">
                  <i className="fas fa-globe"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <div className="control has-icons-left">
                <div className="select is-rounded is-fullwidth">
                  <select onChange={(e)=> {
                    this.setState({
                    frcountry: e.target.value
                    })
                    }}>
                    <option value="">select a country </option>
                    {this.state.currencyCodes.map((cc, i) => {
                    return(
                    <option value={cc.currencyCode}>{cc.currencyCode} - {cc.currencyName}</option>
                    )
                    })}
                  </select>
                </div>
                <div className="icon is-small is-left">
                  <i className="fas fa-globe"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <a className="button is-primary is-inverted is-rounded is-fullwidth" onClick={this.convertCurrency}>Convert</a>
          </div>
        </div>
      </div>
      <div className="container">
        <br />
        <div>
          <h1>{this.state.convertedValue}</h1>
        </div>
      </div>
    </div>
  </section>
</div>
);
}
}

export default App;