from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from company_data.serializers import *
from .serializers import *
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from dataresolve.serializers import *
from dataresolve.models import MainPageProductData


@api_view(['GET'])
@parser_classes([JSONParser])
def get_main_page_data(request):
    general_data = GeneralPagesData.objects.all()
    general_data_srl = PageSerializer(general_data, many=True).rearrange_key_values()

    main_page_data = MainPageData.objects.all()
    main_page_data_srl = PageSerializer(main_page_data, many=True).rearrange_key_values()

    products_page_data = ProductsPageData.objects.all()
    products_page_data_srl = PageSerializer(products_page_data, many=True).rearrange_key_values()

    product_images = MainPageProductData.objects.all()
    product_images_srl = MainPageProductDataImageSerializer(product_images, many=True)

    all_products = ProductNames.objects.all()
    all_products_srl = AllProductsSerializer(all_products, many=True)

    employees = Employee.objects.all()
    all_employees_srl = EmployeeSerializer(employees, many=True)

    subsidiaries = Subsidiary.objects.all()
    subsidiaries_srl = SubsidiaryMainPageSerializer(subsidiaries, many=True)
    # return JsonResponse({"general_data": general_data_srl.data,
    #                      "main_product": product_images_srl.data,
    #                      "all_products": all_products_srl.data,
    #                      "employees": all_employees_srl.data,
    #                      "subsidiaries": subsidiaries_srl.data
    #                      }, safe=False, json_dumps_params={'ensure_ascii': False})

    return Response({"general_data": general_data_srl,
                     "main_page_data": main_page_data_srl,
                     "products_page_data": products_page_data_srl,
                     "main_product": product_images_srl.data,
                     "all_products": all_products_srl.data,
                     "employees": all_employees_srl.data,
                     "subsidiaries": subsidiaries_srl.data,
                     })
