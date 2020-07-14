const auth = async (req,res,next)=>{
    try{
        if(req.body.password !== process.env.PASSWORD){
            throw new Error();
        }
        next();
    }catch(e){
        res.status(401).send({error:"Please Authenticate."});
    }
};

module.exports = auth;