package com.xintongthecoder.accountingbook;

import java.security.Principal;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.hateoas.MediaTypes;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.xintongthecoder.accountingbook.controller.AccountBookController;
import com.xintongthecoder.accountingbook.controller.SpendingItemController;
import com.xintongthecoder.accountingbook.dao.AccountBookRepository;
import com.xintongthecoder.accountingbook.dao.AccountRepository;
import com.xintongthecoder.accountingbook.entity.Account;
import com.xintongthecoder.accountingbook.entity.AccountBook;
import com.xintongthecoder.accountingbook.entity.Category;
import com.xintongthecoder.accountingbook.entity.SpendingItem;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(SpringExtension.class)
@WebMvcTest(value = AccountBookController.class)
@ComponentScan("com.xintongthecoder.accountingbook.modelAssembler")
@AutoConfigureMockMvc(addFilters = false)
class AccountingbookApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private AccountBookRepository mockAccountBookRepository;

	@InjectMocks
	private SpendingItemController spendingItemController;

	@MockBean
	private AccountRepository accountRepository;

	Account mockAccount = getAccount("test@test.com");
	AccountBook mockBook = getAccountBook(1l, mockAccount, "mockBook");
	SpendingItem mockItem1 = getSpendingItem(1l, mockBook, Category.GROCERY, "food", "safeway",
			new Date(1664694000000L), 76.14F);
	SpendingItem mockItem2 = getSpendingItem(2l, mockBook, Category.HOUSEHOLD, "cleanser", "amazon",
			new Date(1664866800000L), 98.56F);

	@BeforeAll
	public void mockDataSetUp() {
		mockAccount.setAccountBooks(Arrays.asList(mockBook));
		mockBook.setSpendingItems(Arrays.asList(mockItem1, mockItem2));
	}

	@Test
	public void shouldReturnCorrectBook() throws Exception {
		PageRequest mockPagerequest = PageRequest.of(0, 10);
		Page<AccountBook> mockPagedBook =
				new PageImpl<>(Arrays.asList(mockBook), mockPagerequest, 1);
		Principal mockPrincipal = Mockito.mock(Principal.class);

		Mockito.when(mockPrincipal.getName()).thenReturn(mockAccount.getEmail());
		Mockito.when(mockAccountBookRepository.findById(mockBook.getId()))
				.thenReturn(Optional.of(mockBook));
		Mockito.when(mockAccountBookRepository.findById(mockBook.getId(), mockPagerequest))
				.thenReturn(mockPagedBook);
		RequestBuilder requestBuilder =
				MockMvcRequestBuilders.get("/api/accounts/test@test.com/books/1")
						.principal(mockPrincipal).accept(MediaTypes.HAL_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		String expected = "{\"_embedded\":{\"books\":[{\"id\":1,\"name\":\"mockBook\",\"_links"
				+ "\":{\"self\":{\"href\":\"http://localhost/api/accounts/{email}/books/1{?page,"
				+ "size}\",\"templated\":true},\"books\":{\"href\":\"http://localhost/api/accounts"
				+ "/{email}/books{?page,size}\",\"templated\":true}}}]},\"_links\":{\"self\""
				+ ":{\"href\":\"http://localhost/api/accounts/test@test.com/books/1?page=0&"
				+ "size=10\"}},\"page\":{\"size\":10,\"totalElements\":1,\"totalPages\":1,\""
				+ "number\":0}}";
		JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
	}

	private Account getAccount(String email) {
		Account account = new Account();
		account.setEmail(email);
		return account;
	}

	private AccountBook getAccountBook(Long id, Account account, String name) {
		AccountBook book = new AccountBook();
		book.setId(id);
		book.setName(name);
		book.setAccount(account);
		return book;
	}

	private SpendingItem getSpendingItem(Long id, AccountBook book, Category category, String desc,
			String merchant, Date date, float amount) {
		SpendingItem item = new SpendingItem();
		item.setId(id);
		item.setBook(book);
		item.setCategory(category);
		item.setDescription(desc);
		item.setMerchant(merchant);
		item.setDate(date);
		item.setAmount(amount);
		return item;
	}

}
