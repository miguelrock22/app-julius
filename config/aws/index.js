const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
});

const uploadFile = (file,handle) => {
    const l = fs.readFile(file.path, (err, data) => {
        if (err) throw err;
        const date = new Date();
        console
        const params = {
            Bucket: 'julis-test-node/public',
            Key: `${date.getTime()}_${file.name}`,
            Body: data,
            ContentType: file.type,
            ACL: "public-read"
        };
        return s3.upload(params, handle);
    });
}

module.exports = {
    uploadFile
};