package com.xintongthecoder.accountingbook.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import com.xintongthecoder.accountingbook.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByEmail(@Param("email") String email);
}
