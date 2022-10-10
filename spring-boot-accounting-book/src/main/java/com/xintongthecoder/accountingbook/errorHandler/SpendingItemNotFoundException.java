package com.xintongthecoder.accountingbook.errorHandler;

public class SpendingItemNotFoundException extends RuntimeException {
    public SpendingItemNotFoundException(Long id) {
        super("Cound not find spendingItem " + id);
    }
}
