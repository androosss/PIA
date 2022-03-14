const mongoose=require('mongoose');

const eventSchema=mongoose.Schema({
  naziv:{type:String, required:true},
  pocetak:{type:Date, required:true},
  kraj:{type:Date},
  opis:{type:String, required:true},
  tip:{type:String, required:true},
  vlasnik:{type:String, required:true},
  zavrseno:{type:Number, required:true}
});

module.exports=mongoose.model('Event',eventSchema);
