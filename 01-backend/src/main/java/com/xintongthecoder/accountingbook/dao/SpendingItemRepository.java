package com.xintongthecoder.accountingbook.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.xintongthecoder.accountingbook.entity.SpendingItem;

public interface SpendingItemRepository extends JpaRepository<SpendingItem, Long> {
    
}
