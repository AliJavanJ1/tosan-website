from rest_framework import serializers
from .models import *


class PageSerializer(serializers.Serializer):
    key = serializers.CharField(required=False, allow_blank=False, max_length=100)
    value = serializers.CharField(required=False, allow_blank=True, max_length=5000)
    file = serializers.FileField(required=False, allow_null=True, use_url=True)

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return MainPageData.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.key = validated_data.get('key', instance.key)
        instance.value = validated_data.get('value', instance.value)
        instance.file = validated_data.get('file', instance.file)
        instance.save()
        return instance
