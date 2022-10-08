package com.xintongthecoder.accountingbook.service;

import org.springframework.stereotype.Service;
import com.xintongthecoder.accountingbook.dao.SpendingItemRepository;

@Service
public class SpendingItemService {
    private SpendingItemRepository spendingItemRepository;

    public SpendingItemService(SpendingItemRepository spendingItemRepository) {
        this.spendingItemRepository = spendingItemRepository;
    }
}
