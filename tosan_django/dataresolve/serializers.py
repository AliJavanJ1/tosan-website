from rest_framework import serializers
from .models import *


class MainCategorySerializer(serializers.Serializer):
    category_name = serializers.CharField(required=False, allow_blank=False, max_length=100)


class AllProductsSerializer(serializers.Serializer):
    product_id = serializers.SerializerMethodField()
    main_name = serializers.SerializerMethodField()
    sub_name1 = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    attr_vals = serializers.SerializerMethodField()
    split_by_attr = serializers.SerializerMethodField()
    product_image_offer = serializers.ImageField(required=False, allow_null=True, allow_empty_file=True)

    def get_main_name(self, obj):
        ress = ""
        ress += "" if obj.product_main_name is None else obj.product_main_name.category_name
        return ress

    def get_sub_name1(self, obj):
        ress = ""
        ress += "" if obj.product_sub_name1 is None else obj.product_sub_name1.category_name
        return ress

    def get_full_name(self, obj):
        ress = ""
        ress += "" if obj.full_name is None else obj.full_name.category_name
        return ress

    def get_attr_vals(self, obj):
        attrs = [attr for attr in obj.attrs.all().iterator()]
        attr_vals = {}
        for index, attr in enumerate(attrs):
            attr_vals[attr.attr_name] = []
            vals = getattr(obj, f'att{index + 1}_val').all()
            attr_vals[attr.attr_name].append({"priority": getattr(obj, f'att{index + 1}_order')})
            for val in vals.iterator():
                attr_vals[attr.attr_name].append(val.prod_value)
        return attr_vals

    def get_split_by_attr(self, obj):
        return obj.sort_by_attr.attr_name if obj.sort_by_attr else None

    def get_product_id(self, obj):
        return obj.id


class MainPageProductDataImageSerializer(serializers.Serializer):
    product_main_name = serializers.CharField(allow_blank=False, source="product_main_name.category_name",
                                              max_length=100)
    image = serializers.ImageField(allow_null=True, allow_empty_file=True)
    icon = serializers.FileField(allow_null=True, allow_empty_file=True)


class PriceTableSerializer(serializers.Serializer):
    product_id = serializers.SerializerMethodField()
    product_name = serializers.CharField(allow_blank=False,
                                         source="product_name_str.product_name.product_main_name.category_name")
    product_sub_name = serializers.CharField(allow_blank=True,
                                             source="product_name_str.product_name.product_sub_name1.category_name")
    display_name = serializers.CharField(allow_blank=True,
                                         source="product_name_str.product_name.full_name.category_name")
    attrs_vals = serializers.SerializerMethodField()
    price = serializers.FloatField(allow_null=False)
    date_price_modified = serializers.DateTimeField(allow_null=False)
    last_day_price = serializers.FloatField(allow_null=False)
    hasOffer = serializers.BooleanField(allow_null=False)
    offerPrice = serializers.FloatField(allow_null=True)

    def get_attrs_vals(self, obj):
        attr_vals = dict()
        for i in range(1, 11):
            attr = getattr(obj, f'name_att{i}')
            val = getattr(obj, f'name_att_val{i}')
            if attr:
                attr_vals[attr.attr_name] = val.prod_value if val else ""
        return attr_vals

    def get_product_id(self, obj):
        return obj.product_name_str.product_name.id
