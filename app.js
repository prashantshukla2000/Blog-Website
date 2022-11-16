//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");
const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://Prashant_shukla:Prashant-123@cluster0.1tb9p4c.mongodb.net/blogDB");
const postSchema={
  title:String,
  content:String
};
const Post=mongoose.model("Item",postSchema);

const homeStartingContent = "Welcome to my Blog.";
const aboutContent = "Hi! I am Prashant Shukla, I am Developer with a passion for coding, I'm Owner of Bhushan Apps and Sole author of this Blog Website.";
const contactContent = "If you want to Connect with me or just want to meet up for Coffee.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  Post.find({},function(err,posts){
    res.render("home",{startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
})

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})
app.post("/compose",function(req,res){
  const post=new Post({
    title:req.body.postTitle,
    content:req.body.postBody
  });
  post.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect("/");
    }
  });
})


app.get('/posts/:postId', (req, res) => {
  const requestedPostId=req.params.postId;
  Post.findOne({_id:requestedPostId},function(err,post){
    if(!err){
    res.render("post",{title:post.title,content:post.content});
}
  })
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
