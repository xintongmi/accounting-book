package com.xintongthecoder.accountingbook.errorHandler;

public class AccountBookNotFoundException extends RuntimeException {
    public AccountBookNotFoundException(Long id) {
        super("Cound not find accountBook " + id);
    }
}
