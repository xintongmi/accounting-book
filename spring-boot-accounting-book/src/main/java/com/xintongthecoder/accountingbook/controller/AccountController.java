package com.xintongthecoder.accountingbook.controller;

import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.xintongthecoder.accountingbook.dao.AccountRepository;
import com.xintongthecoder.accountingbook.entity.Account;
import com.xintongthecoder.accountingbook.modelAssembler.AccountModelAssembler;

@RestController
@RequestMapping("api")
public class AccountController {

    private final AccountRepository accountRepository;
    private final AccountModelAssembler accountAssembler;

    public AccountController(AccountRepository accountRepository,
            AccountModelAssembler accountAssembler) {
        this.accountRepository = accountRepository;
        this.accountAssembler = accountAssembler;
    }

    @GetMapping(value = "/accounts/{email}")
    public ResponseEntity<EntityModel<Account>> one(@PathVariable(value = "email") String email) {
        Account account = accountRepository.findByEmail(email);
        return ResponseEntity.ok().body(accountAssembler.toModel(account));
    }
}
