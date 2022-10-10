package com.xintongthecoder.accountingbook.modelAssembler;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;
import com.xintongthecoder.accountingbook.controller.AccountBookController;
import com.xintongthecoder.accountingbook.entity.AccountBook;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class AccountBookModelAssembler
        implements RepresentationModelAssembler<AccountBook, EntityModel<AccountBook>> {
    @Override
    public EntityModel<AccountBook> toModel(AccountBook book) {
        return EntityModel.of(book,
                linkTo(methodOn(AccountBookController.class).one(book.getId(), 0, 0)).withSelfRel(),
                linkTo(methodOn(AccountBookController.class).all(0, 0)).withRel("books"));
    }
}
