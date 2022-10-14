package com.xintongthecoder.accountingbook.errorHandler;

public class AccountAccessDeniedException extends RuntimeException {
    public AccountAccessDeniedException(String entity) {
        super("Account Access Denied: You don't have permission to access the " + entity);
    }
}
