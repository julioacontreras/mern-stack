const cloudinary = require('cloudinary').v2;

module.exports = (app) => {
  cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_NAME, 
      api_key: process.env.CLOUDINARY_API_KEY, 
      api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
      secure: true
    });
  app.cloudinary = {}
  app.cloudinary.instance = cloudinary
  app.cloudinary.upload = (fileStr, options) => {
    return new Promise(resolve => {
      try {
        app.cloudinary.instance.uploader.upload(
          fileStr,
          options, 
          (error, result) => {
            resolve({ error, result })
          });  
      } catch (error) {
        resolve({ error })
      }  
    })
  }
}


