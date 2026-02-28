const Event = require("../models/Event.Model");

// Create a new event(post Api)
exports.createEvent= async(req, res)=>{
    try{
         const { title, description, shortDescription, date, location } = req.body;
         if(!title || !description || !shortDescription || !date || !location){
            return res
            .status(400)
            .json({status:"N", error:"All fields are Required"});
         }
    const newEvent = new Event({
      title, 
      description, 
      shortDescription, 
      date, 
      location,  
    });
    await newEvent.save();
   return res
      .status(201)
      .json({status:"Y", message:"Event created successfully!"});     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
    
};

// Get all event (get Api)
exports.getEvents = async(req, res)=>{
  try{
      const events = await Event.find();
      if(!events || events.length === 0){
        return res.status(400).json({status:"Y", message:"No data found"});
      }
     return res
      .status(200)
      .json({status:"Y", message:"success" , data: events});     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
};

exports.deleteEvent = async(req, res)=>{
  let id = req.params.id;
  try{
      const event = await Event.findByIdAndDelete(id);
      if(!event){
        return res.status(400).json({status:"Y", message:"No event found"});
      }
      return res
      .status(200)
      .json({status:"Y", message:"Event deleted successfully" });     
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
};

//Update events (put Api)
exports.updateEvent = async(req, res)=>{
  let id = req.params.id;
  try{
      const { title, description, shortDescription, date, location } = req.body;
          if(!title || !description || !shortDescription || !date || !location){
            return res
            .status(400)
            .json({status:"N", error:"All fields are Required"});
          }
      const event = await Event.findById(id);
      if(!event){
        return res.status(400).json({status:"Y", message:"No event found"});
      }
      
      const updatedEvent = await Event.findByIdAndUpdate(id, {
        title, 
        description, 
        shortDescription, 
        date, 
        location,
        }); 
       
        if(updatedEvent){
            return res
            .status(201)
            .json({status:"Y", message:"Event updated successfully" }); 
        }    
    }catch(error){
          console.log(error);
          return res
            .status(500)
            .json({status:"N", error:`Internal server error: ${error}`});
    }
};