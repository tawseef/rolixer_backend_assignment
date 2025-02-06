/* eslint-disable no-undef */

const { gettingDatafromAPI, handleCalculateMonthSale, handleCalculateItemSold, handleCalculateItemNotSold} = require("../service/service");
  
async function handleGetRequest(req,res) {
    const getData = await gettingDatafromAPI();
    if (getData) {
      return res.status(200).json(getData);
    } else {
      return res.status(404).json({ message: 'internal error' });
    }
}

async function handleSaleRequestForTheMonth(req,res) {
  const { month } = req.params;
  const sale = await handleCalculateMonthSale(month);
  if(sale) return res.status(200).json(sale);
  else return res.status(404).json({ message: 'internal error' });
}

async function handleItemSoldRequestForTheMonth(req,res) {
  const { month } = req.params;
  const sale = await handleCalculateItemSold(month);
  if(sale) return res.status(200).json(sale);
  else return res.status(404).json({ message: 'internal error' });
}

async function handleItemNotSoldRequestForTheMonth(req,res) {
  const { month } = req.params;
  const sale = await handleCalculateItemNotSold(month);
  if(sale) return res.status(200).json(sale);
  else return res.status(404).json({ message: 'internal error' });
}
  
module.exports = { handleGetRequest, handleSaleRequestForTheMonth, handleItemSoldRequestForTheMonth, handleItemNotSoldRequestForTheMonth };