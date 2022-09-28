package com.xintongthecoder.accountingbook.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="account_book")
@Getter
@Setter
public class AccountBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    private String name;
    
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<SpendingItem> spendingItems;
    
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;
 

}
