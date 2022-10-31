package com.xintongthecoder.accountingbook;

import java.util.Arrays;
import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.xintongthecoder.accountingbook.dao.AccountRepository;
import com.xintongthecoder.accountingbook.entity.Account;
import com.xintongthecoder.accountingbook.entity.AccountBook;
import com.xintongthecoder.accountingbook.entity.Category;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import com.xintongthecoder.accountingbook.entity.SpendingItem;

@SpringBootApplication
@EnableAutoConfiguration(exclude = {SecurityAutoConfiguration.class})
public class AccountingbookApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccountingbookApplication.class, args);
	}
}
