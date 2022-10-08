package com.xintongthecoder.accountingbook.entity;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.hateoas.server.core.Relation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "spending_item")
@Getter
@Setter
@Relation(collectionRelation = "items")
public class SpendingItem {

    private @Id @GeneratedValue Long id;
    @Enumerated(EnumType.STRING)
    private Category category;
    private String description;
    private String merchant;
    private @Temporal(TemporalType.DATE) Date date;
    private float amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_book_Id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private AccountBook book;

}
