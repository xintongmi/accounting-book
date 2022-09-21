package com.xintongthecoder.accountingbook.spendingitem;

import java.util.Date;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
public class SpendingItem {
    
    private @Id @GeneratedValue String id;
    private Category category;
    private String description;
    private String merchant;
    private @Temporal(TemporalType.DATE) Date date;
    private float amount;
    private String accountBookId;
    private String accountId;


    public SpendingItem(String accountBookId, String accountId) {
        this.accountBookId = accountBookId;
        this.accountId = accountId;
    }

    public SpendingItem(String id, Category category, String description, String merchant, Date date, float amount, String accountBookId, String accountId) {
        this(accountBookId, accountId);
        this.id = id;
        this.category = category;
        this.description = description;
        this.merchant = merchant;
        this.date = date;
        this.amount = amount;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMerchant() {
        return this.merchant;
    }

    public void setMerchant(String merchant) {
        this.merchant = merchant;
    }

    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public float getAmount() {
        return this.amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getAccountBookId() {
        return this.accountBookId;
    }


    public String getAccountId() {
        return this.accountId;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof SpendingItem)) {
            return false;
        }
        SpendingItem spendingItem = (SpendingItem) o;
        return Objects.equals(id, spendingItem.id) && 
            Objects.equals(category, spendingItem.category) && 
            Objects.equals(description, spendingItem.description) && 
            Objects.equals(merchant, spendingItem.merchant) && 
            Objects.equals(date, spendingItem.date) && 
            amount == spendingItem.amount && 
            Objects.equals(accountBookId, spendingItem.accountBookId) && 
            Objects.equals(accountId, spendingItem.accountId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, category, description, merchant, date, amount, accountBookId, accountId);
    }

    @Override
    public String toString() {
        return "SpendingItem{" +
            " id='" + getId() + "'" +
            ", category='" + getCategory() + "'" +
            ", description='" + getDescription() + "'" +
            ", merchant='" + getMerchant() + "'" +
            ", date='" + getDate() + "'" +
            ", amount='" + getAmount() + "'" +
            ", accountBookId='" + getAccountBookId() + "'" +
            ", accountId='" + getAccountId() + "'" +
            "}";
    }
}
