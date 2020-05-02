/**
 * @param  {string}  base64 Data
 * @return {string}  Promise Image url
 */
const imageUpload = (base64) => {
    console.log("UPLOADING")
    const AWS = require('aws-sdk');
    const S3_BUCKET = 'mockupcatwalk'

    // Configure AWS with your access and secret key.
    AWS.config.loadFromPath("src/config/s3_config.json")
    
    // Create an s3 instance
    const s3 = new AWS.S3({ params: { Bucket: S3_BUCKET } });

    //Remove header from file
    const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    // Getting the file type, ie: jpeg, png or gif
    const type = base64.split(';')[0].split('/')[1];
    //console.log(`image/${type}`)

    var data = {
        Key: `${Date.now()}.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`,
    }

    return new Promise((resolve, reject) => {
        s3.upload(data, function (err, data) {
            if (err) {
                console.log(err);
                return reject('Error uploading data: ', data)
            }
            console.log('succesfully uploaded the image!');
            console.log(data.Location)
            return resolve(data.Location)
        })
    })

}

const deleteItems = (lista) => {
    console.log("DELETING")
    const AWS = require('aws-sdk');
    const S3_BUCKET = 'mockupcatwalk'
    var deletable = false
    // Configure AWS with your access and secret key.
    AWS.config.loadFromPath("src/config/s3_config.json")
    
    // Create an s3 instance
    const s3 = new AWS.S3({ params: { Bucket: S3_BUCKET } });

    const key_list = []
    //location.replace(/^http.*\//, "")
    for(let index in lista){
        if(lista[index].length >0){
            key_list.push({"Key": lista[index].replace(/^http.*\//, "")})
            deletable=true
        }
    }
    return new Promise((resolve, reject) => { 
        if(deletable){
            var params = {
                Bucket: S3_BUCKET, 
                Delete: {
                Objects: key_list, 
                Quiet: false
                }
                };

            s3.deleteObjects(params, function(err, data) {
                if (err){
                    console.log(err, err.stack); // an error occurred
                    reject(err, err.stack)
                }   
                console.log(data)        
                resolve(data)
            }); 
        }
    })
    
}

module.exports = {imageUpload, deleteItems};