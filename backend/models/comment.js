const mongoose=require('mongoose');

const commentSchema=mongoose.Schema({
  username:{type:String, required:true},
  ocena:{type:Number, required:true},
  naslov:{type:String,required:true},
  tekst:{type:String}
});

module.exports=mongoose.model('Comment',commentSchema);
