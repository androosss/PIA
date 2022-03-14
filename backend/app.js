const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const request = require("request");
const multer=require("multer");
const bcrypt=require("bcrypt");
const User=require('./models/user');
const Zanr=require('./models/zanr');
const Book=require('./models/book');
const Event=require('./models/event');
const EventCom=require('./models/eventcom');
const EventUser=require('./models/eventuser');
const Comment=require('./models/comment');
const Follow=require('./models/follow');
const BookUser=require('./models/bookuser');

const path=require('path');

const app=express();
const storage=multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,"backend/images")
  },
  filename: (req, file, cb)=>{
    const name=file.originalname.toLowerCase().split(' ').join('-');
    cb(null,name);
  }
});

mongoose.connect("mongodb+srv://androsss:Tgv1998@cluster0.dmofk.mongodb.net/test2?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true  })
.then(()=>{
  console.log('Connected!');
})
.catch(()=>{
  console.log("Failed");
});

app.use(bodyParser.json());
app.use("/images",express.static(path.join("backend/images")));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, DELETE, PATCH, OPTIONS')
  next();
});

app.post('/users',multer({storage:storage}).single('image'),(req,res,next)=>{
  const url=req.protocol+'://'+req.get('host');
  let img=null;
  if(req.file)
   img=url+'/images/'+req.file.filename;
  else
    img="http://localhost:3000/images/default-user-image.png"
  bcrypt.hash(req.body.password,10).then(hash=>{
    const user=new User({
      username:req.body.username,
      aktivan:req.body.aktivan,
      password:hash,
      tip:req.body.tip,
      imagePath:img,
      ime:req.body.ime,
      prezime:req.body.prezime,
      grad:req.body.grad,
      drzava:req.body.drzava,
      dan:req.body.dan,
      mesec:req.body.mesec,
      godina:req.body.godina,
      email:req.body.email,
      lastLog: req.body.lastLog
    });
    user.save();
    //console.log(user);
    res.status(201).json({
      message:"User added"
    });
  });
});
app.post('/captcha',function(req,res){
  if(req.body.token === undefined || req.body.token === '' || req.body.token === null) {
    return res.json({message:false});
  }
  var secretKey = "6Lftjs8ZAAAAANz5p7csUx8gC_roW5Wh7Unzo3zU";
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.token;

  request(verificationUrl,function(error,response,body) {
    body = JSON.parse(body);

    if(body.success !== undefined && !body.success) {
      return res.json({message:false});
    }
    res.json({message:true});
  });
});
app.post('/zanr',(req,res,next)=>{
  const zanr=new Zanr({
    ime:req.body.ime
  })
  //console.log(zanr);
  zanr.save();
  res.status(201).json({
    message:"Zanr dodat"
  })
});

app.delete('/zanr/:ime',(req,res,next)=>{
  Zanr.deleteOne({ime:req.params.ime}).then(result=>{
    res.status(201).json({
      message:"Zanr obrisan"
    })
  })
});

app.post('/books',multer({storage:storage}).single('image'),(req,res,next)=>{
  const url=req.protocol+'://'+req.get('host');
  let img=null;
  if(req.file)
   img=url+'/images/'+req.file.filename;
  else
    img="http://localhost:3000/images/default-book.png"
  const book=new Book({
    imagePath:img,
    naslov:req.body.naslov,
    dan:req.body.dan,
    mesec:req.body.mesec,
    godina:req.body.godina,
    autori:req.body.autori,
    odobreno:req.body.odobreno,
    opis:req.body.opis,
    zanr1:req.body.zanr1,
    zanr2:req.body.zanr2,
    zanr3:req.body.zanr3,
  });
  book.save();
  //console.log(book);
  res.status(201).json({
    message:"Book added"
  });
});

app.get('/users',(req,res,next)=>{
  User.find()
  .then(doc=>{
    //console.log(doc);
    res.status(200).json({
      message:"Fetched",
      users:doc,
    });
  });
});

app.get('/zanr',(req,res,next)=>{
  Zanr.find()
  .then(doc=>{
    //console.log(doc);
    res.status(200).json({
      message:"Fetched",
      zanrs:doc,
    });
  });
});

app.get('/books',(req,res,next)=>{
  Book.find()
  .then(doc=>{
    //console.log(doc);
    res.status(200).json({
      message:"Fetched",
      books:doc,
    });
  });
});

app.get('/coms',(req,res,next)=>{
  Comment.find()
  .then(doc=>{
    //console.log(doc);
    res.status(200).json({
      message:"Fetched",
      coms:doc,
    });
  });
});

app.get('/bookusers',(req,res,next)=>{
  BookUser.find()
  .then(doc=>{
    //console.log(doc);
    res.status(200).json({
      message:"Fetched",
      bookusers:doc,
    });
  });
});

app.post('/bookusers',(req,res,next)=>{
  const bookuser=new BookUser({
    username:req.body.username,
    naslov:req.body.naslov,
    tip:req.body.tip,
    stigo:req.body.stigo,
    strana:req.body.strana
  })
  //console.log(bookuser);
  bookuser.save();
  res.status(201).json({
    message:"BookUser dodat"
  })
});
app.post('/coms',(req,res,next)=>{
  const com=new Comment({
    username:req.body.username,
    naslov:req.body.naslov,
    ocena:req.body.ocena,
    tekst:req.body.tekst
  })
  com.save();
  res.status(201).json({
    message:"Komentar dodat"
  })
});

app.delete('/bookusers/:naslov/:username',(req,res,next)=>
{
  console.log(req.params.naslov);
  console.log(req.params.username);
  BookUser.deleteOne({username:req.params.username,naslov:req.params.naslov }).then(result=>{
    console.log(result);
  })
  res.status(200).json({message:'BookUser izbirsan'});
})
app.post('/follows',(req,res,next)=>{
  const follow=new Follow({
    username1:req.body.username1,
    username2:req.body.username2,
  })
  //console.log(bookuser);
  follow.save();
  res.status(201).json({
    message:"Follow dodat"
  })
});

app.get('/follows',(req,res,next)=>{
  Follow.find()
  .then(doc=>{
    //console.log(doc);
    res.status(200).json({
      message:"Fetched",
      follows:doc,
    });
  });
});
app.post('/users/login',(req,res,next)=>{
  let usertip=0;
  User.findOne({username:req.body.username}).then(user=>{
      if(!user){
        res.status(201).json({
            message:"Pogresni kredincijali",
            tip:-2
          });
      }
      usertip=user.tip;
      return bcrypt.compare(req.body.password, user.password);
  }).then(result=>{
    if(result){
      res.status(200).json({
        message:"Ok",
        tip:usertip
      });
    }
    else res.status(201).json({message:"Not ok", tip:usertip});
  });
});

app.patch("/bookuser", (req,res,next)=>{
    let searchusername=req.body.username;
    let searchnaslov=req.body.naslov;
    let stigo1=req.body.stigo;
    let strana1=req.body.strana;
    let tip1=req.body.tip;
    BookUser.updateOne({username:searchusername, naslov:searchnaslov},
      {$set:{stigo:stigo1,strana:strana1,tip:tip1}}).
    then(result=>{
      res.status(200).json({
        message:"Update"
      })
    })

})
app.patch("/users", (req,res,next)=>{
  let searchusername=req.body.username;
  let ime1=req.body.ime;
  let prezime1=req.body.prezime;
  let tip1=req.body.tip;
  let grad1=req.body.grad;
  let drzava1=req.body.drzava;
  let dan1=req.body.dan;
  let mesec1=req.body.mesec;
  let godina1=req.body.godina;
  User.updateOne({username:searchusername},
    {$set:{ime:ime1,prezime:prezime1,tip:tip1, grad:grad1, drzava:drzava1,dan:dan1,mesec:mesec1,godina:godina1}}).
    then(result=>{
      res.status(200).json({
       message:"Update"
      })
    })
})

app.patch('/approved', (req,res,next)=>{
  console.log(req.body.naslov);
  Book.updateOne({naslov:req.body.naslov},{$set:{odobreno:1}}).then(result=>{
    res.status(200).json({
      message:"Aproved"
    })
  })
})

app.patch('/users/approved', (req,res,next)=>{
  console.log(req.body.username);
  User.updateOne({username:req.body.username},{$set:{tip:req.body.tip}}).then(result=>{
    res.status(200).json({
      message:"Aproved"
    })
  })
})

app.patch('/books',(req,res,next)=>{
  Book.updateOne({naslov:req.body.naslov},{$set:{autori:req.body.autori, opis:req.body.opis, zanr1:req.body.zanr1,
  zanr2:req.body.zanr2,zanr3:req.body.zanr3,dan:req.body.dan,mesec:req.body.mesec,godina:req.body.godina}}).then(result=>{
    res.status(200).json({
      message:"updated"
    })
  })
})

app.patch('/users/patchdate', (req,res,next)=>{
  User.updateOne({username:req.body.username},{$set:{aktivan:req.body.aktivan,lastLog:req.body.lastLog}}).then(result=>{
    res.status(200).json({
      message:"Aproved"
    })
  })
})

app.get('/events',(req,res,next)=>{
  Event.find()
  .then(doc=>{
    //console.log(doc);
    res.status(200).json({
      message:"Fetched",
      events:doc,
    });
  });
})

app.post('/events',(req,res,next)=>{
  const event=new Event({
    vlasnik:req.body.vlasnik,
    naziv:req.body.naziv,
    pocetak:req.body.pocetak,
    kraj:req.body.kraj,
    tip:req.body.tip,
    zavrseno:req.body.zavrseno,
    opis:req.body.opis
  })
  event.save();
  res.status(201).json({
    message:"Dogadjaj dodat"
  })
});

app.post('/eventusers',(req,res,next)=>{
  const eventuser=new EventUser({
    username:req.body.username,
    event:req.body.naziv,
    dozvoljen:req.body.dozvoljen
  })
  //console.log(zanr);
  eventuser.save();
  res.status(201).json({
    message:"EventUser dodat"
  })
});

app.get('/eventusers',(req,res,next)=>{
  EventUser.find()
  .then(doc=>{
    //console.log(doc);
    res.status(200).json({
      message:"Fetched",
      eventusers:doc,
    });
  });
})

app.patch('/events',(req,res,next)=>{
  Event.updateOne({naziv:req.body.naziv},{$set:{zavrseno:req.body.zavrseno}}).then(result=>{
    res.status(201).json({
      message:"Updated"
    })
  })
})

app.patch('/eventusers',(req,res,next)=>{
  EventUser.updateOne({event:req.body.event,username:req.body.username},{$set:{dozvoljen:req.body.dozvoljen}})
  .then(result=>{
    res.status(201).json({
      message:"Updated"
    })
  })
})

app.get('/eventcoms',(req,res,next)=>{
  EventCom.find()
  .then(doc=>{
    //console.log(doc);
    res.status(200).json({
      message:"Fetched",
      eventcoms:doc,
    });
  });
})

app.post('/eventcoms',(req,res,next)=>{
  const eventcom=new EventCom({
    username:req.body.username,
    event:req.body.event,
    tekst:req.body.tekst
  })
  //console.log(zanr);
  eventcom.save();
  res.status(201).json({
    message:"EventCom dodat"
  })
});



module.exports=app;
