package com.xintongthecoder.accountingbook.errorHandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class AccountAccessDeniedAdvice {
    @ResponseBody
    @ExceptionHandler(AccountAccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    String accountAccessDeniedHandler(AccountAccessDeniedException ex) {
        return ex.getMessage();
    }
}
