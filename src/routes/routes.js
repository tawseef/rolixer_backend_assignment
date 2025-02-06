/* eslint-disable no-undef */

const express = require("express");

const router = express.Router();
const { handleGetRequest, handleSaleRequestForTheMonth, handleItemSoldRequestForTheMonth, handleItemNotSoldRequestForTheMonth } = require("../controller/controller");


router.get("/getall", handleGetRequest);
router.get("/totalsale/:month", handleSaleRequestForTheMonth);
router.get("/itemsold/:month", handleItemSoldRequestForTheMonth);
router.get("/itemnotsold/:month", handleItemNotSoldRequestForTheMonth);



module.exports = router;
