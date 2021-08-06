const aws = require("aws-sdk");
const multer = require('multer');
const multerS3 = require('multer-s3')

const s3 = new aws.S3({
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
})

const upload = (bucketName) =>
    multer({
        storage: multerS3({
            s3,
            bucket: bucketName,
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, `image-${Date.now()}.jpeg`);
            },
        }),
    });



exports.setProfilePic = (req, res, next) => {
    const uploadSingle = upload("profile-picture-upload-test").single(
        "croppedImage"
    );

    uploadSingle(req, res, async (err) => {
        if (err)
            return res.status(400).json({ success: false, message: err.message });

        console.log(req.file)

        res.status(200).json({ data: req.file.location });
    })
}
