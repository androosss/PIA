const mongoose=require('mongoose');

const eventuserSchema=mongoose.Schema({
  event:{type:String, required:true},
  username:{type:String, required:true},
  dozvoljen:{type:Number, required:true}
});

module.exports=mongoose.model('EventUser',eventuserSchema);
