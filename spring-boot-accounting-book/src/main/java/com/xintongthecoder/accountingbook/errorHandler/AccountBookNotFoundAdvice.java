package com.xintongthecoder.accountingbook.errorHandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class AccountBookNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(AccountBookNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String accountBookNotFoundHandler(AccountBookNotFoundException ex) {
        return ex.getMessage();
    }
}
