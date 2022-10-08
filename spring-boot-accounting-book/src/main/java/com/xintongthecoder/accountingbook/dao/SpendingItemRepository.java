package com.xintongthecoder.accountingbook.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import com.xintongthecoder.accountingbook.entity.Category;
import com.xintongthecoder.accountingbook.entity.SpendingItem;

public interface SpendingItemRepository extends JpaRepository<SpendingItem, Long> {

    // @Query("SELECT item FROM SpendingItem as item WHERE item.description like
    // concat('%',:item.description,'%')"
    // + "or item.merchant like concat('%', :item.description, '%')")
    // Page<SpendingItem> findByText(SpendingItem item, Pageable pageable);

    Page<SpendingItem> findById(Long id, Pageable pageable);

    Page<SpendingItem> findAllByBookId(Long bookId, Pageable pageable);

    Page<SpendingItem> findAll(Pageable pageable);

    Page<SpendingItem> findByCategory(@Param("category") Category category, Pageable pageable);

    // @Transactional
    // void deleteByBookId(Long bookId);
}
