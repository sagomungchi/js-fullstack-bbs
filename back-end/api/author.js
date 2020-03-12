module.exports = (app, db) => {
    app.post("/account/signup", (req, res) => {
      db.author.create(
        {username : req.body.username, 
         password : req.body.password
        }).then((result) => res.json({success: true}))
    });
    
    app.post("/account/signin", (req, res) => {
      let body = req.body;
      console.log(req.body);
      db.author.findOne({
        where: { username: body.username } 
      }).then((result) => {
        let originPass = result.password;
        let inputPass  = body.password;

        if(originPass === inputPass){
          console.log("비밀번호 일치");
          let session = req.session;
          
          session.loginInfo = {
            _id: result._id,
            username: body.username
          };

          } else {
            console.log("비밀번호 불일치");
        }
        res.json({success:true})
      })
    });

    app.get( "/author/:id", (req, res) =>
      db.author.findByPk(req.params.id).then( (result) => res.json(result))
    );

    
}