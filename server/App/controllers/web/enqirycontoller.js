const EnquiryModel = require("../../model/enquriy.model");

let enquiyinsert = (req, res) => {
  const { name, email, phone, message } = req.body;

  const newEnquiry = new EnquiryModel({
    name,
    email,
    phone,
    message
  });

  newEnquiry.save().then(() => {
    res.send({satatus:"1",message:"Enquiry Inserted Successfully"});
  }).catch((err) => {
    res.send({satatus:"0",message:"Enquiry Not Inserted Successfully",error:err});
  });
}; 


let enquiylist = async (req, res) => {
  try {
    let enquriy = await EnquiryModel.find();
    res.send({ status: "1", enquriylist: enquriy });
  } catch (err) {
    res.send({ status: "0", message: "Failed to fetch enquiries", error: err });
  }
};

let enquriydelete = async(req, res)=>{
  let enId = req.params.id;
  let enquriy = await EnquiryModel.deleteOne({_id:enId});
  res.send({status:"1",message:"Enquiry Deleted Successfully",enquriy:enquriy}); 
}

let enquirierows = async (req, res) => {
  let enId = req.params.id;
  try {
    let enquriy = await EnquiryModel.findOne({ _id: enId }); // ✅ use findOne to fetch the document
    res.send({ status: "1", message: "Enquiry fetched successfully", enquriy });
  } catch (err) {
    res.status(500).send({ status: "0", message: "Error fetching enquiry", error: err });
  }
};



let enquriyupdate = async (req, res) => {
     let enId = req.params.id;
    const { name, email, phone, message } = req.body;
    let updateobj ={
      name,
      email,
      phone,
      message
    };
    let updateres = await EnquiryModel.updateOne({_id:enId},updateobj);
    res.send({status:"1",message:"Enquiry Updated Successfully",enquriy:updateres});
     
  
};
 
module.exports = { 
  enquiyinsert,
  enquiylist,
  enquriydelete,
  enquirierows,
  enquriyupdate
  
};
