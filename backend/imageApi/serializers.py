from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Image, PinataKey

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class PinataKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = PinataKey
        fields = ['id', 'value']  # Include any fields you want to expose

class ImageSerializer(serializers.ModelSerializer):
    uploaded_image = PinataKeySerializer()
    returned_1 = PinataKeySerializer(allow_null=True)
    returned_2 = PinataKeySerializer(allow_null=True)
    returned_3 = PinataKeySerializer(allow_null=True)

    class Meta:
        model = Image
        fields = ['id', 'user', 'upload_time', 'uploaded_image', 'returned_1', 'returned_2', 'returned_3']


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        # Create a new user
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '')
        )
        return user