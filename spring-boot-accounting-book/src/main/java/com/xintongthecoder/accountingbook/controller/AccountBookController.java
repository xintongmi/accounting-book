package com.xintongthecoder.accountingbook.controller;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.xintongthecoder.accountingbook.dao.AccountBookRepository;
import com.xintongthecoder.accountingbook.entity.AccountBook;
import com.xintongthecoder.accountingbook.errorHandler.AccountBookNotFoundException;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/books")
public class AccountBookController {

        private final AccountBookRepository accountBookRepository;

        public AccountBookController(AccountBookRepository accountBookRepository) {
                this.accountBookRepository = accountBookRepository;
        }

        @GetMapping(value = "/{id}", produces = {"application/hal+json"})
        public EntityModel<AccountBook> one(@PathVariable Long id) {
                AccountBook book = accountBookRepository.findById(id)
                                .orElseThrow(() -> new AccountBookNotFoundException(id));
                return EntityModel.of(book,
                                linkTo(methodOn(AccountBookController.class).one(id)).withSelfRel(),
                                linkTo(methodOn(AccountBookController.class).all())
                                                .withRel("books"));
        }

        @GetMapping(value = "", produces = {"application/hal+json"})
        public CollectionModel<EntityModel<AccountBook>> all() {
                List<EntityModel<AccountBook>> books = accountBookRepository.findAll().stream()
                                .map(book -> EntityModel.of(book,
                                                linkTo(methodOn(AccountBookController.class)
                                                                .one(book.getId())).withSelfRel(),
                                                linkTo(methodOn(AccountBookController.class).all())
                                                                .withRel("books")))
                                .collect(Collectors.toList());
                return CollectionModel.of(books,
                                linkTo(methodOn(AccountBookController.class).all()).withSelfRel());
        }

}
