
import { createPool } from 'mysql2/promise';

// Create the connection pool. The pool-specific settings are the defaults
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'empresa',
    port:'3306',
    
});