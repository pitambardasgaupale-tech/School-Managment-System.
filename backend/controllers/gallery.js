const Gallery = require("../models/Gallery.Model");

// Create a new gallery(post Api)
exports.createGallery= async(req, res)=>{
    try{
         const { title, imagesUrl, date } = req.body;
         if(!title || !imagesUrl || !date){
            return res
            .status(400)
            .json({status:"N", error:"All fields are Required"});
         }
    const newGallery = new Gallery({
      title, 
      imagesUrl, 
      date,   
    });
    await newGallery.save();
   return res
      .status(201)
      .json({status:"Y", message:"Gallery created successfully!"});     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
    
};

// Get all gallery (get Api)
exports.getGallerys = async(req, res)=>{
  try{
      const gallerys = await Gallery.find();
      if(!gallerys || gallerys.length === 0){
        return res.status(400).json({status:"Y", message:"No data found"});
      }
     return res
      .status(200)
      .json({status:"Y", message:"success" , data: gallerys});     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
};

exports.deleteGallery = async(req, res)=>{
  let id = req.params.id;
  try{
      const gallery = await Gallery.findByIdAndDelete(id);
      if(!gallery){
        return res.status(400).json({status:"Y", message:"No gallery found"});
      }
      return res
      .status(200)
      .json({status:"Y", message:"Gallery deleted successfully" });     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
};

//Update gallery (put Api)
exports.updateGallery = async(req, res)=>{
  let id = req.params.id;
  try{
      const { title, imagesUrl, date } = req.body;
          if(!title || !imagesUrl || !date){
            return res
            .status(400)
            .json({status:"N", error:"All fields are Required"});
          }
      const gallery = await Gallery.findById(id);
      if(!gallery){
        return res.status(400).json({status:"Y", message:"No gallery found"});
      }
      
      const updatedGallery = await Gallery.findByIdAndUpdate(id, {
        title, 
        imagesUrl,
        date, 
        }); 
       
        if(updatedGallery){
            return res
            .status(201)
            .json({status:"Y", message:"Gallery updated successfully" }); 
        }    
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
};