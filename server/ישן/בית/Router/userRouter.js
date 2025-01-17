const { Router } = require('express');//ייבוא הראוטר ממודול אקספרס
const userRouter = new Router();//יצירת מופע ממחלקת הראוטר

const { promiseQuery } = require("../sql")//ייבוא של אובייקט שיודע לשלוח שאילתה

//post: body  פונקציה שמקבלת אובייקט מה
userRouter.post("/login",async (req,res)=>{
    
    const details=req.body;//הכנסת האובייקט למשתנה מה body
    console.log("details")
    console.log(details)
    let query;
    if(details.email)
     query=`SELECT *  FROM nadlan.user where Mail='${details.email}'`;//שולף שורות של משימות
     else
     query=`SELECT *  FROM nadlan.user where Tz='${details.tz}'`;
    const rows=await promiseQuery(query);
    if(rows.length==0)
    res.send({mass:"שם משתמש או סיסמה שגויים",user:null});
    else
    res.send({mass:"התחברת בהצלחה",user:rows[0]});
})

//get- רק מקבל מהשרת בלי לקבל נתונים מהטופס
userRouter.get("/getAllUsers",async (req, res) => {
    const queryString = `SELECT * FROM nadlan.user`;
    const rows = await promiseQuery(queryString);
    res.send(rows);
})

userRouter.post("/addUser",async (req,res)=>{ 
    const user=req.body;
    console.log(user)
    const query=`INSERT INTO nadlan.user VALUES(0,'${user.Id}','${user.Name}',0,0,'${user.Phone}','${user.Mail}',2,true)`;
    const result=await promiseQuery(query);
  //  const query2=`SELECT id FROM tasks.users WHERE tasks.email='${task.email}'`
  //  const result2=await promiseQuery(query2);
  //  res.send(result2);
    res.send(result);
})



userRouter.put("/updateUser",async (req,res)=>{
    // const user=req.params.user;
     const user=req.body;
    console.log(user) 
    const query=`UPDATE nadlan.user
                 SET Tz='${user.tz}', Name='${user.name}', Mail='${user.email}', Phone='${user.phone}'
                 WHERE Mail='${user.email}'
                 `;
    const result=await promiseQuery(query);
    res.send(result);
})



userRouter.delete("/deleteUser/:id",async(req,res)=>{
    const id=req.params.id;
    const query=`DELETE FROM nadlan.user WHERE id=${id}`;
    const result=await promiseQuery(query);
    res.send(result);
})
module.exports = userRouter;//ייצוא המופע