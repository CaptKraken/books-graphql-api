// import Cors from "cors";

// // Initializing the cors middleware
// const cors = Cors({
//   methods: ["GET", "HEAD"],
// });

// // Helper method to wait for a middleware to execute before continuing
// // And to throw an error when an error happens in a middleware
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }

//       return resolve(result);
//     });
//   });
// }

import middleware from "middleware/middleware";
import nextConnect from "next-connect";
import cloudinary from "cloudinary";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  //   console.log(req);
  console.log(req.files.file[0]);
  cloudinary.v2.uploader.upload(req.files.file[0]);
  //   res.send({ file: req.files.file[0].path });
  res.status(200).send({ file: new File(req.files.file[0]) });

  //...
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
// async function handler(req, res) {
//   // Run the middleware
//   await runMiddleware(req, res, cors);
//   if (req.method === "POST") {
//     if (!req.files) {
//       res.send({ status: false, mesage: "No file uploaded" });
//     }
//     console.log(req);
//     // Process a POST request
//   } else {
//     res.send({ data: "hi" });
//   }

//   // Rest of the API logic
// }

// export default handler;
