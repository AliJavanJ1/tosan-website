import os

from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin
from import_export import resources
import PIL
from PIL import Image
from tosan_django import settings
from django.core.files.base import File


class MainPageDataResource(resources.ModelResource):
    class Meta:
        model = MainPageData


class GeneralDataResource(resources.ModelResource):
    class Meta:
        model = GeneralPagesData


class ProductPageDataResource(resources.ModelResource):
    class Meta:
        model = ProductsPageData


class BasePageDataAdminForm(ImportExportModelAdmin):
    empty_value_display = '-خالی-'
    list_display = ('persian_key', 'key', 'value', 'file_tag', 'file_compress')
    list_editable = ('file_compress',)
    list_display_links = ('persian_key',)
    list_per_page = 20
    search_fields = ('key', 'persian_key')
    sortable_by = ('persian_key', 'id')

    def save_model(self, request, obj, form, change):
        obj.save()
        modify_extensions = ['png', 'jpeg', 'jpg']
        if obj.file:
            extension = str(obj.file).split(".")[-1].lower()
            before_extension = "".join(str(obj.file).split(".")[:-1])

            if modify_extensions.count(extension):
                old_file_path = settings.MEDIA_ROOT.replace("\\", "/") + str(obj.file)
                new_file_path = settings.MEDIA_ROOT.replace("\\", "/") + str(before_extension) + ".png"

                with Image.open(old_file_path) as im:
                    im.thumbnail((1440, 7000), Image.ANTIALIAS)
                    im.save(new_file_path, "PNG")
                if old_file_path != new_file_path:
                    os.remove(old_file_path)
                print("here2", os.path.exists(new_file_path), os.path.exists(old_file_path))

                with open(new_file_path, 'rb') as new_file:
                    new_copy = "".join(os.path.basename(new_file_path).split(".")[:-1]) + "-copy.png"
                    print("here2.5", new_copy, new_file_path)
                    django_file = File(new_file)
                    obj.file.save(new_copy, django_file)
                obj.save()
                if os.path.exists(new_file_path):
                    os.remove(new_file_path)
                print("here3", os.path.exists(new_file_path), os.path.exists(old_file_path))
                print(settings.MEDIA_ROOT.replace("\\", "/") + str(obj.file))


class MainPageDataAdminForm(BasePageDataAdminForm):
    resources = MainPageDataResource


class GeneralDataAdminForm(BasePageDataAdminForm):
    resources = GeneralDataResource


class ProductPageDataAdminForm(BasePageDataAdminForm):
    resources = ProductPageDataResource


admin.site.register(MainPageData, MainPageDataAdminForm)
admin.site.register(GeneralPagesData, GeneralDataAdminForm)
admin.site.register(ProductsPageData, ProductPageDataAdminForm)
