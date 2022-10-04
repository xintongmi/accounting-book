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
@EnableAutoConfiguration(exclude = {SecurityAutoConfiguration.class})
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
	// account.setAccountBooks(Arrays.asList(book1, book2));
	// SpendingItem item1 = getSpendingItem(book1, Category.GROCERY, "food", "Safeway",
	// new Date(1664607600000L), 34.53F);
	// SpendingItem item2 = getSpendingItem(book1, Category.HOUSEHOLD, "cleanser", "Amazon",
	// new Date(1664694000000L), 47.46F);
	// SpendingItem item3 = getSpendingItem(book1, Category.GROCERY, "food", "Costco",
	// new Date(1664694000000L), 180.98F);
	// SpendingItem item4 = getSpendingItem(book1, Category.CLOTHING, "cloth", "Uniqlo",
	// new Date(1664694000000L), 76.14F);
	// SpendingItem item5 = getSpendingItem(book2, Category.HOUSEHOLD, "ant-killer",
	// "HomeDepot", new Date(1664866800000L), 101.56F);
	// SpendingItem item6 = getSpendingItem(book1, Category.UTILITY, "water", "Sunnyvale City",
	// new Date(1664866800000L), 348.75F);
	// SpendingItem item7 = getSpendingItem(book1, Category.GROCERY, "food", "Whole Foods",
	// new Date(1665039600000L), 59.76F);
	// book1.setSpendingItems(Arrays.asList(item1, item2, item3, item4, item6, item7));
	// book2.setSpendingItems(Arrays.asList(item5));
	// accountRepo.saveAndFlush(account);
	// };
	// }

	public static void main(String[] args) {
		SpringApplication.run(AccountingbookApplication.class, args);
	}

	private SpendingItem getSpendingItem(AccountBook book, Category category, String desc,
			String merchant, Date date, float amount) {
		SpendingItem item = new SpendingItem();
		item.setBook(book);
		item.setCategory(category);
		item.setDescription(desc);
		item.setMerchant(merchant);
		item.setDate(date);
		item.setAmount(amount);
		return item;
	}

	private AccountBook getAccountBook(Account account, String name) {
		AccountBook book = new AccountBook();
		book.setName(name);
		book.setAccount(account);
		return book;
	}

}
