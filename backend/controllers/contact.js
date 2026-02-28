const Contact = require("../models/Contact.Model");

// Create a new contact(post Api)
exports.createContact = async(req, res)=>{
    try{
         const {name, email, phone, subject, message} = req.body;
         if(!name || !email || !phone || !subject || !message){
            return res
            .status(400)
            .json({status:"N", error:"All fields are Required"});
         }
    const newContact = new Contact({
      name, 
      email, 
      phone, 
      subject, 
      message,  
    });
    await newContact.save();
   return res
      .status(201)
      .json({status:"Y", message:"Thank you! we will contact you ASAP!"});     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
    
};

// Get all contacts (get Api)
exports.getContacts = async(req, res)=>{
  try{
      const contacts = await Contact.find();
      if(!contacts || contacts.length === 0){
        return res.status(400).json({status:"Y", message:"No data found"});
      }
     return res
      .status(200)
      .json({status:"Y", message:"success" , data:contacts});     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
    

};

exports.deleteContact = async(req, res)=>{
  let id = req.params.id;
  try{
      const contact = await Contact.findByIdAndDelete(id);
      if(!contact){
        return res.status(400).json({status:"Y", message:"No contact found"});
      }
      return res
      .status(200)
      .json({status:"Y", message:"Contact deleted successfully" });     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
};