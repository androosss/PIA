const mongoose=require('mongoose');

const zanrSchema=mongoose.Schema({
    ime:{type:String, required:true}
});

module.exports=mongoose.model('Zanr',zanrSchema);
