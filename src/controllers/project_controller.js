const {PythonShell} = require('python-shell');


module.exports={
    projectAll: async (req, res) =>{
        res.status(200).json({msg:"Hellooo Project"})
    },
    projectNew: async (req, res) =>{
        const image = req.file.path
        
        let options ={
            args:[image]
        }
        PythonShell.run('../app.py',options, async function (err, results) {
            
            console.log(results)
            res.status(200).send({msg:results})

            console.log('Python Finished')
        })
        
    }
};

