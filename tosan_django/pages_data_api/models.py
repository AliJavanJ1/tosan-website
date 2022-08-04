from django.db import models
from django.utils.safestring import mark_safe

from dataresolve.models import ProductCategories

# Register your models here.
IMAGE_COMPRESS_METHOD = (
    ("BIG", 'بزرگ'),
    ("SMALL", 'کوچک'),
)


# Create your models here.
class MainPageData(models.Model):
    persian_key = models.CharField(max_length=1000, blank=True, verbose_name='کلید فارسی')
    key = models.CharField(default='default key', max_length=1000, blank=False, verbose_name='کلید')
    value = models.TextField(blank=True, verbose_name='مقدار')
    file = models.FileField(blank=True, upload_to='main_page_files', verbose_name='فایل')
    file_compress = models.CharField(blank=True, max_length=10, verbose_name='میزان فشرده‌سازی فایل',
                                     choices=IMAGE_COMPRESS_METHOD)

    def file_tag(self):
        if self.file:
            extension = str(self.file).split(".")[-1].lower()
            image_extensions = ['png', 'jpeg', 'jpg']
            if image_extensions.count(extension):
                return mark_safe(
                    '<img src="/media/%s" width="auto" height="100" />' % self.file)
        return self.file

    class Meta:
        verbose_name_plural = "اطلاعات صفحه‌ی اصلی "


class GeneralPagesData(models.Model):
    persian_key = models.CharField(max_length=1000, blank=True, verbose_name='کلید فارسی')
    key = models.CharField(default='default key', max_length=1000, blank=False, verbose_name='کلید')
    value = models.TextField(blank=True, verbose_name='مقدار')
    file = models.FileField(blank=True, upload_to='general_files', verbose_name='فایل')
    file_compress = models.CharField(blank=True, max_length=10, verbose_name='میزان فشرده‌سازی فایل',
                                     choices=IMAGE_COMPRESS_METHOD)

    def file_tag(self):
        if self.file:
            extension = str(self.file).split(".")[-1].lower()
            image_extensions = ['png', 'jpeg', 'jpg']
            if image_extensions.count(extension):
                return mark_safe(
                    '<img src="/media/%s" width="auto" height="100" />' % self.file)
        return self.file

    class Meta:
        verbose_name_plural = "اطلاعات کلی صفحات"


class ProductsPageData(models.Model):
    persian_key = models.CharField(max_length=1000, blank=True, verbose_name='کلید فارسی')
    key = models.CharField(default='default key', max_length=1000, blank=False, verbose_name='کلید')
    value = models.TextField(blank=True, verbose_name='مقدار')
    file = models.FileField(blank=True, upload_to='product_page_files', verbose_name='فایل')
    file_compress = models.CharField(blank=True, max_length=10, verbose_name='میزان فشرده‌سازی فایل',
                                     choices=IMAGE_COMPRESS_METHOD)

    def file_tag(self):
        if self.file:
            extension = str(self.file).split(".")[-1].lower()
            image_extensions = ['png', 'jpeg', 'jpg']
            if image_extensions.count(extension):
                return mark_safe(
                    '<img src="/media/%s" width="auto" height="100" />' % self.file)
        return self.file

    class Meta:
        verbose_name_plural = "اطلاعات صفحه‌ی محصولات"
