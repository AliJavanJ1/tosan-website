from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.html import mark_safe
from django_resized import ResizedImageField

CATEGORY_TYPE = (
    ('main', 'اصلی'),
    ('alter', 'فرعی اول'),
    ('alter1', 'نام نمایش محصول')
)


class ProductCategories(models.Model):
    category_name = models.CharField(blank=False, max_length=200, verbose_name="نام ویژگی")
    category_type = models.CharField(blank=False, max_length=10, choices=CATEGORY_TYPE, verbose_name="نوع ویژگی",
                                     default='اصلی')

    def __str__(self):
        return self.category_name if self.category_name else ""

    class Meta:
        verbose_name_plural = "تمام انواع دسته‌بندی محصولات"


class PossibleProductsAttributes(models.Model):
    prod_value = models.CharField(max_length=200, verbose_name="مقدار صفت", blank=False, unique=True, primary_key=True)

    def __str__(self):
        return self.prod_value if self.prod_value else self.id

    class Meta:
        verbose_name_plural = "صفات کلی محصولات"


class ProductsAttributes(models.Model):
    attr_name = models.CharField(blank=False, max_length=300, verbose_name='نام صفت', unique=True, primary_key=True)

    def __str__(self):
        return self.attr_name

    class Meta:
        verbose_name_plural = 'صفات محصولات'


class MainPageProductData(models.Model):
    product_main_name = models.OneToOneField(ProductCategories, on_delete=models.CASCADE,
                                             blank=False, verbose_name="نام اصلی محصول", null=True,
                                             limit_choices_to={'category_type': 'main'})

    image = ResizedImageField(size=[160, None], quality=100, keep_meta=False, blank=True,
                              upload_to='products_images_files')
    icon = models.FileField(blank=True, upload_to="products_icon_files", verbose_name='آیکون محصول در منو هدر')

    def image_tag(self):
        if self.image:
            return mark_safe(
                '<img src="/media/%s" width="160" height="127" />' % self.image)
        return self.image

    image_tag.short_description = "تصویر اسلایدر صفحه اصلی محصول"

    class Meta:
        verbose_name_plural = "اطلاعات عکس محصولات"


class ProductNames(models.Model):
    product_main_name = models.ForeignKey(ProductCategories, related_name="main_name", on_delete=models.CASCADE,
                                          blank=False, verbose_name="نام اصلی محصول", null=True,
                                          limit_choices_to={'category_type': 'main'})
    product_sub_name1 = models.ForeignKey(ProductCategories, related_name="sub_name1", on_delete=models.CASCADE,
                                          blank=True, verbose_name="نام فرعی اول محصول", null=True,
                                          limit_choices_to={'category_type': 'alter'})
    full_name = models.ForeignKey(ProductCategories, related_name="full_name", on_delete=models.CASCADE,
                                  blank=False, verbose_name="نام محصول", null=True,
                                  limit_choices_to={'category_type': 'alter1'})

    attrs = models.ManyToManyField(ProductsAttributes, related_name="attrss", blank=True, verbose_name="صفات محصول")

    sort_by_attr = models.ForeignKey(ProductsAttributes, related_name="sortby_attr", blank=True,
                                     on_delete=models.CASCADE, verbose_name="صفت جدا کننده‌ی جدول", null=True)

    product_image_offer = ResizedImageField(size=[240, None], quality=100, keep_meta=False,
                                            verbose_name="عکس پشنهاد ویژه محصول",
                                            upload_to="offer_product_pic",
                                            null=True, blank=True)

    att1_val = models.ManyToManyField(PossibleProductsAttributes, related_name='att1_val', blank=True,
                                      verbose_name='مقادیر ممکن')
    att1_order = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(1), MaxValueValidator(10)],
                                     default=1, verbose_name="اولویت در جدول")
    att2_val = models.ManyToManyField(PossibleProductsAttributes, related_name='att2_val', blank=True,
                                      verbose_name='مقادیر ممکن')
    att2_order = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(1), MaxValueValidator(10)],
                                     default=2, verbose_name="اولویت در جدول")
    att3_val = models.ManyToManyField(PossibleProductsAttributes, related_name='att3_val', blank=True,
                                      verbose_name='مقادیر ممکن')
    att3_order = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(1), MaxValueValidator(10)],
                                     default=3, verbose_name="اولویت در جدول")
    att4_val = models.ManyToManyField(PossibleProductsAttributes, related_name='att4_val', blank=True,
                                      verbose_name='مقادیر ممکن')
    att4_order = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(1), MaxValueValidator(10)],
                                     default=4, verbose_name="اولویت در جدول")
    att5_val = models.ManyToManyField(PossibleProductsAttributes, related_name='att5_val', blank=True,
                                      verbose_name='مقادیر ممکن')
    att5_order = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(1), MaxValueValidator(10)],
                                     default=5, verbose_name="اولویت در جدول")
    att6_val = models.ManyToManyField(PossibleProductsAttributes, related_name='att6_val', blank=True,
                                      verbose_name='مقادیر ممکن')
    att6_order = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(1), MaxValueValidator(10)],
                                     default=6, verbose_name="اولویت در جدول")
    att7_val = models.ManyToManyField(PossibleProductsAttributes, related_name='att7_val', blank=True,
                                      verbose_name='مقادیر ممکن')
    att7_order = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(1), MaxValueValidator(10)],
                                     default=7, verbose_name="اولویت در جدول")
    att8_val = models.ManyToManyField(PossibleProductsAttributes, related_name='att8_val', blank=True,
                                      verbose_name='مقادیر ممکن')
    att8_order = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(1), MaxValueValidator(10)],
                                     default=8, verbose_name="اولویت در جدول")
    att9_val = models.ManyToManyField(PossibleProductsAttributes, related_name='att9_val', blank=True,
                                      verbose_name='مقادیر ممکن')
    att9_order = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(1), MaxValueValidator(10)],
                                     default=9, verbose_name="اولویت در جدول")
    att10_val = models.ManyToManyField(PossibleProductsAttributes, related_name='att10_val', blank=True,
                                       verbose_name='مقادیر ممکن')
    att10_order = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(1), MaxValueValidator(10)],
                                      default=10, verbose_name="اولویت در جدول")

    def image_tag(self):
        return mark_safe(
            '<img src="/media/%s" width="70" height="auto"/>' % self.product_image_offer)

    image_tag.short_description = "تصویر پیشنهاد ویژه"

    def __str__(self):
        return str(self.full_name) if self.full_name else ""

    class Meta:
        verbose_name_plural = "تمام محصولات"


class ProductNameStr(models.Model):
    name = models.CharField(max_length=5000, primary_key=True)
    product_name = models.ForeignKey(ProductNames, related_name="prod_name_str_name", on_delete=models.CASCADE,
                                     blank=True, verbose_name="نام محصول", null=True)

    def __str__(self):
        return self.name.split(",")[0]


class ProductsPriceTable(models.Model):
    product_name_str = models.ForeignKey(ProductNameStr, related_name="prod_name_str", on_delete=models.CASCADE,
                                         blank=False, verbose_name="نام محصول", null=True)
    name_att1 = models.ForeignKey(ProductsAttributes, related_name="name_att1", on_delete=models.CASCADE,
                                  blank=True, verbose_name="صفت", null=True)
    name_att_val1 = models.ForeignKey(PossibleProductsAttributes, related_name="name_att_val1",
                                      on_delete=models.CASCADE, blank=True, verbose_name="مقدار", null=True)
    name_att2 = models.ForeignKey(ProductsAttributes, related_name="name_att2", on_delete=models.CASCADE,
                                  blank=True, verbose_name="صفت", null=True)
    name_att_val2 = models.ForeignKey(PossibleProductsAttributes, related_name="name_att_val2",
                                      on_delete=models.CASCADE, blank=True, verbose_name="مقدار", null=True)
    name_att3 = models.ForeignKey(ProductsAttributes, related_name="name_att3", on_delete=models.CASCADE,
                                  blank=True, verbose_name="صفت", null=True)
    name_att_val3 = models.ForeignKey(PossibleProductsAttributes, related_name="name_att_val3",
                                      on_delete=models.CASCADE, blank=True, verbose_name="مقدار", null=True)
    name_att4 = models.ForeignKey(ProductsAttributes, related_name="name_att4", on_delete=models.CASCADE,
                                  blank=True, verbose_name="صفت", null=True)
    name_att_val4 = models.ForeignKey(PossibleProductsAttributes,
                                      related_name="name_att_val4", on_delete=models.CASCADE, blank=True,
                                      verbose_name="مقدار", null=True)
    name_att5 = models.ForeignKey(ProductsAttributes, related_name="name_att5", on_delete=models.CASCADE,
                                  blank=True, verbose_name="صفت", null=True)
    name_att_val5 = models.ForeignKey(PossibleProductsAttributes,
                                      related_name="name_att_val5", on_delete=models.CASCADE, blank=True,
                                      verbose_name="مقدار", null=True)
    name_att6 = models.ForeignKey(ProductsAttributes, related_name="name_att6", on_delete=models.CASCADE,
                                  blank=True, verbose_name="صفت", null=True)
    name_att_val6 = models.ForeignKey(PossibleProductsAttributes,
                                      related_name="name_att_val6", on_delete=models.CASCADE, blank=True,
                                      verbose_name="مقدار", null=True)
    name_att7 = models.ForeignKey(ProductsAttributes, related_name="name_att7", on_delete=models.CASCADE,
                                  blank=True, verbose_name="صفت", null=True)
    name_att_val7 = models.ForeignKey(PossibleProductsAttributes,
                                      related_name="name_att_val7", on_delete=models.CASCADE, blank=True,
                                      verbose_name="مقدار", null=True)
    name_att8 = models.ForeignKey(ProductsAttributes, related_name="name_att8", on_delete=models.CASCADE,
                                  blank=True, verbose_name="صفت", null=True)
    name_att_val8 = models.ForeignKey(PossibleProductsAttributes,
                                      related_name="name_att_val8", on_delete=models.CASCADE, blank=True,
                                      verbose_name="مقدار", null=True)
    name_att9 = models.ForeignKey(ProductsAttributes, related_name="name_att9", on_delete=models.CASCADE,
                                  blank=True, verbose_name="صفت", null=True)
    name_att_val9 = models.ForeignKey(PossibleProductsAttributes,
                                      related_name="name_att_val9", on_delete=models.CASCADE, blank=True,
                                      verbose_name="مقدار", null=True)
    name_att10 = models.ForeignKey(ProductsAttributes, related_name="name_att10", on_delete=models.CASCADE,
                                   blank=True, verbose_name="صفت", null=True)
    name_att_val10 = models.ForeignKey(PossibleProductsAttributes,
                                       related_name="name_att_val10", on_delete=models.CASCADE, blank=True,
                                       verbose_name="مقدار", null=True)

    price = models.FloatField(validators=[MinValueValidator(0)], blank=False, verbose_name="قیمت")
    last_price = models.FloatField(null=True, verbose_name="قیمت")
    date_price_modified = models.DateTimeField(auto_now=False, verbose_name="آخرین تغییر قیمت")
    date_last_price_modified = models.DateTimeField(auto_now=False, verbose_name="یکی قبل آخرین تغییر قیمت", null=True)
    last_day_price = models.FloatField(verbose_name="قیمت روز قبل", null=True)
    last_price_date = models.DateTimeField(verbose_name="آخرین قیمت پیشین", null=True)
    hasOffer = models.BooleanField(verbose_name="پیشنهاد ویزه دارد؟", null=False, default=False)
    offerPrice = models.FloatField(verbose_name='قیمت ویژه', null=True, validators=[MinValueValidator(0)], blank=False,
                                   default=0)

    class Meta:
        verbose_name_plural = "جدول قیمت"
