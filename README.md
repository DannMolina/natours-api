Rest Architecture

Principles of REST APIs

- Separate API into logical **resources**
  - Resource: Object or representation of something, which has data associated to it.
    Any information that can be named can be a resource.
    note: is just has to be a name or noun not a verb, should be plural
    e.g. tours - users - reviews
- Exposed structured, **resource-based URL's**
  - Endpoints: should contain only **resources(nouns)**, and use HTTP methods for actions.
    https:natours.com/tours -> URL
    /tours -> ENDPOINT
    key: API endpoints = /tours - /users - /reviews
    Common HTTP methods e.g. tours is the resource
    - POST: /tours - create
    - GET: /tours/<id> - read
      For updates, but can use POST instead
    - PUT: the client supposed to send the entire updated object.
    - PATCH: it is supposed to send only the part of the object that has been changed.
    - DELETE: /tours/<id> - delete resource but must be authenticated to perform the action.
- Use **HTPP methods(verb)**
  - perform different action on the data like reading or creating,
    deleting data, the API should use the right HTTP methods and not the URL.
- Send data as **JSON**
  - JSON is a very lightweight data interchange format which is heavily used by web APIs coded in any programming language
  - the data we send back to client or that we received from the client
    should usually use the JSON data format, where some formatting standard applied to it.
    additionals:
  - Jsend: simple response formatting. Consist of status and data
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
- Send data as **stateless**
  - State: simply refers to a piece of data in the application that might change over time.
    e.g. of state:
    loggedIn: whether a use is logged in or
    currentPage: on a page with a list of several pages what the current pages is.
  - All state is handled on the client. This means that each request must contain all the information
    necessary to process a certain request.
    The server should not have to remember the previous request.
    notes:
  - the state should be handled on client means that each request must contain all the information that is necessary
    to process a certain request on the server.
    So the server should never ever have to remember the previous request in order to process the current request
