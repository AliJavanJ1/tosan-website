from django.contrib import admin
from django.utils import timezone

from .models import *
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin
from import_export import resources
from django import forms
import json


class ProductCategoriesResources(resources.ModelResource):
    class Meta:
        model = ProductCategories


class ProductImageDataResource(resources.ModelResource):
    class Meta:
        model = MainPageProductData


class ProductsAttributesResources(resources.ModelResource):
    class Meta:
        model = ProductsAttributes


class PossibleProductsAttributesResources(resources.ModelResource):
    class Meta:
        model = PossibleProductsAttributes


class ProductNamesResources(resources.ModelResource):
    class Meta:
        model = ProductNames


class PriceTableResources(resources.ModelResource):
    class Meta:
        model = ProductsPriceTable


class PossibleProductsAttributesForm(forms.ModelForm):
    class Meta:
        model = PossibleProductsAttributes
        fields = '__all__'


class PossibleProductsAttributesAdminForm(ImportExportModelAdmin):
    form = PossibleProductsAttributesForm
    empty_value_display = '-خالی-'
    list_display = ('prod_value',)
    list_display_links = ('prod_value',)
    list_per_page = 100
    search_fields = ('prod_value',)
    sortable_by = ('prod_value',)
    # list_editable = ('category_name', 'category_type')
    ordering = ('prod_value',)
    # list_filter = ('prod_name', 'prod_attr')
    resources = ProductCategoriesResources
    show_close_button = True

    def get_model_perms(self, request):
        """
        Return empty perms dict thus hiding the model from admin index.
        """
        return {}


# Register your models here.
class ProductCategoriesAdminForm(ImportExportModelAdmin):
    empty_value_display = '-خالی-'
    list_display = ('id', 'category_name', 'category_type')
    list_per_page = 100
    search_fields = ('category_name', 'category_type')
    sortable_by = ('category_name', 'id', 'category_type')
    list_editable = ('category_name', 'category_type')
    ordering = ('category_name',)
    list_filter = ('category_type',)
    resources = ProductCategoriesResources
    show_close_button = True


class ProductImageDataAdminForm(ImportExportModelAdmin):
    empty_value_display = '-خالی-'
    resources = ProductImageDataResource
    list_display = ('product_main_name', 'image_tag', 'icon')
    list_display_links = ('product_main_name',)
    list_per_page = 10
    search_fields = ('product_main_name__category_name',)
    sortable_by = ('product_main_name',)
    show_close_button = True


class ProductsAttributesAdminForm(ImportExportModelAdmin):
    empty_value_display = '-خالی-'
    list_display = ('attr_name',)
    list_per_page = 20
    list_display_links = ('attr_name',)
    search_fields = ('attr_name',)
    sortable_by = ('attr_name',)
    # list_editable = ('attr_name',)
    ordering = ('attr_name',)
    resources = ProductsAttributesResources
    show_close_button = True

    def get_model_perms(self, request):
        """
        Return empty perms dict thus hiding the model from admin index.
        """
        return {}


class ProductCategoryMainNameFilter(admin.SimpleListFilter):
    title = _('فیلتر بر اساس نام اصلی محصول')

    parameter_name = 'product_main_name_filter'

    def lookups(self, request, model_admin):
        all_mains = ProductCategories.objects.filter(category_type='main')
        sett = []
        for mainn in all_mains:
            sett.append((mainn.category_name, _(mainn.category_name)))
        return tuple(sett)

    def queryset(self, request, queryset):
        if self.value() is None:
            return queryset.all()
        return queryset.filter(product_main_name__category_name=self.value())


class ProductsNamesForm(forms.ModelForm):
    def clean(self):
        cleaned_data = super(ProductsNamesForm, self).clean()
        attrs_len = len(cleaned_data['attrs'])
        all_orders = {}
        for i in range(1, attrs_len + 1):
            attr_order = cleaned_data[f'att{i}_order']
            if attr_order:
                if attr_order in all_orders:
                    all_orders[attr_order].append(f'att{i}_order')
                else:
                    all_orders[attr_order] = [f'att{i}_order']
        for i in range(attrs_len + 1, 11):
            cleaned_data[f'att{i}_order'] = i

        has_any_errors = False
        for key, value in all_orders.items():
            if len(value) != 1:
                has_any_errors = True
                for order in value:
                    print("here", order)
                    self.add_error(order, "مقادیر اولیت ها باید متفاوت باشد")

        if not has_any_errors:
            all_orders_key = list(all_orders.keys())
            sorted_orders = sorted(all_orders)
            res_result = [x for x in sorted_orders]
            for index, value in enumerate(sorted_orders):
                ind = all_orders_key.index(value)
                res_result[ind] = index + 1
            for i in range(0, len(all_orders_key)):
                cleaned_data[f'att{i + 1}_order'] = res_result[i]
            print(all_orders_key)
            print(sorted_orders)
            print(res_result)
        return cleaned_data

    class Meta:
        model = ProductNames
        fields = (
            'product_main_name', 'product_sub_name1', 'full_name',
            'attrs',
            'att1_val', 'att2_val', 'att3_val',
            'att4_val', 'att5_val', 'att6_val', 'att7_val', 'att8_val',
            'att9_val', 'att10_val',
            'att1_order', 'att2_order', 'att3_order', 'att4_order', 'att5_order', 'att6_order', 'att7_order',
            'att8_order', 'att9_order', 'att10_order'
        )


class ProductNamesAdminForm(ImportExportModelAdmin):
    empty_value_display = '-خالی-'
    list_display = (
        'full_name1', 'product_main_name', 'product_sub_name1', 'full_name', 'sort_by_attr', 'image_tag')
    list_per_page = 100
    search_fields = (
        'product_main_name__category_name', 'product_sub_name1__category_name', 'full_name__category_name')
    sortable_by = ('product_main_name',)
    list_editable = ('product_main_name', 'product_sub_name1', 'full_name')
    ordering = ('product_main_name',)
    autocomplete_fields = (
        'product_main_name', 'product_sub_name1', 'full_name',
        'attrs',
        'att1_val', 'att2_val', 'att3_val',
        'att4_val', 'att5_val', 'att6_val', 'att7_val', 'att8_val',
        'att9_val', 'att10_val'
    )
    list_filter = (ProductCategoryMainNameFilter,)
    show_close_button = True
    resources = ProductNamesResources
    form = ProductsNamesForm
    list_display_links = ('full_name1',)
    pr_name_obj = None

    fieldsets = (
        ('اطلاعات اصلی', {
            'fields': ('product_main_name', 'product_sub_name1', 'full_name'
                       , 'attrs', 'sort_by_attr', 'product_image_offer'
                       ),
            'classes': ('main_class',)
        }),
        ('صفت ۱', {
            'fields': ('att1_val', 'att1_order'),
            'classes': ('0-attr',)
        }),
        ('صفت ۲', {
            'fields': ('att2_val', 'att2_order'),
            'classes': ('1-attr',)
        }),
        ('صفت ۳', {
            'fields': ('att3_val', 'att3_order'),
            'classes': ('2-attr',)
        }),
        ('صفت ۴', {
            'fields': ('att4_val', 'att4_order'),
            'classes': ('3-attr',)
        }),
        ('صفت ۵', {
            'fields': ('att5_val', 'att5_order'),
            'classes': ('4-attr',)
        }),
        ('صفت ۶', {
            'fields': ('att6_val', 'att6_order'),
            'classes': ('5-attr',)
        }),
        ('صفت ۷', {
            'fields': ('att7_val', 'att7_order'),
            'classes': ('6-attr',)
        }),
        ('صفت ۸', {
            'fields': ('att8_val', 'att8_order'),
            'classes': ('7-attr',)
        }),
        ('صفت ۹', {
            'fields': ('att9_val', 'att9_order'),
            'classes': ('8-attr',)
        }),
        ('صفت ۱۰', {
            'fields': ('att10_val', 'att10_order'),
            'classes': ('9-attr',)
        })
    )

    def full_name1(self, obj):
        return obj.full_name if obj.full_name else "-"

    full_name1.short_description = _("")

    def save_model(self, request, obj, form, change):
        obj.save()
        self.pr_name_obj = obj

    def save_related(self, request, form, formsets, change):
        super(ProductNamesAdminForm, self).save_related(request, form, formsets, change)
        obj = self.pr_name_obj
        all_attrs = []
        for index, attr in enumerate(obj.attrs.all().iterator()):
            all_attrs.append({"id": attr.attr_name, "name": attr.attr_name, "vals": []})

            attr_vals = getattr(obj, f'att{index + 1}_val').all()
            for att_val in attr_vals.iterator():
                all_attrs[-1]['vals'].append({"id": att_val.prod_value, "name": att_val.prod_value})

        str_ww = str(obj) + "," + str(json.dumps(str(all_attrs), ensure_ascii=False).encode('utf8').decode())
        pnses = ProductNameStr.objects.filter(product_name__id=obj.id)
        if len(pnses) > 0:
            first_pns = pnses[0]
            if pnses[0].name != str_ww:
                new_pns = ProductNameStr.objects.create(name=str_ww, product_name=obj)
                ProductsPriceTable.objects.filter(product_name_str=first_pns).update(product_name_str=new_pns)
                for price_obj in ProductsPriceTable.objects.filter(product_name_str=new_pns).iterator():
                    self.update_price_obj(price_obj, obj)

                ProductNameStr.objects.filter(product_name__id=obj.id).exclude(name=str_ww).delete()
        else:
            ProductNameStr.objects.create(name=str_ww, product_name=obj)

    @staticmethod
    def update_price_obj(price_obj, product_obj):
        prod_attr_vals = dict()
        for index, attr in enumerate(product_obj.attrs.all().iterator()):
            prod_attr_vals[attr] = [attr_val for attr_val in
                                    getattr(product_obj, f'att{index + 1}_val').all().iterator()]

        price_attr_vals = dict()
        for i in range(1, 11):
            price_attr = getattr(price_obj, f'name_att{i}')
            if price_attr:
                price_attr_vals[price_attr] = getattr(price_obj, f'name_att_val{i}')
        attr_index = 1
        for prod_attr, prod_val in prod_attr_vals.items():
            setattr(price_obj, f'name_att{attr_index}', prod_attr)
            if prod_attr in price_attr_vals:
                if price_attr_vals[prod_attr] in prod_val:
                    setattr(price_obj, f'name_att_val{attr_index}', price_attr_vals[prod_attr])
                else:
                    setattr(price_obj, f'name_att_val{attr_index}', None)
            else:
                setattr(price_obj, f'name_att_val{attr_index}', None)
            attr_index += 1

        for i in range(attr_index, 11):
            setattr(price_obj, f'name_att{i}', None)
            setattr(price_obj, f'name_att_val{i}', None)

        price_obj.save()

    class Media:
        js = ('dataresolve/js/base.js',)


class ProductNameStrAdminForm(admin.ModelAdmin):
    search_fields = ('product_name',)
    list_per_page = 10
    show_close_button = True

    def get_model_perms(self, request):
        """
        Return empty perms dict thus hiding the model from admin index.
        """
        return {}

    def has_add_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False


class ProductCategoryMainNamePriceTableFilter(admin.SimpleListFilter):
    title = _('فیلتر بر اساس نام اصلی محصول')

    parameter_name = 'product_main_name_filter_in'

    def lookups(self, request, model_admin):
        all_mains = ProductCategories.objects.filter(category_type='main')
        sett = []
        for mainn in all_mains:
            sett.append((mainn.category_name, _(mainn.category_name)))
        return tuple(sett)

    def queryset(self, request, queryset):
        if self.value() is None:
            return queryset.all()
        print(self.value())
        return queryset.filter(product_name_str__product_name__product_main_name__category_name=self.value())


class PriceTableForm(forms.ModelForm):
    class Meta:
        model = ProductsPriceTable
        fields = '__all__'
        exclude = ('date_price_modified', 'last_day_price', 'last_price_date', 'date_last_price_modified', 'last_price')


@admin.action(description="آپدیت تاریخ آخرین تغییر")
def price_table_date_update(modeladmin, request, queryset):
    query_set_iter = queryset.iterator()
    for price in query_set_iter:
        price.date_price_modified = timezone.now()
        if price.date_price_modified.day > price.date_last_price_modified.day + 1:
            price.last_price_date = price.date_price_modified
            price.last_day_price = price.last_price
        price.date_last_price_modified = price.date_price_modified
        price.last_price = price.price
        price.save()


class PriceTableAdminForm(ImportExportModelAdmin):
    form = PriceTableForm
    empty_value_display = '-خالی-'
    resources = PriceTableResources
    list_editable = ('price', 'hasOffer', 'offerPrice')
    list_display = (
        'product_name_str', 'brief', 'price', 'date_price_modified', 'last_day_price', 'hasOffer', 'offerPrice')
    list_display_links = ('product_name_str',)
    list_per_page = 100
    search_fields = (
        'product_name_str__name',
        # 'name_att_val1__prod_value', 'name_att_val10__prod_value', 'name_att_val2__prod_value',
        # 'name_att_val3__prod_value'
        # , 'name_att_val4__prod_value', 'name_att_val5__prod_value', 'name_att_val6__prod_value',
        # 'name_att_val7__prod_value', 'name_att_val8__prod_value'
        # , 'name_att_val9__prod_value'
    )
    sortable_by = ('product_name_str', 'price')
    list_filter = ('hasOffer', ProductCategoryMainNamePriceTableFilter)
    show_close_button = True
    actions = [price_table_date_update]

    def get_search_results(self, request, queryset, search_term):
        queryset, may_have_duplicates = super().get_search_results(
            request, queryset, search_term,
        )
        query_iterator = queryset.iterator()
        new_list = []
        for price in query_iterator:
            keep = False
            for i in range(1, 11):
                att_val = getattr(price, f"name_att_val{i}")
                if att_val:
                    if att_val.prod_value.count(search_term) > 0:
                        keep = True
                        break
            # print(price.product_name_str.product_name.full_name.category_name)
            if price.product_name_str.product_name.full_name.category_name.count(search_term) > 0:
                keep = True
            if keep:
                new_list.append(price.id)

        new_queryset = ProductsPriceTable.objects.filter(id__in=new_list)

        # print("asd,", may_have_duplicates, queryset, search_term, new_queryset)
        return new_queryset, may_have_duplicates

    autocomplete_fields = ('product_name_str',
                           'name_att1',
                           'name_att2',
                           'name_att3',
                           'name_att4',
                           'name_att5',
                           'name_att6',
                           'name_att7',
                           'name_att8',
                           'name_att9',
                           'name_att10',
                           )

    #
    def save_model(self, request, obj, form, change):
        if 'price' in form.changed_data or (not obj.date_price_modified):
            obj.date_price_modified = timezone.now()
        if not obj.date_last_price_modified:
            obj.date_last_price_modified = obj.date_price_modified
        if not obj.last_price:
            obj.last_price = obj.price
        if not obj.last_day_price:
            obj.last_day_price = obj.price
        if not obj.last_price_date:
            obj.last_price_date = obj.date_price_modified
        if obj.date_price_modified.day > obj.date_last_price_modified.day + 1:
            obj.last_price_date = obj.date_price_modified
            obj.last_day_price = obj.last_price
            # print("gooz")
        # print("@@@@@@@@@@@@@", obj.date_last_price_modified, obj.date_price_modified)
        obj.date_last_price_modified = obj.date_price_modified
        obj.last_price = obj.price
        obj.save()

    def brief(self, obj):
        res = []
        for i in range(1, 11):
            name_att = getattr(obj, f'name_att{i}')
            name_att_val = getattr(obj, f'name_att_val{i}')
            if name_att:
                res.append(str(name_att) + "(" + (str(name_att_val) if name_att_val else "") + ")")
        return ", ".join(res)

    brief.short_description = _('توضیح')

    class Media:
        js = ('dataresolve/js/price_table.js',)


admin.site.register(ProductCategories, ProductCategoriesAdminForm)
admin.site.register(ProductNames, ProductNamesAdminForm)
admin.site.register(MainPageProductData, ProductImageDataAdminForm)
admin.site.register(ProductsAttributes, ProductsAttributesAdminForm)
admin.site.register(PossibleProductsAttributes, PossibleProductsAttributesAdminForm)
admin.site.register(ProductsPriceTable, PriceTableAdminForm)
admin.site.register(ProductNameStr, ProductNameStrAdminForm)
