from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin
from import_export import resources


class MainPageDataResource(resources.ModelResource):
    class Meta:
        model = MainPageData


class GeneralDataResource(resources.ModelResource):
    class Meta:
        model = GeneralPagesData


class ProductPageDataResource(resources.ModelResource):
    class Meta:
        model = ProductsPageData


class MainPageDataAdminForm(ImportExportModelAdmin):
    empty_value_display = '-خالی-'
    resources = MainPageDataResource
    list_display = ('persian_key', 'key', 'value', 'file', 'file_compress')
    list_editable = ('file_compress',)
    list_display_links = ('persian_key',)
    list_per_page = 20
    search_fields = ('key', 'persian_key')
    sortable_by = ('persian_key', 'id')


class GeneralDataAdminForm(ImportExportModelAdmin):
    resources = GeneralDataResource
    empty_value_display = '-خالی-'
    list_display = ('persian_key', 'key', 'value', 'file', 'file_compress')
    list_editable = ('file_compress',)
    list_display_links = ('persian_key',)
    list_per_page = 20
    search_fields = ('key', 'persian_key')
    sortable_by = ('persian_key', 'id')


class ProductPageDataAdminForm(ImportExportModelAdmin):
    empty_value_display = '-خالی-'
    resources = ProductPageDataResource
    list_display = ('persian_key', 'key', 'value', 'file', 'file_compress')
    list_editable = ('file_compress',)
    list_display_links = ('persian_key',)
    list_per_page = 10
    search_fields = ('key', 'persian_key')
    sortable_by = ('persian_key', 'id')


admin.site.register(MainPageData, MainPageDataAdminForm)
admin.site.register(GeneralPagesData, GeneralDataAdminForm)
admin.site.register(ProductsPageData, ProductPageDataAdminForm)
