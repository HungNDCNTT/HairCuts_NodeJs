const cloudinary = require('cloudinary');
const dotenv  =require('dotenv')
dotenv.config()
cloudinary.config({
    cloud_name: 'softss',
    api_key:'799882167926469',
    api_secret:'8ePPA1K2JqhQx9uNeKhu3_V3kkw'
})

exports.uploads = (file, folder)=>{
    return new  Promise(resolve => {
        cloudinary.uploader.upload(file, (result)=>{
            resolve({
                url: result.url,
                id:result.public_id
            })
        },{
            resource_type:"auto",
            folder: folder
        })
    })
}