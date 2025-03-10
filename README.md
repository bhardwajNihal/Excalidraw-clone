
# Creating a Excalidraw type app
- where users can draw shapes and figures, write
- Can collaborate with peers, sharing the canvas (using websockets)

- using pnpm - better package manager than npm - faster, prevents duplicate node modules


# Setup
1. npm install -g pnpm
2. npx create-turbo@latest
3. remove apps/docs folder

4. add http, ws backend folder inside the apps 
    - add package.json in both the folder by - pnpm init
    - add tsconfig.json and extend it to the base tsconfig.json from packages folder instead of copy   
      pasting the whole boiler plate to avoid code duplication, also not - npx tsc --init.
    - add "@repo/typescript-config": "workspace:*" (in case of pnpm,  for npm just add "*") as dependency in the package.json of both, and >> pnpm install in the 
      root folder.
    - in the ws, http backend > in tsconfig.json > add compilerOptions rootdir and outdir
    - Then add the build, dev, and start script to both.
    - add src/index.ts to both the backends

5. In http backend - install express and @types/express  
    - initialize a simple express instance
6. in ws backend - install ws library 
    - initialize a simple ws instance

7. initialized the http routes for signup, signin and room-creation. 
  - Authmiddlware using jwt.
  - jsonwebtoken for authentication as of now. (cookies becomes complex, currently just focusing on workflow, logics and building muscle memory for building projects using monorepo)

  # Defining common modules:
    - in packages/common-configs.
    - configuring env variables, db connection function, auth middleware, etc. >> in one place, exporting them to reuse accross different app.
    - export them from src/index.ts
    - configure tsconfig and package.json - add scripts, dependencies, and root and outdir.

    - add the common package as the dependency in the app using it.
    - run pnpm install in that app directory
    - import in the file and use, 
    - import from dist, once the build is done

  
8. Adding Db package
  - will store the schemas and models for the database
    i. initialize an empty package.json >> add common tsconfig as devdependency
    ii. initialize tsconfig.json >> extend it the common tsconfig >> pnpm install
    iii. install prisma
    iv. add db url to the .env
    iv. define models >> migrate(npx prisma migrate --name init_schema) >> npx prisma generate -> to generate client.
    v. export prisma client from scr/index.ts
    vi. in package.json add exports 

9. Signup, Signin route completed in the http-backend. Tested using postman
10. Done with the create-room endpoint >> creates a room with the assigned name, assign it adminId

11. Added Token validation in ws layer
  - Token can't be passed in headers, so taken a different approach
  - modified the route to contain token a query parameter - later extracted it using URLSearchParams
  - extracted token >> later verified it >> if failed - ws.close()

12. Chat logic in the ws endpoint
  - will take the simple in memory approach for state management.(state management libraries will make the codebase complex)
  - store the joined user data in a global variable.
  - on each request - check for the types -> add logic
  - test the endpoints 

  ✅Done with the Ws layer - join, leave and chat logic