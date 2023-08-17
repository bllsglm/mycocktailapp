import express, { response } from "express";
import bodyparser from "body-parser";
import axios from "axios";
import { sentences } from "./mySentences.js";


const port = 3000;
const app = express();

app.set("views" ,"/home/billsglm/Desktop/Web development BootCamp/Backend/TheCocktail/view")

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


const API_Random = "http://www.thecocktaildb.com/api/json/v1/1/random.php"

app.get("/random", async(req,res)=>{
    try {
        const response = await axios.get(API_Random);
        const uniqueSentences = Array.from(new Set(sentences))
        const number = Math.floor(Math.random()*(uniqueSentences.length))
        const bartender = uniqueSentences[number];
        const datas = response.data.drinks;
        res.render("random.ejs", {datas: datas, bartender: bartender})
        
    } catch (error) {
        // console.log(error);
        res.status(404).send("Error", error.message);
        
    }
})  

var asd ="Pornstar"
const API_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${asd}`
app.get("/", async(req, res)=>{
    try {
        const response = await axios.get(API_URL);
        
        const datas = response.data.drinks;
    
        const bartender = sentences[Math.floor(Math.random()*(sentences.length))]
        // console.log(response.data.drinks[0])
        res.render("index.ejs", {datas :datas,bartender: bartender } );
        
        } catch (error) {
        //  console.log(error)
         res.status(404).send("Error", error.message)
        }
})



app.post("/", async(req, res)=>{
    try {
        var userInput = req.body.userInput;
        const API_URL1 = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userInput}`
        const response = await axios.post(API_URL1);
        console.log("--------------->", response.data.drinks, "<-----------------------------------------------------------------")
        const datas = response.data.drinks;
    
        const bartender = sentences[Math.floor(Math.random()*(sentences.length))];
        res.render("index.ejs", {datas :datas, bartender: bartender } );
        
        } catch (error) {
        //  console.log(error)
         res.status(404).send("Error", error.message)
        }
})



app.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
})

