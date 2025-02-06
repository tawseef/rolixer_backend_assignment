/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */

// const User = require("../model/user.model");
const axios = require("axios");

async function gettingDatafromAPI() {
  try {
    const response = await axios.get(`https://s3.amazonaws.com/roxiler.com/product_transaction.json`);  
    if (response) return response.data;
    else return null;
  } catch (error) {
    throw error;
  }
}

async function handleCalculateMonthSale(month) {
  try {
    const response = await gettingDatafromAPI();  
    if (response){
      const saleForGivenMonth = getSalesForMonth(response, month)
      return saleForGivenMonth;
    }
    else return null;
  } catch (error) {
    throw error;
  }
}

async function handleCalculateItemSold(month) {
  try {
    const response = await gettingDatafromAPI();  
    if (response){
      const saleForGivenMonth = getSoldItemsCountForMonth(response, month)
      return saleForGivenMonth;
    }
    else return null;
  } catch (error) {
    throw error;
  }
}


async function handleCalculateItemNotSold(month) {
  try {
    const response = await gettingDatafromAPI();  
    if (response){
      const saleForGivenMonth = getNotSoldItemsCountForMonth(response, month)
      return saleForGivenMonth;
    }
    else return null;
  } catch (error) {
    throw error;
  }
}

const getNotSoldItemsCountForMonth = (products, targetMonth) => {
  return products
    .filter(product => !product.sold) // Only count NOT sold items
    .filter(product => {
      const month = new Date(product.dateOfSale).toLocaleString('en-US', { month: 'short' });
      return month.toLowerCase() === targetMonth.toLowerCase();
    }).length; // Count the filtered items
};

const getSalesForMonth = (products, tarmonth) => {
  return products
    .filter(product => product.sold) // Only sold items
    .filter(product => {
      const month = new Date(product.dateOfSale).toLocaleString('en-US', { month: 'short' });
      return month.toLowerCase() === tarmonth.toLowerCase();
    })
    .reduce((total, product) => total + product.price, 0);
};


const getSoldItemsCountForMonth = (products, targetMonth) => {
  return products
    .filter(product => product.sold) 
    .filter(product => {
      const month = new Date(product.dateOfSale).toLocaleString('en-US', { month: 'short' });
      return month.toLowerCase() === targetMonth.toLowerCase();
    }).length; 
};

module.exports = { gettingDatafromAPI, handleCalculateMonthSale, handleCalculateItemSold, handleCalculateItemNotSold };
