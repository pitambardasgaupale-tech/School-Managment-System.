const Teacher = require("../models/Teacher.Model");

// Create a new Teacher(post Api)
exports.createTeacher= async(req, res)=>{
    try{
         const { name, subject, designation, bio, image } = req.body;
         if(!name || !subject || !designation || !bio || !image ){
            return res
            .status(400)
            .json({status:"N", error:"All fields are Required"});
         }
    const newTeacher = new Teacher({
      name, 
      subject, 
      designation,
      bio,
      image   
    });
    await newTeacher.save();
   return res
      .status(201)
      .json({status:"Y", message:"Teacher Info created successfully!"});     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
    
};

// Get all teacher (get Api)
exports.getTeachers = async(req, res)=>{
  try{
      const teachers = await Teacher.find();
      if(!teachers || teachers.length === 0){
        return res
        .status(400)
        .json({status:"Y", message:"No data found"});
      }
     return res
      .status(200)
      .json({status:"Y", message:"success" , data: teachers});     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
};

//delete teacher (delete Api)
exports.deleteTeacher = async(req, res)=>{
  let id = req.params.id;
  try{
      const teacher = await Teacher.findByIdAndDelete(id);
      if(!teacher){
        return res
        .status(400)
        .json({status:"Y", message:"No teacher found"});
      }
      return res
      .status(200)
      .json({status:"Y", message:"Teacher Info deleted successfully" });     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
};

//Update teacher (put Api)
exports.updateTeacher = async(req, res)=>{
  let id = req.params.id;
  try{
      const { name, subject, designation, bio, image } = req.body;
          if(!name || !subject || !designation || !bio || !image){
            return res
            .status(400)
            .json({status:"N", error:"All fields are Required"});
          }
      const teacher = await Teacher.findById(id);
      if(!teacher){
        return res
        .status(400)
        .json({status:"Y", message:"No teacher info found"});
      }
      
      const updatedTeacher = await Teacher.findByIdAndUpdate(id, {
        name, 
        subject, 
        designation, 
        bio, 
        image
    }); 
       
        if(updatedTeacher){
            return res
            .status(201)
            .json({status:"Y", message:"Teacher Info updated successfully" }); 
        }    
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
};