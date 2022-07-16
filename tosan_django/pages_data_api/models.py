from django.db import models
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
    file = models.FileField(blank=True, upload_to='general_files', verbose_name='فایل')
    file_compress = models.CharField(blank=True, max_length=10, verbose_name='میزان فشرده‌سازی فایل',
                                     choices=IMAGE_COMPRESS_METHOD)

    class Meta:
        verbose_name_plural = "اطلاعات صفحه‌ی اصلی "


class GeneralPagesData(models.Model):
    persian_key = models.CharField(max_length=1000, blank=True, verbose_name='کلید فارسی')
    key = models.CharField(default='default key', max_length=1000, blank=False, verbose_name='کلید')
    value = models.TextField(blank=True, verbose_name='مقدار')
    file = models.FileField(blank=True, upload_to='general_files', verbose_name='فایل')
    file_compress = models.CharField(blank=True, max_length=10, verbose_name='میزان فشرده‌سازی فایل',
                                     choices=IMAGE_COMPRESS_METHOD)

    class Meta:
        verbose_name_plural = "اطلاعات کلی صفحات"


class ProductsPageData(models.Model):
    persian_key = models.CharField(max_length=1000, blank=True, verbose_name='کلید فارسی')
    key = models.CharField(default='default key', max_length=1000, blank=False, verbose_name='کلید')
    value = models.TextField(blank=True, verbose_name='مقدار')
    file = models.FileField(blank=True, upload_to='general_files', verbose_name='فایل')
    file_compress = models.CharField(blank=True, max_length=10, verbose_name='میزان فشرده‌سازی فایل',
                                     choices=IMAGE_COMPRESS_METHOD)

    class Meta:
        verbose_name_plural = "اطلاعات صفحه‌ی محصولات"
