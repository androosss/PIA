const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
  username:{type:String, required:true},
  password:{type:String, required:true},
  tip:{type:Number, required:true},
  imagePath:{type:String, required:true},
  ime:{type:String, required:true},
  prezime:{type:String, required:true},
  grad:{type:String, required:true},
  drzava:{type:String, required:true},
  email:{type:String, required:true},
  dan:{type:Number, required:true},
  mesec:{type:Number, required:true},
  godina:{type:Number, required:true},
  lastLog:{type:Date,required:true},
  aktivan:{type:Number, required:true}
});

module.exports=mongoose.model('User',userSchema);
