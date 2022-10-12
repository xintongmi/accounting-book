package com.xintongthecoder.accountingbook.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.xintongthecoder.accountingbook.dao.AccountBookRepository;
import com.xintongthecoder.accountingbook.entity.Account;
import com.xintongthecoder.accountingbook.entity.AccountBook;
import com.xintongthecoder.accountingbook.errorHandler.AccountBookNotFoundException;
import com.xintongthecoder.accountingbook.modelAssembler.AccountBookModelAssembler;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/books")
public class AccountBookController {

        private final AccountBookRepository accountBookRepository;
        private final AccountBookModelAssembler accountBookModelAssembler;
        private final PagedResourcesAssembler<AccountBook> pagedResourcesAssembler;

        public AccountBookController(AccountBookRepository accountBookRepository,
                        AccountBookModelAssembler accountBookModelAssembler,
                        PagedResourcesAssembler<AccountBook> pagedResourcesAssembler) {
                this.accountBookRepository = accountBookRepository;
                this.accountBookModelAssembler = accountBookModelAssembler;
                this.pagedResourcesAssembler = pagedResourcesAssembler;
        }

        @GetMapping(value = "/{bookId}", produces = {"application/hal+json"})
        public ResponseEntity<PagedModel<EntityModel<AccountBook>>> one(@PathVariable Long bookId,
                        @RequestParam(value = "page", defaultValue = "0") int page,
                        @RequestParam(value = "size", defaultValue = "10") int size) {
                Page<AccountBook> pagedBook =
                                accountBookRepository.findById(bookId, PageRequest.of(page, size));
                return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON)
                                .body(pagedResourcesAssembler.toModel(pagedBook,
                                                accountBookModelAssembler));
        }

        @GetMapping(value = "", produces = {"application/hal+json"})
        public ResponseEntity<PagedModel<EntityModel<AccountBook>>> all(
                        @RequestParam(value = "page", defaultValue = "0") int page,
                        @RequestParam(value = "size", defaultValue = "10") int size) {
                Page<AccountBook> pagedBooks =
                                accountBookRepository.findAll(PageRequest.of(page, size));
                return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON)
                                .body(pagedResourcesAssembler.toModel(pagedBooks,
                                                accountBookModelAssembler));
        }

        @PostMapping(value = "", produces = {"application/hal+json"})
        public ResponseEntity<AccountBook> addBook(@RequestBody AccountBook bookFromRequest) {
                // TODO: Set accountId
                AccountBook newBook = this.accountBookRepository.save(bookFromRequest);
                return new ResponseEntity<>(newBook, HttpStatus.CREATED);
        }

        @PutMapping(value = "/{bookId}", produces = {"application/hal+json"})
        public ResponseEntity<AccountBook> editBook(@PathVariable("bookId") Long bookId,
                        @RequestBody AccountBook bookFromRequest) {
                if (accountBookRepository.getReferenceById(bookId) == null) {
                        throw new AccountBookNotFoundException(bookId);
                }
                bookFromRequest.setAccount(
                                accountBookRepository.getReferenceById(bookId).getAccount());
                AccountBook updatedBook = accountBookRepository.save(bookFromRequest);
                return new ResponseEntity<AccountBook>(updatedBook, HttpStatus.OK);
        }

        @DeleteMapping(value = "/{bookId}", produces = {"application/hal+json"})
        public ResponseEntity<HttpStatus> deleteBook(@PathVariable("bookId") Long bookId) {
                accountBookRepository.deleteById(bookId);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
}
