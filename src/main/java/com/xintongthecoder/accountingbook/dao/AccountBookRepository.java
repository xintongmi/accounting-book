package com.xintongthecoder.accountingbook.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.xintongthecoder.accountingbook.entity.AccountBook;

public interface AccountBookRepository extends JpaRepository<AccountBook, Long> {
    
}
