import React, { Component } from "react";
import logo from "./logo.png";
import { newContextComponents } from "@drizzle/react-components"
import { DrizzleContext } from '@drizzle/react-plugin';
import IERC20 from "./contracts/IERC20.json"

const { ContractData } = newContextComponents;

class MyComponent extends Component {
	/**
	 * Checks if a contract of the same name already exists and if not 
	 * adds a contract to the Drizzle instance
	 * @param {*} _drizzle Drizzle instance
	 * @param {*} _contractName The name of the contract to add
	 * @param {*} _abi ABI for the contract
	 * @param {*} _contractAddress Address of the deployed contract
	 */
  addContract(_drizzle, _contractName, _abi, _contractAddress) {
    //Check the contract hasn't been added yet
    if (!_drizzle.contracts[_contractName]) {
      //add the contract
      _drizzle.addContract({
        contractName: _contractName,
        web3Contract: new _drizzle.web3.eth.Contract(
          _abi,
          _contractAddress
        )
      });
    }
  }

  constructor(props) {
    super(props);
    this.addContract(props.drizzle, "WETH", IERC20.abi, "0x2fcc4dba284dcf665091718e4d0dab53a416dfe7");
  }

  render() {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;
          console.log(drizzle.contracts.WETH);
          if (!initialized || !drizzle.contracts["WETH"].methods) {
            return "Loading...";
          }
          return (
            <div className="section">
              <ContractData drizzle={drizzle} drizzleState={drizzleState}
                contract="WETH"
                method="totalSupply" />
            </div>
          )
        }}
      </DrizzleContext.Consumer>
    )
  };
}

export default MyComponent; 
