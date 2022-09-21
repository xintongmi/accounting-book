package com.xintongthecoder.accountingbook.accountbook;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class AccountBook {

    private @Id @GeneratedValue String id;
    private String name;
    private String accountId;
    
    public AccountBook(String accountId) {
        this.accountId = accountId;
    }

    public AccountBook(String name, String accountId) {
        this(accountId);
        this.name = name;
    }
    
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAccountId() {
        return this.accountId;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof AccountBook)) {
            return false;
        }
        AccountBook accountBook = (AccountBook) o;
        return Objects.equals(id, accountBook.id) && Objects.equals(name, accountBook.name) && Objects.equals(accountId, accountBook.accountId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, accountId);
    }

    @Override
    public String toString() {
        return "AccountBook{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", accountId='" + getAccountId() + "'" +
            "}";
    }
    

}
