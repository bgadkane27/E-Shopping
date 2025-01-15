

const createOrder = async(req,res)=>{
    try{

    }catch(e){
        res.status(500).json({
            sucess: false,
            message: "Failed to create order."
        })
    }
}