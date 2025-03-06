// configuring and exporting all the environment variables from a single file
// no need to configure it repeatedly in separate projects. Just import it from here and use

import dotenv from 'dotenv';
dotenv.config({
    path : "../../.env"
})

export const DB_URL = process.env.DB_URL;
export const JWT_SECRET = process.env.JWT_SECRET
