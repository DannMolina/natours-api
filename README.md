**What is a REST API?**

-   A REST API (also known as RESTful API) is an application programming interface (API or web API) that conforms to the constraints of REST architectural style and allows for interaction with RESTful web services. REST stands for representational state transfer and was created by computer scientist Roy Fielding.

**What's an API?**

-   An API is a set of definitions and protocols for building and integrating application software. It’s sometimes referred to as a contract between an information provider and an information user—establishing the content required from the consumer (the call) and the content required by the producer (the response). For example, the API design for a weather service could specify that the user supply a zip code and that the producer reply with a 2-part answer, the first being the high temperature, and the second being the low.

-   In other words, if you want to interact with a computer or system to retrieve information or perform a function, an API helps you communicate what you want to that system so it can understand and fulfill the request.

-   You can think of an API as a mediator between the users or clients and the resources or web services they want to get. It’s also a way for an organization to share resources and information while maintaining security, control, and authentication—determining who gets access to what.

-   Another advantage of an API is that you don’t have to know the specifics of caching—how your resource is retrieved or where it comes from.

**REST**

-   REST is a set of architectural constraints, not a protocol or a standard. API developers can implement REST in a variety of ways.
-   When a client request is made via a RESTful API, it transfers a representation of the state of the resource to the requester or endpoint. This information, or representation, is delivered in one of several formats via HTTP: JSON (Javascript Object Notation), HTML, XLT, Python, PHP, or plain text. JSON is the most generally popular file format to use because, despite its name, it’s language-agnostic, as well as readable by both humans and machines.
-   Something else to keep in mind: Headers and parameters are also important in the HTTP methods of a RESTful API HTTP request, as they contain important identifier information as to the request's metadata, authorization, uniform resource identifier (URI), caching, cookies, and more. There are request headers and response headers, each with their own HTTP connection information and status codes.

_In order for an API to be considered RESTful, it has to conform to these criteria:_

-   A client-server architecture made up of clients, servers, and resources, with requests managed through HTTP.
-   Stateless client-server communication, meaning no client information is stored between get requests and each request is separate and unconnected.
-   Cacheable data that streamlines client-server interactions.
-   A uniform interface between components so that information is transferred in a standard form. This requires that:
    -   resources requested are identifiable and separate from the representations sent to the client.
    -   resources can be manipulated by the client via the representation they receive because the representation contains enough information to do so.
    -   self-descriptive messages returned to the client have enough information to describe how the client should process it.
    -   hypertext/hypermedia is available, meaning that after accessing a resource the client should be able to use hyperlinks to find all other currently available actions they can take.
-   A layered system that organizes each type of server (those responsible for security, load-balancing, etc.) involved the retrieval of requested information into hierarchies, invisible to the client.
-   Code-on-demand (optional): the ability to send executable code from the server to the client when requested, extending client functionality.

Though the REST API has these criteria to conform to, it is still considered easier to use than a prescribed protocol like SOAP (Simple Object Access Protocol), which has specific requirements like XML messaging, and built-in security and transaction compliance that make it slower and heavier.

In contrast, REST is a set of guidelines that can be implemented as needed, making REST APIs faster and more lightweight, with increased scalablity—perfect for Internet of Things (IoT) and mobile app development.

**Rest Architecture**

_Principles of REST APIs_

-   Separate API into logical **resources**
    -   Resource: Object or representation of something, which has data associated to it.
        Any information that can be named can be a resource.
        note: is just has to be a name or noun not a verb, should be plural
        e.g. tours - users - reviews
-   Exposed structured, **resource-based URL's**
    -   Endpoints: should contain only **resources(nouns)**, and use HTTP methods for actions.
        https:natours.com/tours -> URL
        /tours -> ENDPOINT
        key: API endpoints = /tours - /users - /reviews
        Common HTTP methods e.g. tours is the resource
        -   POST: /tours - create
        -   GET: /tours/<id> - read
            For updates, but can use POST instead
        -   PUT: the client supposed to send the entire updated object.
        -   PATCH: it is supposed to send only the part of the object that has been changed.
        -   DELETE: /tours/<id> - delete resource but must be authenticated to perform the action.
-   Use **HTPP methods(verb)**
    -   perform different action on the data like reading or creating,
        deleting data, the API should use the right HTTP methods and not the URL or endpoint as a method.
-   Send data as **JSON**
    -   JSON is a very lightweight data interchange format which is heavily used by web APIs coded in any programming language
    -   the data we send back to client or that we received from the client
        should usually use the JSON data format, where some formatting standard applied to it.
        additionals:
    -   Jsend: simple response formatting. Consist of status and data
        ````
         e.g.
        normal object:
        {
            "id": "5",
            "rating": "4.9" ,
            "guides": [
                {
                    "name": "Dann"
                    "role": "Lead Guide"
                },
                {
                    "name": "Lisa"
                    "role": "Tour Guide"
                }
            ]
        }
        Jsend:
        {
            "status": "success",
            "data": {
                "id": "5",
                "rating": "4.9" ,
                "guides": [
                    {
                        "name": "Dann"
                        "role": "Lead Guide"
                    },
                    {
                        "name": "Lisa"
                        "role": "Tour Guide"
                    }
                ]
            }```
        }
        ````
-   Send data as **stateless**

    -   State: simply refers to a piece of data in the application that might change over time.
        e.g. of state:
        loggedIn: whether a use is logged in or
        currentPage: on a page with a list of several pages what the current pages is.

        bad practice: GET /tours/nextPage = server needs to know the currentPage before proceeding to next page

        -   send(nextPage)

        good practice: GET /tours/page/6 = request a page from client base on parameter

        -   send(6)

    -   All state is handled on the client. This means that each request must contain all the information
        necessary to process a certain request.
        The server should not have to remember the previous request.
        notes:
    -   the state should be handled on client means that each request must contain all the information that is necessary
        to process a certain request on the server.
        So the server should never ever have to remember the previous request in order to process the current request

**Middleware and Request-Response Cycle**

Visual: Incoming request(req and res onject) ---> RESPONSE

-   To start Express app receives a request when someone hits a server for which it will then create a request and response object.
    That data whill then be used and processed in order to generate and send back a meaningful response.

Visual:
Incoming request(req and res onject) --// middleware ... next():e.g parsing body--// middleware ... next():e.g logging-- middleware ... next():e.g setting headers--// middleware ... res.send():e.g router--> RESPONSE

-   In order to processed that data, in Express we use something called _middleware_ which can manipulate the request or the response object or really execute any other code that we like.
    -   middleware doesn't always have to be just about the request or the response object, but it usually is mostly about the request.
    -   sample middleware Express dot JSON: to get access to the request body on the request object.
    -   it's called middleware because it's a function that is executed between, so in the middle of receiving the request and sending the response.
    -   And we can say that in Express _everything is middleware_ even our route definitions.
        -   So even when we defined our routes, we can think of the route handler functions as middleware functions.
        -   They are simply middleware functions that are only executed for certain routes.
    -   Express dot JSON as middleware which is also called as body-parser.
    -   All the middleware together that we use in our app, is called the middleware stack.
        -   Important note: the order of middleware in the stack is actually defined by the order they are defined in the code.
        -   So the middleware that appears first in the code, is executed before one that appears later.
            -   the order of the code matters a lot in Express.

In general:

-   The initial request and response object go through each middleware step by step.
-   and you can think of this whole process as kind of a pipeline where our data go through, so just like it's been piped from request to final response and like this we then finish the so-called **request-response** cycle.
-   So the request-response cycle is really everything that starts with the incoming request, then executing all the middleware in the middleware stack step by step and finally sending the response to finish the cycle.
