from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'admin'

class IsBooker(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'booker'

class IsWarehouseman(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'warehouseman'
