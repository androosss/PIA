const mongoose=require('mongoose');

const bookuserSchema=mongoose.Schema({
  username:{type:String, required:true},
  naslov:{type:String, required:true},
  tip:{type:Number}, //0 procitao, 1 cita, 2 zeli
  stigo:{type:Number,required:true},
  strana:{type:Number, required:true}
});

module.exports=mongoose.model('BookUser',bookuserSchema);
