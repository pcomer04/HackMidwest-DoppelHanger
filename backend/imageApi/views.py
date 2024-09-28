from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Image
from .serializers import ImageSerializer, UserSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status

"""
{
    "username": "newuser",
    "password": "securepassword123"
}
"""

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            refresh_token = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh_token),
                'access': str(refresh_token.access_token)
            })
        return Response({'error': 'invalid credentials'}, status=400)
"""
{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "securepassword123"
}

"""
class SignUpView(APIView):
    def post(self, request):
        print(request.data)
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        if not username or not password:
            return Response({"error": "username and password required"}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({"error": "username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(username=username, email=email, password=password)
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "user created successfully",
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_201_CREATED)
        


class UploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        file_serializer = ImageSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save(user=request.user)
            return Response(file_serializer.data, status=201)
        else:
            return Response(file_serializer.errors, status=400)

        return Response(content)
    

