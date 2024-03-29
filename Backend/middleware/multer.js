const multer = require('multer');

function getDestination(destinations) {
  return function(req, file, cb) {
    const destination = destinations[file.mimetype] || destinations['default'];
    cb(null, destination);
  };
}

// Define destination directories based on MIME type
const destinations = {
  'image/png': 'uploads/image/',
  'image/jpeg': 'uploads/image/',
  'image/jpg': 'uploads/image/',
  'application/pdf': 'uploads/pdf/',
  'text/csv': 'uploads/excel/',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'uploads/excel/',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'uploads/word/',
  'default': 'uploads/misc/'
};

// Define storage configuration with the destination determined dynamically
const storage = multer.diskStorage({
  destination: getDestination(destinations),
  filename: function(req, file, cb) {
    // const userId = req.userId
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

const upload = multer({storage: storage});

module.exports = upload;