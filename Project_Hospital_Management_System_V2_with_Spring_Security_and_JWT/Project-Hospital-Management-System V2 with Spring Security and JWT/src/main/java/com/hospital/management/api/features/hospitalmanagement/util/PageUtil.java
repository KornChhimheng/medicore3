package com.hospital.management.api.features.hospitalmanagement.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PageUtil {

    public static final int DEFAULT_PAGE = 1;
    public static final int DEFAULT_SIZE = 10;

    public static final String PAGE_PARAM = "page";
    public static final String SIZE_PARAM = "size";

    public static Pageable getPageable(int pageNumber, int pageSize) {
        if (pageNumber < DEFAULT_PAGE) {
            pageNumber = DEFAULT_PAGE;
        }
        if (pageSize < 1) {
            pageSize = DEFAULT_SIZE;
        }
        return PageRequest.of(pageNumber - 1, pageSize); // Zero-based index
    }

    public static Pageable getPageable(int pageNumber, int pageSize, String sortBy, String sortDir) {
        if (pageNumber < DEFAULT_PAGE) {
            pageNumber = DEFAULT_PAGE;
        }
        if (pageSize < 1) {
            pageSize = DEFAULT_SIZE;
        }
        if (sortBy == null || sortBy.isBlank()) {
            return PageRequest.of(pageNumber - 1, pageSize);
        }
        Sort sort = sortDir.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        return PageRequest.of(pageNumber - 1, pageSize, sort);
    }
}
