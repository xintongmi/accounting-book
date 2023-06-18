## Design Doc

[Accounting Book Design Doc](https://docs.google.com/document/d/1_9h_D7Xz8lVjI5VXVwvWmkhmUylFtJl3J_u8nBFuCyU/edit?usp=sharing)

## Synopsis

This is a full-stack project aimed at tracking and analyzing home expenses

## Tech Stack

- Frontend: Angular

- Backend: Spring Boot and Gradle

- Database: PostgreSQL

- Frontend Testing: Jasmine

- Backend Testing: JUnit 5

- Deployment: Docker and Google Kubernetes Engine

- Auth: OAuth 2.0

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

### Account

    public class Account {
        @Id @GeneratedValue(...) 
        private Long id;
        
        @Column(unique = true) 
        private String email;
        
        @OneToMany(...) 
        private List<AccountBook> accountBooks;
    }

### AccountBook

    public class AccountBook {
        @Id @GeneratedValue(...)
        private Long id; 
        private String name;
        
        @OneToMany(...) 
        private List<SpendingItem> spendingItems;
        
        @ManyToOne(...)        
        @JoinColumn(...)       
        private Account account;
    }


### SpendingItem

    public class SpendingItem {
        @Id @GeneratedValue(...)
        private Long id;
        private Category category;
        private String description;
        private String merchant;
        private Date date;
        private float amount;
        
        @ManyToOne(...)
        @JoinColumn(...)
        private AccountBook book;
    }

## Tests

The testing focus will be primarily on the web layer, ensuring comprehensive coverage of the following areas:

1. HTTP request parsing - the appropriate handlers are accessed and parameters are accurately parsed.
2. Responses are properly formatted in compliance with HATEOAS principles.

It's important to note that database operations, which are managed by JPA and devoid of customization logic, will not be included in the test coverage. Instead, Mokito will be utilized to mock all database queries. Additionally, security and authentication will be disabled during testing.

## Contributor

Xintong Mi

## License

Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/
