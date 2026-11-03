import "dotenv/config";
import app from "./src/app";
import { connectDB } from "./src/db/db";



const PORT = 3000;
connectDB().then(() =>
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
);