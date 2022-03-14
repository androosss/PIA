const mongoose=require('mongoose');

const followSchema=mongoose.Schema({
  username1:{type:String, required:true},
  username2:{type:String, required:true}
});

module.exports=mongoose.model('Follow',followSchema);
