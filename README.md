## Synopsis

This is a full-stack project aimed at tracking and analyzing home expenses.

## Tech Stack

Frontend: Angular

Backend: Spring Boot and Gradle

Database: PostgreSQL

Frontend Testing: Jasmine

Backend Testing: JUnit 5

Deployment: Docker and Google Kubernetes Engine

Auth: OAuth 2.0

## API Definition

|HTTP Method  |Url  |Action  |
|---|---|---|
|POST  |/api/accounts/{email}/books  |Add a new book  |
|POST  |/api/accounts/{email}/books/{bookId}/items  |Add a new item to a book  |
|GET  |/api/accounts/{email}/books|List all books  |
|GET  |/api/accounts/{email}/books/{bookId}  |Retrieve a book by {bookId}  |
|GET  |/api/accounts/{email}/books/{bookId}/items?{query=target}  |List all items of a book with a query selector  |
|PUT  |/api/accounts/{email}/books/{bookId}  |Update a book by {bookId}  |
|PUT  |/api/accounts/{email}/items/{itemId}  |Update an item by {itemId}  |
|DELETE  |/api/accounts/{email}/books/{bookId}  |Delete a book (and its items) by {bookId}  |
|DELETE  |/api/accounts/{email}/items/{itemId}  |Delete an item by {itemId}  |

## Entities

Provide code examples and explanations of how to get the project.


## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

A short snippet describing the license (MIT, Apache, etc.)
