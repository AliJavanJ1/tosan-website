from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from .models import ProductsPriceTable
from .serializers import PriceTableSerializer


@api_view(['GET'])
@parser_classes([JSONParser])
def get_products(request):
    prices = ProductsPriceTable.objects.all()
    prices_srl = PriceTableSerializer(prices, many=True)
    return Response(prices_srl.data)
    # return JsonResponse(prices_srl.data
    #                     , safe=False, json_dumps_params={'ensure_ascii': False})
