package com.xintongthecoder.accountingbook;

import java.util.Arrays;
import java.util.Date;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
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
@EnableAutoConfiguration(exclude = { SecurityAutoConfiguration.class })
public class AccountingbookApplication {

	// private static final Logger log =
	// LoggerFactory.getLogger(AccountingbookApplication.class);

	// @Bean
	// CommandLineRunner initDatabase(AccountRepository accountRepo) {
	// return args -> {

	// accountRepo.deleteAll();
	// Account account = new Account();
	// AccountBook book1 = getAccountBook(account, "book1");
	// AccountBook book2 = getAccountBook(account, "book2");
	// account.setAccountBooks(Arrays.asList(book1,book2));
	// SpendingItem item1 = getSpendingItem(book1, "breakfast");
	// SpendingItem item2 = getSpendingItem(book1, "lunch");
	// SpendingItem item3 = getSpendingItem(book1, "dinner");
	// SpendingItem item4 = getSpendingItem(book2, "snacks");
	// book1.setSpendingItems(Arrays.asList(item1, item2, item3));
	// book2.setSpendingItems(Arrays.asList(item4));
	// accountRepo.saveAndFlush(account);
	// };
	// }

	public static void main(String[] args) {
		SpringApplication.run(AccountingbookApplication.class, args);
	}

	private SpendingItem getSpendingItem(AccountBook book, String desc) {
		SpendingItem item = new SpendingItem();
		item.setBook(book);
		item.setCategory(Category.HOUSEHOLD);
		item.setDescription("desc");
		item.setMerchant("merchant");
		item.setDate(new Date());
		item.setAmount(2);
		return item;
	}

	private AccountBook getAccountBook(Account account, String name) {
		AccountBook book = new AccountBook();
		book.setName(name);
		book.setAccount(account);
		return book;
	}

}
