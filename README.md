## Design Doc

[Accounting Book Design Doc](https://docs.google.com/document/d/1_9h_D7Xz8lVjI5VXVwvWmkhmUylFtJl3J_u8nBFuCyU/edit?usp=sharing)

## Synopsis

This is a full-stack project aimed at tracking and analyzing home expenses

## Tech Stack

[![Angular](https://img.shields.io/badge/Angular-DD0031.svg?style=for-the-badge&logo=Angular&logoColor=white)](https://angular.io/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F.svg?style=for-the-badge&logo=Spring-Boot&logoColor=white)](https://spring.io/)
[![Gradle](https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white)](https://gradle.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white)](https://www.postgresql.org/)
[![Jasmine](https://img.shields.io/badge/Jasmine-8A4182.svg?style=for-the-badge&logo=Jasmine&logoColor=white)](https://jasmine.github.io/)
[![JUnit5](https://img.shields.io/badge/JUnit5-25A162.svg?style=for-the-badge&logo=JUnit5&logoColor=white)](https://junit.org/junit5/)
[![Docker](https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5.svg?style=for-the-badge&logo=Kubernetes&logoColor=white)](https://kubernetes.io/)
[![Jenkins](https://img.shields.io/badge/Jenkins-D24939.svg?style=for-the-badge&logo=Jenkins&logoColor=white)](https://www.jenkins.io/)

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
        @Id
        @GeneratedValue(...) 
        private Long id;
        
        @Column(unique = true) 
        private String email;
        
        @OneToMany(...) 
        private List<AccountBook> accountBooks;
    }

### AccountBook

    public class AccountBook {
        @Id
        @GeneratedValue(...)
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
        @Id
        @GeneratedValue(...)
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
