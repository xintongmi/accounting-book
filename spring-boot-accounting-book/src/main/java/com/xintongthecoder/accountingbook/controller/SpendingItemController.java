package com.xintongthecoder.accountingbook.controller;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.xintongthecoder.accountingbook.dao.AccountBookRepository;
import com.xintongthecoder.accountingbook.dao.SpendingItemRepository;
import com.xintongthecoder.accountingbook.entity.SpendingItem;
import com.xintongthecoder.accountingbook.errorHandler.SpendingItemNotFoundException;
import com.xintongthecoder.accountingbook.service.SpendingItemService;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api")
public class SpendingItemController {

        // private final SpendingItemService spendingItemService;
        private final SpendingItemRepository spendingItemRepository;
        private final AccountBookRepository accountBookRepository;

        public SpendingItemController(SpendingItemService spendingItemService,
                        SpendingItemRepository spendingItemRepository,
                        AccountBookRepository accountBookRepository) {
                // this.spendingItemService = spendingItemService;
                this.spendingItemRepository = spendingItemRepository;
                this.accountBookRepository = accountBookRepository;
        }

        @GetMapping("/books/{bookId}/items/{id}")
        public EntityModel<SpendingItem> one(@PathVariable(value = "bookId") Long bookId,
                        @PathVariable(value = "id") Long id) {
                SpendingItem item = spendingItemRepository.findById(id)
                                .orElseThrow(() -> new SpendingItemNotFoundException(id));
                return EntityModel.of(item,
                                linkTo(methodOn(SpendingItemController.class).one(bookId, id))
                                                .withSelfRel(),
                                linkTo(methodOn(SpendingItemController.class).all(bookId))
                                                .withRel("items"));
        }

        @GetMapping("/books/{bookId}/items")
        public CollectionModel<EntityModel<SpendingItem>> all(@PathVariable Long bookId) {
                List<EntityModel<SpendingItem>> items = accountBookRepository
                                .getReferenceById(bookId).getSpendingItems().stream()
                                .map((SpendingItem item) -> EntityModel.of(item,
                                                linkTo(methodOn(SpendingItemController.class)
                                                                .one(bookId, item.getId()))
                                                                                .withSelfRel(),
                                                linkTo(methodOn(SpendingItemController.class)
                                                                .all(bookId)).withRel("items")))
                                .collect(Collectors.toList());
                return CollectionModel.of(items,
                                linkTo(methodOn(SpendingItemController.class).all(bookId))
                                                .withSelfRel());
        }

}
