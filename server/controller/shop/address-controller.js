const Address = require("../../models/Address");

const addAddress = async(req,res)=>{
    try{
        const {userId, phone, address, landmark ,city, pincode, notes} = req.body
        if(!userId || !phone || !address || !city || !pincode){
            return res.status(400).json({
                sucess: false,
                message: "All fields are required."
            })
        }

        const newAddress = new Address({userId, phone, address, landmark, city, pincode, notes})
        await newAddress.save();
        res.status(201).json({
            sucess: true,
            data: newAddress,
            message: "Address added successfully."
        })

    }catch(e){
        console.log(e);
        res.json({ sucess: false, message: "Add address failed." });
    }
}
const getAllAddress = async(req,res)=>{
    try{
        const {userId} = req.params;
        if(!userId){
            return res.status(400).json({
                sucess: false,
                message: "User id is required."
            })
        }

        const addressList = await Address.find({userId});
        res.status(200).json({
            sucess: true,
            data: addressList,
            message: "Address fetched successfully."
        })

    }catch(e){
        console.log(e);
        res.json({ sucess: false, message: "Fetch address failed." });
    }
}

const editAddress = async(req,res)=>{
    try{
        const {userId, addressId} = req.params;
        const formData = req.body

        if(!userId || !addressId){
            return res.status(400).json({
                sucess: false,
                message: "User and address id are required."
            })
        }

        const address = await Address.findOneAndUpdate({
            _id: addressId,
            userId
        },
        formData,
        {new: true}
        )
        if(!address){
            return res.status(404).json({
                sucess: false,
                message: "Address not found."
            })
        }
        res.status(200).json(
            {
                sucess: true,
                data: address,
                message: "Address edited successfully."
            }
    );

    }catch(e){
        console.log(e);
        res.json({ sucess: false, message: "Edit address failed." });
    }
}

const deleteAddress = async(req,res)=>{
    try{
        const {userId, addressId} = req.params;

        if(!userId || !addressId){
            return res.status(400).json({
                sucess: false,
                message: "User and address id are required."
            })
        }

        const address = await Address.findOneAndDelete({
            _id: addressId,
            userId
        })
        if(!address){
            return res.status(404).json({
                sucess: false,
                message: "Address not found."
            })
        }
        res.status(200).json(
            {
                sucess: true,
                data: address,
                message: "Address deleted successfully."
            }
    );
    }catch(e){
        console.log(e);
        res.json({ sucess: false, message: "Delete address failed." });
    }
}

module.exports = {addAddress,getAllAddress,editAddress,deleteAddress}



