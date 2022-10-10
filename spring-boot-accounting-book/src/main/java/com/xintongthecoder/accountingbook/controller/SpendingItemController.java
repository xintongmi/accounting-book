package com.xintongthecoder.accountingbook.controller;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.xintongthecoder.accountingbook.dao.AccountBookRepository;
import com.xintongthecoder.accountingbook.dao.SpendingItemRepository;
import com.xintongthecoder.accountingbook.entity.Category;
import com.xintongthecoder.accountingbook.entity.SpendingItem;
import com.xintongthecoder.accountingbook.modelAssembler.SpendingItemModelAssembler;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api")
public class SpendingItemController {

    private final SpendingItemRepository spendingItemRepository;
    private final SpendingItemModelAssembler spendingItemModelAssembler;
    private final PagedResourcesAssembler<SpendingItem> pagedResourcesAssembler;


    public SpendingItemController(SpendingItemRepository spendingItemRepository,
            AccountBookRepository accountBookRepository,
            SpendingItemModelAssembler spendingItemModelAssembler,
            PagedResourcesAssembler<SpendingItem> pagedResourcesAssembler) {
        this.spendingItemRepository = spendingItemRepository;
        this.spendingItemModelAssembler = spendingItemModelAssembler;
        this.pagedResourcesAssembler = pagedResourcesAssembler;
    }

    @GetMapping(value = "/books/{bookId}/items/{itemId}", produces = {"application/hal+json"})
    public ResponseEntity<PagedModel<EntityModel<SpendingItem>>> one(
            @PathVariable(value = "bookId") Long bookId,
            @PathVariable(value = "itemId") Long itemId,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {
        Page<SpendingItem> pagedItem =
                spendingItemRepository.findById(itemId, PageRequest.of(page, size));
        return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON)
                .body(pagedResourcesAssembler.toModel(pagedItem, spendingItemModelAssembler));
    }

    @GetMapping(value = "/books/{bookId}/items", produces = {"application/hal+json"})
    public ResponseEntity<PagedModel<EntityModel<SpendingItem>>> all(@PathVariable Long bookId,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "text", required = false) String text) {
        Page<SpendingItem> pagedItems = spendingItemRepository
                .findAll(getFilters(bookId, category, text), PageRequest.of(page, size));
        return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON)
                .body(pagedResourcesAssembler.toModel(pagedItems, spendingItemModelAssembler));
    }

    private static Specification<SpendingItem> getFilters(Long bookId, String category,
            String text) {

        return new Specification<SpendingItem>() {
            @Override
            public Predicate toPredicate(Root<SpendingItem> root, CriteriaQuery<?> query,
                    CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<>();
                predicates.add(criteriaBuilder.equal(root.get("book").get("id"), bookId));
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
                return criteriaBuilder.and(predicates.toArray(new Predicate[] {}));
            }

        };
    }
}
