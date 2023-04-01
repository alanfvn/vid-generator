import "dotenv/config.js"
import { extractData } from "./reg_util.js"

let xd = extractData('2023-03-03_admin_de')
console.log(xd.getDate())
