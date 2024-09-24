import app from "./app.js";
import { PORT } from "./constants/base"

app.listen(PORT, () => {
    console.log(`App listenin on port ${PORT}`)
})