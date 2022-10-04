package com.xintongthecoder.accountingbook.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.xintongthecoder.accountingbook.entity.Category;
import com.xintongthecoder.accountingbook.entity.SpendingItem;

@CrossOrigin("http://localhost:4200")
public interface SpendingItemRepository extends JpaRepository<SpendingItem, Long> {

    Page<SpendingItem> findByCategory(@Param("category") Category category, Pageable pageable);

    Page<SpendingItem> findByDescriptionContaining(@Param("description") String description,
            Pageable pageable);
}
