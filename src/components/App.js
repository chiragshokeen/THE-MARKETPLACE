import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import Marketplace from '../abis/Marketplace.json'

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }



  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)

    }else{
      window.alert('Non-Ethereum browser detected.You should consider trying MetaMask')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3 
     //load account currently using
     const accounts = await web3.eth.getAccounts()
    //console.log(accounts[0])
    this.setState({ account: accounts[0] })

   //console.log(Marketplace.abi , Marketplace.networks[5777].address)
    //loading smart contract from blockchain
    const networkId = await web3.eth.net.getId()
  //  console.log(networkId)
    // const abi= Marketplace.abi
    // const address = Marketplace.networks[networkId].address
    // const marketplace = new web3.eth.Contract(abi , address)
    // console.log(marketplace)


    
    const networkData = Marketplace.networks[networkId]
    if(networkData) {
      const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
      console.log(marketplace)
     
   
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }

  }


  constructor(props){
    super(props)
    this.state = {
      account : ''  ,
      productCount: 0,
      products: [],
      loading: true
    }

  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            BLOCKCHAIN MARKETPLACE
          </a>
        <ul className='navbar-nav px-3'>
          <li className='nav-item text-nowrap d-none d-sm-none d-sm-block'>
            <small className='text-white'><span id="account">{this.state.account}</span></small>
          </li>
        </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Dapp University Starter Kit</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN BLOCKCHAIN <u><b>NOW! </b></u>
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
