// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/tests/MockV3Aggregator.sol";

library PriceConvertor{
    
    function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return uint256(price * 1e10);
    }

    function getConversion(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        ethAmount = (ethPrice * ethAmount) / 1e18;
        return uint256(ethAmount);
    }

}