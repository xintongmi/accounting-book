package com.xintongthecoder.accountingbook.modelAssembler;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;
import com.xintongthecoder.accountingbook.entity.SpendingItem;

// @Component
// public class SpendingItemModelAssembler
// implements RepresentationModelAssembler<SpendingItem, EntityModel<SpendingItem>> {
// @Override
// public EntityModel<SpendingItem> toModel(SpendingItem item) {
// return EntityModel.of(item, linkTo(methodOn(SpendingItemController.class).one))
// }
// }
