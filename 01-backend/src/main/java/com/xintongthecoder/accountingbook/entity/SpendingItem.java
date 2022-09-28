package com.xintongthecoder.accountingbook.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name="spending_item")
@Getter
@Setter
public class SpendingItem {
    
    private @Id @GeneratedValue Long id;
    private Category category;
    private String description;
    private String merchant;
    private @Temporal(TemporalType.DATE) Date date;
    private float amount;
    
    @ManyToOne
    @JoinColumn(name = "account_book_Id", nullable = false)
    private AccountBook book;
   
}
