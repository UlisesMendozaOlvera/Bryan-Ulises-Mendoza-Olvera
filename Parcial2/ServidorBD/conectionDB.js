
import { createPool } from 'mysql'

export const pool = createPool({
    user:'root',
    password:'',
    database:'empresa',
    port:'3306'
})