const mongoose=require('mongoose');

const bookSchema=mongoose.Schema({
    imagePath:{type:String, required:true},
    naslov:{type:String, required:true},
    autori:{type:String, required:true},
    zanr1:{type:String},
    zanr2:{type:String},
    zanr3:{type:String},
    opis:{type:String, required:true},
    dan:{type:Number, required:true},
    mesec:{type:Number, required:true},
    godina:{type:Number, required:true},
    odobreno:{type:Number, required:true}
});

module.exports=mongoose.model('Book',bookSchema);
