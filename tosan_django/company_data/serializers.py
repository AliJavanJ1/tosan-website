from rest_framework import serializers
from .models import *


class EmployeeSerializer(serializers.Serializer):
    first_name = serializers.CharField(allow_blank=False, max_length=200)
    last_name = serializers.CharField(allow_blank=False, max_length=200)
    job_category = serializers.SerializerMethodField(allow_null=True)
    fields_name = serializers.SerializerMethodField(allow_null=True)
    whats_app_link = serializers.URLField(allow_blank=True, max_length=2000)
    inner_company_prefix_phone = serializers.URLField(allow_blank=True)
    gender = serializers.CharField(source="get_gender_display", allow_blank=False, max_length=20)
    image = serializers.ImageField(allow_null=True, allow_empty_file=True)

    def get_job_category(self, obj):
        if obj.job_category:
            return obj.job_category.job_name
            return None

    def get_fields_name(self, obj):
        if obj.fields:
            return [field.category_name for field in obj.fields.all()]
        return None


class SubsidiaryMainPageSerializer(serializers.Serializer):
    name = serializers.CharField(allow_blank=False, max_length=200)
    main_page_image = serializers.ImageField(allow_null=True, allow_empty_file=True)
    main_page_description = serializers.CharField(allow_blank=True, max_length=10000)
