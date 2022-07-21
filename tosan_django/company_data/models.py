from django.db import models
from dataresolve.models import ProductCategories

GENDER_CHOICES = (
    ("G", 'خانم'),
    ("B", 'آقا')
)


class JobCategories(models.Model):
    job_name = models.CharField(blank=False, unique=True, max_length=200, verbose_name="نام سمت شغلی")

    def __str__(self):
        return self.job_name

    class Meta:
        verbose_name_plural = "سمت‌های شغلی"


class Employee(models.Model):
    first_name = models.CharField(blank=False, max_length=200, verbose_name="نام")
    last_name = models.CharField(blank=False, max_length=200, verbose_name="نام خانوادگی")
    email_address = models.EmailField(blank=True, max_length=200, verbose_name="آدرس ایمیل")

    job_category = models.ForeignKey(JobCategories, related_name="job_cat", on_delete=models.CASCADE, blank=True,
                                     verbose_name="سمت شغلی", null=True)

    fields = models.ManyToManyField(ProductCategories, related_name="job_fields", blank=True,
                                    verbose_name="فیلد‌های تخصصی", limit_choices_to={'category_type': 'main'})

    whats_app_link = models.URLField(max_length=2000, blank=True, verbose_name="لینک واتساپ")
    inner_company_prefix_phone = models.IntegerField(blank=True, verbose_name="تلفن داخلی", null=True)
    gender = models.CharField(blank=False, max_length=10, default='B', choices=GENDER_CHOICES, verbose_name="جنسیت")
    image = models.ImageField(blank=True, upload_to="employees_data", verbose_name="عکس")

    def __str__(self):
        return self.get_gender_display() + self.first_name + self.last_name

    class Meta:
        verbose_name_plural = "کارمندان"


class Subsidiary(models.Model):
    name = models.CharField(blank=False, max_length=200, verbose_name="نام شرکت زیر مجموعه")
    icon = models.FileField(blank=True, upload_to="subsidiary_icon", verbose_name="آیکون")
    icon_gold = models.FileField(blank=True, upload_to="subsidiary_icon", verbose_name="آیکون طلایی")
    main_page_image = models.ImageField(blank=True, upload_to="subsidiary_main_image",
                                        verbose_name="عکس زیر‌مجموعه در صفحه‌ی اصلی")
    main_page_description = models.TextField(blank=True, verbose_name="متن زیر مجموعه در صفحه‌ی اصلی")

    class Meta:
        verbose_name_plural = "شرکت‌های زیر مجموعه"
