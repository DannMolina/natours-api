**mongoDB** - NoSQL database
**Collections** - refers as tables in SQL
**Documents** - refers as rows in SQL

**MONGODB**

-   is a document database with the scalability and flexibility that you want with the querying and indexing that you need.

**KEY MONGODB FEATURES**

-   Document based: MongoDB stores data in documents (field-value pair data structures like JSON, NoSQL);
-   Scalable: Very easy to distribute data across multiple machines as your users and amount of data grows;
-   Flexible: No document data schema required. so each document can have different number and type of fields;
-   Performant: Embedded data models. indexing, sharding, flexible documents, native duplication, etc.
-   Free and open-source, published under the SSPL License.

_Summary_

-   mongoDB is a great database system to build many types of modern, scalable and flexible web applications.
-   Mongo is probably the most used database with nodeJS.

DOCUMENT STRUCTURE

-   BSON: data format mongoDB uses for data storage. Like JSON, but typed. SO MongoDB documents are typed meaning that all values will have data type such as string, Boolean, date, integer, double, object or more.
-   Just like JSON, these BSON documents will also have fields and data is stored in key value pairs.
-   On the other hand, in a relational database, each field is called a column.
-   Another extremely important feature in mongoDB is the concept of embedded documents.
    which is something not present in _relational databases_.
    **sample**:
    -   blog post document: having an array of tags and comments instead of separating it into table just like in the relational database
        **Embedding/Denormalizing**
        -   Including related data into a single document. This allows for quicker access and easier data models(it's not always the best solution though).
    -   opposite of **denormalizing** document is **normalizing** and that's how the data is always modeled in **relational databases**. In that case, it's not possible to embed data, and the solution is to create a whole new table for the comments and then join the tables by referencing to the ID field of the comments table.
-   maximum size for each document is currently 16 MB, but this might increase in the future.
-   each document contains a unique ID which act as a primary key of the document. It's automatically generated with the object ID data type each time there is a new document so we don't have to worry about it.
