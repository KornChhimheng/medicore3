package com.hospital.management.api.features.hospitalmanagement.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RolePermissionRequest {
    String roleName;
    String permissionName;
}
