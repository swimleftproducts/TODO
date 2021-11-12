

const keys = require('dotenv').config()

const AWS = require('aws-sdk')
const S3AccessKey= process.env.S3AccessKey
const S3SecretAccessKey=process.env.S3SecretAccessKey

const s3 = new AWS.S3({
    accessKeyId: S3AccessKey,
    secretAccessKey:S3SecretAccessKey,
    signatureVersion: 'v4',
    region:'us-west-2'
})


module.exports={
 s3
}