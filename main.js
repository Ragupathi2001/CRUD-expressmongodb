const express =require("express");
const app=express();
const mongoose=require("mongoose");

app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mynewdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err){
        console.log("Connected to db");
    }else{
        console.log(err);
    }
})



// Schema

const sch={
    name:String,
    email:String,
    id:Number
}

const monmodel=mongoose.model("NewCOL",sch);

//Post

app.post("/post",async(req,res)=>{
    console.log("inside Post");
    const data=new monmodel({
        name:req.body.name,
        email:req.body.email,
        id:req.body.id
    });

    const val=await data.save();
    res.json(val);
})

//Update

app.put("/update/:id",async(req,res)=>{
    let upid=req.params.id;
    let upname=req.body.name;
    let upemail=req.body.email;

monmodel.findOneAndUpdate({id:upid},{$set:{name:upname,email:upemail}},
    {new:true},(err,data)=>{
        if(err){
            res.send("error")
        }else{
        if(data==null){
            res.send("Nothing Found")
        }else{
            res.send(data)
        }
    }
    }


)})

//Fetch or Get

app.get("/fetch/:id",(req,res)=>{
    let fetchId=req.params.id;
    monmodel.find(({id:fetchId}),(err,val)=>{

        if(err){
            res.send("error")
        }else{
            if(val.length==0){
                res.send("no Data")
            }else{
                res.send(val);
            }
        } 
    })
})

// delete

app.delete("/del/:id",(req,res)=>{
    let delId=req.params.id;

    monmodel.findOneAndDelete(({id:delId}),(err,docs)=>{
        if(err){
            res.send("err")
        }else{
            res.send(docs)
        }
    })

})


app.listen(3000,()=>{
    console.log("on port 3000");
})