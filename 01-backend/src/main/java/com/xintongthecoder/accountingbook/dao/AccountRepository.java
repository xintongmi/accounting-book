package com.xintongthecoder.accountingbook.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.xintongthecoder.accountingbook.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
    
}
