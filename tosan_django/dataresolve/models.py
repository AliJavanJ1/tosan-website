from django.db import models

CATEGORY_TYPE = (
    ('main', 'اصلی'),
    ('alter', 'فرعی اول'),
    ('alter1', 'فرعی دوم')
)


class ProductCategories(models.Model):
    category_name = models.CharField(blank=False, max_length=200, verbose_name="نام ویژگی")
    category_type = models.CharField(blank=False, max_length=10, choices=CATEGORY_TYPE, verbose_name="نوع ویژگی",
                                     default='اصلی')

    def __str__(self):
        return self.category_name if self.category_name else ""

    class Meta:
        verbose_name_plural = "تمام انواع دسته‌بندی محصولات"


class ProductNames(models.Model):
    product_main_name = models.ForeignKey(ProductCategories, related_name="main_name", on_delete=models.CASCADE,
                                          blank=True, verbose_name="نام اصلی محصول", null=True,
                                          limit_choices_to={'category_type': 'main'})
    product_sub_name1 = models.ForeignKey(ProductCategories, related_name="sub_name1", on_delete=models.CASCADE,
                                          blank=True, verbose_name="نام فرعی اول محصول", null=True,
                                          limit_choices_to={'category_type': 'alter'})
    product_sub_name2 = models.ForeignKey(ProductCategories, related_name="sub_name2", on_delete=models.CASCADE,
                                          blank=True, verbose_name="نام فرعی دوم محصول", null=True,
                                          limit_choices_to={'category_type': 'alter1'})

    def full_name(self):
        ress = ""
        ress += "" if self.product_main_name is None else self.product_main_name.category_name
        ress += "" if self.product_sub_name1 is None else " " + self.product_sub_name1.category_name
        ress += "" if self.product_sub_name2 is None else " " + self.product_sub_name2.category_name
        return ress

    def __str__(self):
        return self.full_name()

    class Meta:
        verbose_name_plural = "تمام محصولات"


class MainPageProductData(models.Model):
    product_main_name = models.OneToOneField(ProductCategories, on_delete=models.CASCADE,
                                             blank=True, verbose_name="نام اصلی محصول", null=True,
                                             limit_choices_to={'category_type': 'main'})

    file = models.ImageField(blank=True, upload_to='products_images_files', verbose_name='فایل')

    class Meta:
        verbose_name_plural = "اطلاعات عکس محصولات"
