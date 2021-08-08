const mongoose=require("mongoose")

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log("Mongoose connection successful!!")
    })
    .catch((err) => {
        console.log(`Error: ${err.message}`)
    });
