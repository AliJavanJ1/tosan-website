from rest_framework import serializers
from .models import *


class MainCategorySerializer(serializers.Serializer):
    category_name = serializers.CharField(required=False, allow_blank=False, max_length=100)


class AllProductsSerializer(serializers.Serializer):
    main_name = serializers.SerializerMethodField()
    sub_name1 = serializers.SerializerMethodField()
    sub_name2 = serializers.SerializerMethodField()
    full_name = serializers.CharField()

    def get_main_name(self, obj):
        ress = ""
        ress += "" if obj.product_main_name is None else obj.product_main_name.category_name
        return ress

    def get_sub_name1(self, obj):
        ress = ""
        ress += "" if obj.product_sub_name1 is None else obj.product_sub_name1.category_name
        return ress

    def get_sub_name2(self, obj):
        ress = ""
        ress += "" if obj.product_sub_name2 is None else obj.product_sub_name2.category_name
        return ress


class MainPageProductDataImageSerializer(serializers.Serializer):
    product_main_name = serializers.CharField(allow_blank=False, source="product_main_name.category_name",
                                              max_length=100)
    file = serializers.ImageField(allow_null=True, allow_empty_file=True)
