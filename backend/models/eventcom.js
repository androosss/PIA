const mongoose=require('mongoose');

const eventcomSchema=mongoose.Schema({
  event:{type:String, required:true},
  username:{type:String, required:true},
  tekst:{type:String, required:true}
});

module.exports=mongoose.model('EventCom',eventcomSchema);
