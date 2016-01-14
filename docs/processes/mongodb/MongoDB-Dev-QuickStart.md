## MongoDB Server

MongoDB is only used in as much to provide a real database to develop UI CRUD operations. No security or permissions
are provided by default. 

MongoDB is not used by default. If you want to enable MongoDB, follow these [install](docs/mongodb/Install-MongoDB-On-El-Capitan.md) 
instructions.


 If not configuring mongodb.plist from the aboe instructions, In one Terminal, start the mongo server
 
 ```bash
 
    $ mongod
 ```
 
 In another Terminal, start the mongo shell
 
 ```bash
 
    $ mongo
 ```
 
 In the examples app, the database "beers" is used. In the mongo shell, create the "beers" databas:
 
 ```bash
 
    > use beers
   
 ```
 
 Responds "switched to db beers". Now create a beers collection
 
 ```bash
 
    > db.createCollection('beers')
 
 ```
 
 Responds "{ "ok" : 1 }"