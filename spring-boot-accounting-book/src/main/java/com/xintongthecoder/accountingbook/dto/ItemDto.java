package com.xintongthecoder.accountingbook.dto;

import com.xintongthecoder.accountingbook.entity.SpendingItem;
import lombok.Data;

@Data
public class ItemDto {
    private Long bookId;
    private SpendingItem item;
}
