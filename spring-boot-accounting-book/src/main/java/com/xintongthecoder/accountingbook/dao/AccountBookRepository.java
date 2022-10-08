package com.xintongthecoder.accountingbook.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.xintongthecoder.accountingbook.entity.AccountBook;

@CrossOrigin("http://localhost:4200")
public interface AccountBookRepository extends JpaRepository<AccountBook, Long> {

    Page<AccountBook> findById(Long id, Pageable pageable);

    Page<AccountBook> findAll(Pageable pageable);
}
