const Notice = require("../models/Notice.Model");

// Create a new Notice(post Api)
exports.createNotice= async(req, res)=>{
    try{
         const { title, description, date, category } = req.body;
         if(!title || !description || !date || !category){
            return res
            .status(400)
            .json({status:"N", error:"All fields are Required"});
         }
    const newNotice = new Notice({
      title, 
      description, 
      date,
      category   
    });
    await newNotice.save();
   return res
      .status(201)
      .json({status:"Y", message:"Notice created successfully!"});     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
    
};

// Get all notice (get Api)
exports.getNotices = async(req, res)=>{
  try{
      const notices = await Notice.find();
      if(!notices || notices.length === 0){
        return res
        .status(400)
        .json({status:"Y", message:"No data found"});
      }
     return res
      .status(200)
      .json({status:"Y", message:"success" , data: notices});     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
};

//delete notice (delete Api)
exports.deleteNotice = async(req, res)=>{
  let id = req.params.id;
  try{
      const notice = await Notice.findByIdAndDelete(id);
      if(!notice){
        return res
        .status(400)
        .json({status:"Y", message:"No notice found"});
      }
      return res
      .status(200)
      .json({status:"Y", message:"Notice deleted successfully" });     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
};

//Update notice (put Api)
exports.updateNotice = async(req, res)=>{
  let id = req.params.id;
  try{
      const { title, description, date, category } = req.body;
          if(!title || !description || !date || !category){
            return res
            .status(400)
            .json({status:"N", error:"All fields are Required"});
          }
      const notice = await Notice.findById(id);
      if(!notice){
        return res
        .status(400)
        .json({status:"Y", message:"No notice found"});
      }
      
      const updatedNotice = await Notice.findByIdAndUpdate(id, {
        title, 
        description,
        date,
        category 
        }); 
       
        if(updatedNotice){
            return res
            .status(201)
            .json({status:"Y", message:"Notice updated successfully" }); 
        }    
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
};