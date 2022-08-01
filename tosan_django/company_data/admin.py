from django.contrib import admin
from .models import *
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin
from import_export import resources


class EmployeeResources(resources.ModelResource):
    class Meta:
        model = Employee


class EmployeeAdminForm(ImportExportModelAdmin):
    empty_value_display = '-خالی-'
    list_display = ('full_name', 'first_name', 'last_name', 'get_gob_str',
                    'inner_company_prefix_phone', 'image_tag')
    list_display_links = ('full_name',)
    list_per_page = 20
    search_fields = ('first_name', 'last_name')
    sortable_by = ('full_name',)
    list_filter = ('job_category', 'fields')
    autocomplete_fields = ('fields', 'job_category')
    resources = EmployeeResources

    def full_name(self, obj):
        return obj.first_name + " " + obj.last_name

    def get_gob_str(self, obj):
        ress = ""
        ress += obj.job_category.job_name + " " if obj.job_category else ""
        if obj.fields is not None:
            fields_str = [field.category_name for field in obj.fields.all()]
            ress += " و ".join(fields_str)
        return ress

    get_gob_str.short_description = _('عنوان شغل')

    full_name.short_description = _('نام و نام خانوادگی')


class JobCategoriesResources(resources.ModelResource):
    class Meta:
        model = JobCategories


class JobCategoriesAdminForm(ImportExportModelAdmin):
    list_display = ('job_name',)
    search_fields = ('job_name',)
    resources = JobCategoriesResources


class SubsidiaryResources(resources.ModelResource):
    class Meta:
        model = Subsidiary


class SubsidiaryAdminForm(ImportExportModelAdmin):
    list_display = ('name', 'main_page_tag', 'main_page_description')
    list_display_links = ('name',)
    resources = SubsidiaryResources


admin.site.register(JobCategories, JobCategoriesAdminForm)
admin.site.register(Employee, EmployeeAdminForm)
admin.site.register(Subsidiary, SubsidiaryAdminForm)
