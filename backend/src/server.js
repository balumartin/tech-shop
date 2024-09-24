import app from "./app";
import { PORT } from "./constants/base.js"

app.listen(PORT, () => {
    console.log(`App listenin on port ${PORT}`)
})