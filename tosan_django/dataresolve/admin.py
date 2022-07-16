from django.contrib import admin
from .models import *
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin
from import_export import resources


class ProductCategoriesResources(resources.ModelResource):
    class Meta:
        model = ProductCategories


class ProductNamesResources(resources.ModelResource):
    class Meta:
        model = ProductNames


class ProductImageDataResource(resources.ModelResource):
    class Meta:
        model = MainPageProductData


# Register your models here.
class ProductCategoriesAdminForm(ImportExportModelAdmin):
    empty_value_display = '-خالی-'
    list_display = ('id', 'category_name', 'category_type')
    list_per_page = 100
    search_fields = ('category_name', 'category_type')
    sortable_by = ('category_name', 'id', 'category_type')
    list_editable = ('category_name', 'category_type')
    ordering = ('category_name',)
    list_filter = ('category_type',)
    resources = ProductCategoriesResources


class ProductCategoryMainNameFilter(admin.SimpleListFilter):
    title = _('فیلتر بر اساس نام اصلی محصول')

    parameter_name = 'product_main_name_filter'

    def lookups(self, request, model_admin):
        all_mains = ProductCategories.objects.filter(category_type='main')
        sett = []
        for mainn in all_mains:
            sett.append((mainn.category_name, _(mainn.category_name)))
        return tuple(sett)

    def queryset(self, request, queryset):
        if self.value() is None:
            return queryset.all()
        return queryset.filter(product_main_name__category_name=self.value())


class ProductNamesAdminForm(ImportExportModelAdmin):
    empty_value_display = '-خالی-'
    list_display = ('full_name', 'product_main_name', 'product_sub_name1', 'product_sub_name2')
    list_per_page = 100
    # list_display_links = ('full_name',)
    search_fields = ('product_main_name', 'product_sub_name1', 'product_sub_name2')
    sortable_by = ('product_main_name', 'id')
    list_editable = ('product_main_name', 'product_sub_name1', 'product_sub_name2')
    ordering = ('product_main_name',)
    autocomplete_fields = ('product_main_name', 'product_sub_name1', 'product_sub_name2')
    list_filter = (ProductCategoryMainNameFilter,)
    resources = ProductNamesResources

    @admin.display(empty_value='--خالی--')
    def full_name(self, obj):
        if obj is None:
            return "none"
        else:
            ress = ""
            ress += "" if obj.product_main_name is None else obj.product_main_name.category_name
            ress += "" if obj.product_sub_name1 is None else " " + obj.product_sub_name1.category_name
            ress += "" if obj.product_sub_name2 is None else " " + obj.product_sub_name2.category_name
            return ress
        # return str(obj)


class ProductImageDataAdminForm(ImportExportModelAdmin):
    empty_value_display = '-خالی-'
    resources = ProductImageDataResource
    list_display = ('product_main_name', 'file')
    list_display_links = ('product_main_name',)
    list_per_page = 10
    search_fields = ('product_main_name',)
    sortable_by = ('product_main_name',)


admin.site.register(ProductCategories, ProductCategoriesAdminForm)
admin.site.register(ProductNames, ProductNamesAdminForm)
admin.site.register(MainPageProductData, ProductImageDataAdminForm)
