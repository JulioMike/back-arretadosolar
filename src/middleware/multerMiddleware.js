
const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/projects')
        },
        filename: function (req, file, cb) {
            const extensaoArquivo = file.originalname.split('.')[1];
    
            const novoNomeArquivo = require('crypto').randomBytes(64).toString('hex');
    
            cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
        },
    }),
    filefilter: (req, file, cb) => {
        const extensao = [ 'image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito === file.mimitype);

        if(extensao){
            return cb(null, true);
        }

        return cb(null, false);
    }
}))