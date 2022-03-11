module.exports={
    projectAll: async (req, res) =>{
        res.status(200).json({msg:"Hellooo Project"})
    },
    projectNew: async (req, res) =>{
        res.status(200).json({msg:"Envio do projeto"})
    }
};