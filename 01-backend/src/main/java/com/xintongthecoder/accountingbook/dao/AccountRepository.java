package com.xintongthecoder.accountingbook.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.xintongthecoder.accountingbook.entity.Account;

@CrossOrigin("http://localhost:4200")
public interface AccountRepository extends JpaRepository<Account, Long> {
    
}
