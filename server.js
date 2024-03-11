const express = require("express");
const app=express();

const cors=require("cors");

const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create a todo
app.post("/todos",async(req,res)=>{
    try{
        const{description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
        );

        res.json(newTodo.rows[0]);

    }catch(err){
        console.log(err.messages);
    }
});

//get all data
app.get("/todos",async(req,res)=>{
try {
    
    const alltodos = await pool.query("SELECT * FROM todo");

    res.json(alltodos.rows);

} catch (error) {
    console.log(error.messages);
}
});

//get a todo

app.get("/todos/:id", async (req,res)=>{
    try {
        
        const id= req.params.id;
        const getbyid= await pool.query("SELECT * FROM todo WHERE todo_id= $1",[id]);

        res.json(getbyid.rows[0]);

    } catch (error) {
        console.log(error.messages);
    }
});
//update a todo

app.put("/todos/:id", async(req,res)=>{
    try {
        
        const {id}=req.params;
        const {description}=req.body;
        const updatetodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id=$2",
        [description,id]
        );
        res.json("To do list update");
    } catch (error) {
        console.log(error.messages);
    }
});
//delete a todo
app.delete("/todos/:id", async(req,res)=>{
    try {
        const {id}=req.params;
        const deletetodo= await pool.query("DELETE FROM todo WHERE todo_id = $1",
        [id]
        );
        res.json(`to do list deleted of id ${id}`);
    } catch (error) {
        console.log(error.messages);        
    }
})

app.listen(5000,()=>{
    console.log("server has started on port: 5000");
});