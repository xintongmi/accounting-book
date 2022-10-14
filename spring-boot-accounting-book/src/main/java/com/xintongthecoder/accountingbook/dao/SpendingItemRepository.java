package com.xintongthecoder.accountingbook.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.xintongthecoder.accountingbook.entity.SpendingItem;

public interface SpendingItemRepository
        extends JpaRepository<SpendingItem, Long>, JpaSpecificationExecutor<SpendingItem> {

    Page<SpendingItem> findById(Long id, Pageable pageable);
}
