package com.xintongthecoder.accountingbook.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.xintongthecoder.accountingbook.dao.AccountBookRepository;
import com.xintongthecoder.accountingbook.dao.SpendingItemRepository;
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
                        @PathVariable(value = "itemId") Long itemId) {
                Page<SpendingItem> pagedItem =
                                spendingItemRepository.findById(itemId, PageRequest.of(0, 1));
                return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON)
                                .body(pagedResourcesAssembler.toModel(pagedItem,
                                                spendingItemModelAssembler));
        }

        @GetMapping(value = "/books/{bookId}/items", produces = {"application/hal+json"})
        public ResponseEntity<PagedModel<EntityModel<SpendingItem>>> all(
                        @PathVariable Long bookId) {
                Page<SpendingItem> pagedItems = spendingItemRepository.findAllByBookId(bookId,
                                PageRequest.of(0, 2));
                return ResponseEntity.ok().contentType(MediaTypes.HAL_JSON)
                                .body(pagedResourcesAssembler.toModel(pagedItems,
                                                spendingItemModelAssembler));
        }
}
