package com.hospital.management.api.features.hospitalmanagement.dto.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaginatedResponse<T> {
    private long totalItems;
    private List<T> data;
    private int totalPages;
    private int currentPage;
    private int pageSize;
	private long numberOfItems;
	private boolean first;
	private boolean last;
	private boolean empty;
     // Default constructor
    public PaginatedResponse() {}
    // Parameterized constructor
    public PaginatedResponse(long totalItems, List<T> data, int totalPages, int currentPage, int pageSize,
            long numberOfItems, boolean first, boolean last, boolean empty) {
        this.totalItems = totalItems;
        this.data = data;
        this.totalPages = totalPages;
        this.currentPage =currentPage + 1; // converts 0-based to 1-based for frontend
        this.pageSize = pageSize;
        this.numberOfItems = numberOfItems;
        this.first = first;
        this.last = last;
        this.empty = empty;
    }   
}
