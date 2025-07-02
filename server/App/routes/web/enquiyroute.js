// Fix this line:
let express = require('express');
const { enquiyinsert, enquiylist, enquriydelete, enquirierows, enquriyupdate,  } = require('../../controllers/web/enqirycontoller');
let enquriyrouter = express.Router();

enquriyrouter.post("/insert", enquiyinsert);
enquriyrouter.get("/view", enquiylist);
enquriyrouter.delete("/delete/:id", enquriydelete);
enquriyrouter.get("/edit/:id",enquirierows );
enquriyrouter.put("/update/:id", enquriyupdate);
module.exports = enquriyrouter;
 