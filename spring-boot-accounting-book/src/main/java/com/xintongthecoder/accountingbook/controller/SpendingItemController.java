package com.xintongthecoder.accountingbook.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.xintongthecoder.accountingbook.dao.AccountBookRepository;
import com.xintongthecoder.accountingbook.dao.SpendingItemRepository;
import com.xintongthecoder.accountingbook.entity.AccountBook;
import com.xintongthecoder.accountingbook.entity.Category;
import com.xintongthecoder.accountingbook.entity.SpendingItem;
import com.xintongthecoder.accountingbook.errorHandler.AccountBookNotFoundException;
import com.xintongthecoder.accountingbook.modelAssembler.SpendingItemModelAssembler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("api/accounts")
public class SpendingItemController {

    private final AccountBookRepository accountBookRepository;
    private final SpendingItemRepository spendingItemRepository;
    private final SpendingItemModelAssembler spendingItemModelAssembler;
    private final PagedResourcesAssembler<SpendingItem> pagedResourcesAssembler;


    public SpendingItemController(AccountBookRepository accountBookRepository,
            SpendingItemRepository spendingItemRepository,
            SpendingItemModelAssembler spendingItemModelAssembler,
            PagedResourcesAssembler<SpendingItem> pagedResourcesAssembler) {
        this.accountBookRepository = accountBookRepository;
        this.spendingItemRepository = spendingItemRepository;
        this.spendingItemModelAssembler = spendingItemModelAssembler;
        this.pagedResourcesAssembler = pagedResourcesAssembler;
    }

    @GetMapping(value = "/{email}/books/{bookId}/items/{itemId}",
            produces = {"application/hal+json"})
    public ResponseEntity<PagedModel<EntityModel<SpendingItem>>> one(
            @PathVariable("email") String email, @PathVariable("bookId") Long bookId,
            @PathVariable("itemId") Long itemId,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size, Principal user) {
        if (!isFromAuthorizedAccount(email, bookId, user)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        Page<SpendingItem> pagedItem =
                spendingItemRepository.findById(itemId, PageRequest.of(page, size));
        return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON)
                .body(pagedResourcesAssembler.toModel(pagedItem, spendingItemModelAssembler));
    }

    private boolean isFromAuthorizedAccount(String email, Long bookId, Principal user) {
        if (accountBookRepository.getReferenceById(bookId) == null) {
            throw new AccountBookNotFoundException(bookId);
        }
        return accountBookRepository.findById(bookId).get().getAccount().getEmail().equals(email)
                && user.getName().equals(email);
    }

    @GetMapping(value = "/{email}/books/{bookId}/items", produces = {"application/hal+json"})
    public ResponseEntity<PagedModel<EntityModel<SpendingItem>>> all(
            @PathVariable("email") String email, @PathVariable("bookId") Long bookId,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestParam(value = "startDate", required = false) Date startDate,
            @RequestParam(value = "endDate", required = false) Date endDate,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "text", required = false) String text,
            @RequestParam(value = "min", required = false) Long min,
            @RequestParam(value = "max", required = false) Long max,
            @RequestParam(value = "sortBy", defaultValue = "date") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            Principal user) {
        if (!isFromAuthorizedAccount(email, bookId, user)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        Set<String> sortBySet = Set.of("date", "category", "merchant", "amount");
        if (!sortBySet.contains(sortBy) || (!sortDir.equals("asc") && !sortDir.equals("desc"))) {
            throw new Error("Invalid sort param");
        }
        PageRequest pageRequest = PageRequest.of(page, size,
                Sort.by(sortDir.equals("asc") ? Direction.ASC : Direction.DESC, sortBy));
        Page<SpendingItem> pagedItems = spendingItemRepository.findAll(
                getFilters(bookId, startDate, endDate, category, text, min, max), pageRequest);
        return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON)
                .body(pagedResourcesAssembler.toModel(pagedItems, spendingItemModelAssembler));
    }

    private static Specification<SpendingItem> getFilters(Long bookId, Date startDate, Date endDate,
            String category, String text, Long min, Long max) {

        return new Specification<SpendingItem>() {
            @Override
            public Predicate toPredicate(Root<SpendingItem> root, CriteriaQuery<?> query,
                    CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<>();
                predicates.add(criteriaBuilder.equal(root.get("book").get("id"), bookId));
                if (startDate != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.<Date>get("date"),
                            startDate));
                }
                if (endDate != null) {
                    predicates.add(
                            criteriaBuilder.lessThanOrEqualTo(root.<Date>get("date"), endDate));
                }
                if (category != null && !category.equals("ALL")) {
                    predicates.add(criteriaBuilder.equal(root.get("category"),
                            Category.valueOf(category)));
                }
                if (text != null) {
                    Predicate filterPredicate = criteriaBuilder.or(
                            criteriaBuilder.like(root.get("description"), "%" + text + "%"),
                            criteriaBuilder.like(root.get("merchant"), "%" + text + "%"));
                    predicates.add(filterPredicate);
                }
                if (min != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("amount"), min));
                }
                if (max != null) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("amount"), max));
                }
                return criteriaBuilder.and(predicates.toArray(new Predicate[] {}));
            }
        };
    }

    @PostMapping(value = "{email}/books/{bookId}/items")
    public ResponseEntity<SpendingItem> addItem(@PathVariable("email") String email,
            @PathVariable Long bookId, @RequestBody SpendingItem itemFromRequest, Principal user) {
        if (!isFromAuthorizedAccount(email, bookId, user)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        AccountBook book = accountBookRepository.findById(bookId).get();
        itemFromRequest.setBook(book);
        SpendingItem newItem = this.spendingItemRepository.save(itemFromRequest);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED);
    }

    @PutMapping(value = "{email}/items/{itemId}")
    public ResponseEntity<SpendingItem> editItem(@PathVariable("email") String email,
            @PathVariable("itemId") Long itemId, @RequestBody SpendingItem itemFromRequest,
            Principal user) {
        Long bookId = spendingItemRepository.getReferenceById(itemId).getBook().getId();
        if (!isFromAuthorizedAccount(email, bookId, user)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        AccountBook book = accountBookRepository.getReferenceById(bookId);
        itemFromRequest.setBook(book);
        SpendingItem updatedItem = spendingItemRepository.save(itemFromRequest);
        return new ResponseEntity<>(updatedItem, HttpStatus.OK);
    }

    @DeleteMapping(value = "{email}/items/{itemId}")
    public ResponseEntity<HttpStatus> deleteItem(@PathVariable("email") String email,
            @PathVariable("itemId") Long itemId, Principal user) {
        Long bookId = spendingItemRepository.getReferenceById(itemId).getBook().getId();
        if (!isFromAuthorizedAccount(email, bookId, user)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        spendingItemRepository.deleteById(itemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
