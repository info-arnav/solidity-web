// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PriceConvertor.sol";

contract FundMe{

    using PriceConvertor for uint256;

    uint256 MINIMUM_PRICE = 50;

    address[] public funders;

    mapping(address => uint256) public funderToAmount;

    address public immutable OWNER;

    AggregatorV3Interface public PRICE_FEED;

    constructor(address priceFeed){
        OWNER = msg.sender;
        PRICE_FEED = AggregatorV3Interface(
            priceFeed
        );
    }

    function fund() public payable {

        require(msg.value.getConversion(PRICE_FEED) >= MINIMUM_PRICE, "Price is too low");

        funders.push(msg.sender);

        funderToAmount[msg.sender] = msg.value;

    }

    function withraw() public onlyOwner{

        for (uint256 i = 0; i < funders.length; i++){
            address funder = funders[i];
            funderToAmount[funder] = 0;
        }

        funders = new address[](0);

        (bool callSuccess, ) = payable(msg.sender).call{value:address(this).balance}("");

        require(callSuccess, "Call Failed");

    }

     fallback() external payable{
        fund();
    }

    receive() external payable{
        fund();
    }

    modifier onlyOwner() {
        if(msg.sender != OWNER){
            revert("Not Owner");
        }
        _;
    }

}