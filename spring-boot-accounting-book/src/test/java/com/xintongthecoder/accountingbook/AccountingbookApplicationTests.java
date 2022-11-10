package com.xintongthecoder.accountingbook;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import java.security.Principal;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
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
import org.springframework.data.jpa.domain.Specification;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.xintongthecoder.accountingbook.controller.SpendingItemController;
import com.xintongthecoder.accountingbook.dao.AccountBookRepository;
import com.xintongthecoder.accountingbook.dao.AccountRepository;
import com.xintongthecoder.accountingbook.dao.SpendingItemRepository;
import com.xintongthecoder.accountingbook.entity.Account;
import com.xintongthecoder.accountingbook.entity.AccountBook;
import com.xintongthecoder.accountingbook.entity.Category;
import com.xintongthecoder.accountingbook.entity.SpendingItem;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(SpringExtension.class)
@WebMvcTest()
@ComponentScan("com.xintongthecoder.accountingbook.modelAssembler")
@AutoConfigureMockMvc(addFilters = false)
class AccountingbookApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private AccountBookRepository mockAccountBookRepository;

	@InjectMocks
	private SpendingItemController mockSpendingItemController;

	@MockBean
	private AccountRepository mockAccountRepository;

	@MockBean
	private SpendingItemRepository mockSpendingItemRepository;

	private Account mockAccount;
	private AccountBook mockBook1;
	private AccountBook mockBook2;
	private SpendingItem mockItem1;
	private SpendingItem mockItem2;
	private Principal mockPrincipal;
	private PageRequest mockPagerequest;

	@BeforeEach
	public void setUp() {
		mockAccount = getAccount("test@test.com");
		mockBook1 = getAccountBook(1l, mockAccount, "mockBook1");
		mockBook2 = getAccountBook(2l, mockAccount, "mockBook2");
		mockItem1 = getSpendingItem(1l, mockBook1, Category.GROCERY, "food", "safeway",
				new Date(1664694000000L), 76.14F);
		mockItem2 = getSpendingItem(2l, mockBook1, Category.HOUSEHOLD, "cleanser", "amazon",
				new Date(1664866800000L), 98.56F);
		mockAccount.setAccountBooks(Arrays.asList(mockBook1, mockBook2));
		mockBook1.setSpendingItems(Arrays.asList(mockItem1, mockItem2));

		mockPrincipal = Mockito.mock(Principal.class);
		Mockito.when(mockPrincipal.getName()).thenReturn(mockAccount.getEmail());

		mockPagerequest = PageRequest.of(0, 10);
	}

	@Test
	public void shouldReturnCorrectBook() throws Exception {
		Page<AccountBook> mockPagedBook =
				new PageImpl<>(Arrays.asList(mockBook1), mockPagerequest, 1);

		Mockito.when(mockAccountBookRepository.findById(mockBook1.getId()))
				.thenReturn(Optional.of(mockBook1));
		Mockito.when(mockAccountBookRepository.findById(mockBook1.getId(), mockPagerequest))
				.thenReturn(mockPagedBook);

		RequestBuilder requestBuilder =
				MockMvcRequestBuilders.get("/api/accounts/test@test.com/books/1")
						.principal(mockPrincipal).accept(MediaTypes.HAL_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		String expected = "{\"_embedded\":{\"books\":[{\"id\":1,\"name\":\"mockBook1\",\"_links"
				+ "\":{\"self\":{\"href\":\"http://localhost/api/accounts/{email}/books/1{?page,"
				+ "size}\",\"templated\":true},\"books\":{\"href\":\"http://localhost/api/accounts"
				+ "/{email}/books{?page,size}\",\"templated\":true}}}]},\"_links\":{\"self\""
				+ ":{\"href\":\"http://localhost/api/accounts/test@test.com/books/1?page=0&"
				+ "size=10\"}},\"page\":{\"size\":10,\"totalElements\":1,\"totalPages\":1,\""
				+ "number\":0}}";

		JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
	}

	@Test
	public void shouldReturnCorrectBookList() throws Exception {
		Page<AccountBook> mockPagedBook =
				new PageImpl<>(Arrays.asList(mockBook1, mockBook2), mockPagerequest, 1);

		Mockito.when(mockAccountRepository.findByEmail(mockAccount.getEmail()))
				.thenReturn(mockAccount);
		Mockito.when(mockAccountBookRepository.findAllByAccount(mockAccount, mockPagerequest))
				.thenReturn(mockPagedBook);

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.get("/api/accounts/test@test.com/books").accept(MediaTypes.HAL_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		String expected = "{\"_embedded\":{\"books\":[{\"id\":1,\"name\":\"mockBook1\",\"_links\":"
				+ "{\"self\":{\"href\":\"http://localhost/api/accounts/{email}/books/1{?page,size}"
				+ "\",\"templated\":true},\"books\":{\"href\":\"http://localhost/api/accounts/{"
				+ "email}/books{?page,size}\",\"templated\":true}}},{\"id\":2,\"name\":\"mockBook2"
				+ "\",\"_links\":{\"self\":{\"href\":\"http://localhost/api/accounts/{email}/books"
				+ "/2{?page,size}\",\"templated\":true},\"books\":{\"href\":\"http://localhost/api/"
				+ "accounts/{email}/books{?page,size}\",\"templated\":true}}}]},\"_links\":{\"self"
				+ "\":{\"href\":\"http://localhost/api/accounts/test@test.com/books?page=0&size=10"
				+ "\"}},\"page\":{\"size\":10,\"totalElements\":2,\"totalPages\":1,\"number\":0}}";

		JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
	}

	@Test
	public void shouldAddCorrectBook() throws Exception {
		Mockito.when(mockAccountRepository.findByEmail(mockAccount.getEmail()))
				.thenReturn(mockAccount);
		AccountBook newBook = getAccountBook(3l, mockAccount, "newBook");
		String newBookJson = "{\"id\": -1, \"name\": \"newBook\"}";

		Mockito.when(mockAccountBookRepository.save(Mockito.any(AccountBook.class)))
				.thenReturn(newBook);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/api/accounts/test@test.com/books").accept(MediaTypes.HAL_JSON)
				.content(newBookJson).contentType(MediaTypes.HAL_JSON);
		String savedBookJson = "{\"id\": 3, \"name\": \"newBook\"}";
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();

		assertEquals(HttpStatus.CREATED.value(), response.getStatus());
		JSONAssert.assertEquals(savedBookJson, response.getContentAsString(), false);
	}

	@Test
	public void shouldUpdateBook() throws Exception {
		Mockito.when(mockAccountBookRepository.findById(mockBook1.getId()))
				.thenReturn(Optional.of(mockBook1));
		Mockito.when(mockAccountRepository.findByEmail(mockAccount.getEmail()))
				.thenReturn(mockAccount);
		mockBook1.setName("updatedBook1");
		String updatedBookJson = "{\"id\": 1, \"name\": \"updatedBook1\"}";
		Mockito.when(mockAccountBookRepository.save(Mockito.any(AccountBook.class)))
				.thenReturn(mockBook1);

		RequestBuilder requestBuilder =
				MockMvcRequestBuilders.put("/api/accounts/test@test.com/books/1")
						.principal(mockPrincipal).accept(MediaTypes.HAL_JSON)
						.content(updatedBookJson).contentType(MediaTypes.HAL_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();

		assertEquals(HttpStatus.OK.value(), response.getStatus());
		JSONAssert.assertEquals(updatedBookJson, response.getContentAsString(), false);
	}

	@Test
	public void shouldDeleteBook() throws Exception {
		Mockito.when(mockAccountBookRepository.findById(mockBook1.getId()))
				.thenReturn(Optional.of(mockBook1));

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/accounts/test@test.com/books/1").principal(mockPrincipal);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();

		Mockito.verify(mockAccountBookRepository, times(1)).deleteById(mockBook1.getId());
		assertEquals(HttpStatus.NO_CONTENT.value(), response.getStatus());
	}

	@Test
	public void shouldReturnCorrectItem() throws Exception {
		Page<SpendingItem> mockPagedItem =
				new PageImpl<>(Arrays.asList(mockItem1), mockPagerequest, 1);

		Mockito.when(mockAccountBookRepository.getReferenceById(mockBook1.getId()))
				.thenReturn(mockBook1);
		Mockito.when(mockAccountBookRepository.findById(mockBook1.getId()))
				.thenReturn(Optional.of(mockBook1));
		Mockito.when(mockSpendingItemRepository.findById(mockItem1.getId(), mockPagerequest))
				.thenReturn(mockPagedItem);

		RequestBuilder requestBuilder =
				MockMvcRequestBuilders.get("/api/accounts/test@test.com/books/1/items/1")
						.principal(mockPrincipal).accept(MediaTypes.HAL_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		String expected = "{\"_embedded\":{\"items\":[{\"id\":1,\"category\":\"GROCERY\",\""
				+ "description\":\"food\",\"merchant\":\"safeway\",\"date\":\"2022-10-02T07:"
				+ "00:00.000+00:00\",\"amount\":76.14,\"_links\":{\"self\":{\"href\":\"http:"
				+ "//localhost/api/accounts/test%40test.com/books/1/items/1{?page,size}\",\""
				+ "templated\":true},\"items\":{\"href\":\"http://localhost/api/accounts/test%"
				+ "40test.com/books/1/items{?page,size,category,text}\",\"templated\":true}}}]}"
				+ ",\"_links\":{\"self\":{\"href\":\"http://localhost/api/accounts/test@test.com"
				+ "/books/1/items/1?page=0&size=10\"}},\"page\":{\"size\":10,\"totalElements\":1,"
				+ "\"totalPages\":1,\"number\":0}}";

		JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
	}

	@Test
	public void shouldReturnCorrectItems() throws Exception {
		Page<SpendingItem> mockPagedItems =
				new PageImpl<>(Arrays.asList(mockItem1, mockItem2), mockPagerequest, 1);

		Mockito.when(mockAccountBookRepository.getReferenceById(mockBook1.getId()))
				.thenReturn(mockBook1);
		Mockito.when(mockAccountBookRepository.findById(mockBook1.getId()))
				.thenReturn(Optional.of(mockBook1));
		Mockito.when(mockSpendingItemRepository.findAll(Mockito.any(Specification.class),
				Mockito.any(PageRequest.class))).thenReturn(mockPagedItems);

		RequestBuilder requestBuilder =
				MockMvcRequestBuilders.get("/api/accounts/test@test.com/books/1/items")
						.principal(mockPrincipal).accept(MediaTypes.HAL_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		String expected = "{\"_embedded\":{\"items\":[{\"id\":1,\"category\":\"GROCERY\",\""
				+ "description\":\"food\",\"merchant\":\"safeway\",\"date\":\"2022-10-02T07:"
				+ "00:00.000+00:00\",\"amount\":76.14,\"_links\":{\"self\":{\"href\":\"http://"
				+ "localhost/api/accounts/test%40test.com/books/1/items/1{?page,size}\",\""
				+ "templated\":true},\"items\":{\"href\":\"http://localhost/api/accounts/test%40"
				+ "test.com/books/1/items{?page,size,category,text}\",\"templated\":true}}},"
				+ "{\"id\":2,\"category\":\"HOUSEHOLD\",\"description\":\"cleanser\",\"merchant\""
				+ ":\"amazon\",\"date\":\"2022-10-04T07:00:00.000+00:00\",\"amount\":98.56,"
				+ "\"_links\":{\"self\":{\"href\":\"http://localhost/api/accounts/test%40test"
				+ ".com/books/1/items/2{?page,size}\",\"templated\":true},\"items\":{\"href\":"
				+ "\"http://localhost/api/accounts/test%40test.com/books/1/items{?page,size,"
				+ "category,text}\",\"templated\":true}}}]},\"_links\":{\"self\":{\"href\":\""
				+ "http://localhost/api/accounts/test@test.com/books/1/items?page=0&size=10\"}},"
				+ "\"page\":{\"size\":10,\"totalElements\":2,\"totalPages\":1,\"number\":0}}";

		JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
	}

	@Test
	public void shouldAddCorrectItem() throws Exception {
		Mockito.when(mockAccountRepository.findByEmail(mockAccount.getEmail()))
				.thenReturn(mockAccount);
		Mockito.when(mockAccountBookRepository.getReferenceById(Mockito.anyLong()))
				.thenReturn(mockBook2);
		Mockito.when(mockAccountBookRepository.findById(Mockito.anyLong()))
				.thenReturn(Optional.of(mockBook2));
		SpendingItem newItem = getSpendingItem(3l, mockBook2, Category.GROCERY, "food", "Safeway",
				new Date(1668111349L), 54.56f);
		mockBook2.setSpendingItems(Arrays.asList(newItem));
		String newItemJson =
				"{\"id\":-1,\"category\":\"GROCERY\",\"description\":\"food\",\"merchant\":\""
						+ "Safeway\",\"date\":1668111349,\"amount\":54.56}";

		Mockito.when(mockSpendingItemRepository.save(Mockito.any(SpendingItem.class)))
				.thenReturn(newItem);
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/api/accounts/test@test.com/books/2/items").principal(mockPrincipal)
				.accept(MediaTypes.HAL_JSON).content(newItemJson).contentType(MediaTypes.HAL_JSON);
		String savedItemJson =
				"{\"id\":3,\"category\":\"GROCERY\",\"description\":\"food\",\"merchant\":\""
						+ "Safeway\",\"date\":1668111349,\"amount\":54.56}";
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();

		assertEquals(HttpStatus.CREATED.value(), response.getStatus());
		JSONAssert.assertEquals(savedItemJson, response.getContentAsString(), false);
	}

	@Test
	public void shouldUpdateItem() throws Exception {
		Mockito.when(mockSpendingItemRepository.getReferenceById(Mockito.anyLong()))
				.thenReturn(mockItem1);
		Mockito.when(mockAccountBookRepository.getReferenceById(Mockito.anyLong()))
				.thenReturn(mockBook1);
		Mockito.when(mockAccountBookRepository.findById(Mockito.anyLong()))
				.thenReturn(Optional.of(mockBook1));
		SpendingItem updatedItem = getSpendingItem(1l, mockBook1, Category.GROCERY, "food",
				"Safeway", new Date(1668111349L), 54.56f);

		String updatedItemJson =
				"{\"id\":1,\"category\":\"GROCERY\",\"description\":\"food\",\"merchant\":\""
						+ "Safeway\",\"date\":1668111349,\"amount\":54.56}";

		Mockito.when(mockSpendingItemRepository.save(Mockito.any(SpendingItem.class)))
				.thenReturn(updatedItem);
		RequestBuilder requestBuilder =
				MockMvcRequestBuilders.put("/api/accounts/test@test.com/items/1")
						.principal(mockPrincipal).accept(MediaTypes.HAL_JSON)
						.content(updatedItemJson).contentType(MediaTypes.HAL_JSON);

		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();

		assertEquals(HttpStatus.OK.value(), response.getStatus());
		JSONAssert.assertEquals(updatedItemJson, response.getContentAsString(), false);
	}

	@Test
	public void shouldDeleteItem() throws Exception {
		Mockito.when(mockSpendingItemRepository.getReferenceById(Mockito.anyLong()))
				.thenReturn(mockItem1);
		Mockito.when(mockAccountBookRepository.getReferenceById(Mockito.anyLong()))
				.thenReturn(mockBook1);
		Mockito.when(mockAccountBookRepository.findById(Mockito.anyLong()))
				.thenReturn(Optional.of(mockBook1));

		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.delete("/api/accounts/test@test.com/items/1").principal(mockPrincipal);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();

		Mockito.verify(mockSpendingItemRepository, times(1)).deleteById(mockItem1.getId());
		assertEquals(HttpStatus.NO_CONTENT.value(), response.getStatus());
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
