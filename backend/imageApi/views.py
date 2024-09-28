from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Image, PinataKey
from .serializers import ImageSerializer, UserSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .pinata.pinataUpload import uploadToPinata

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
        
"""
    POST
    {
        "user": "charlie",
        "upload_time": "2024-09-28T12:34:56Z",
        "uploaded_image": "QmZX9URubeKBth3fMkFzdVS74KGdG7Sm2ExghypmGuwMCb", 
        "returned_image": "QmZX9URubeKBth3fMkFzdVS74KGdG7Sm2ExghypmGuwMC"
    }
"""

class UploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        image_file = request.FILES.get('image')
        if not image_file:
            return Response({"error": "no image uploaded"}, status=400)
        try:
            # Call the function to upload to Pinata

            # TODO: preprocess image

            original_img_cid = uploadToPinata(image_file)
            original_key = PinataKey.objects.create(value=original_img_cid)
            image_obj = Image.objects.create(user=request.user, uploaded_image=original_key)

            # send image to AI model and get images back
            # send images to pinata
            # image_obj.returned_image.add(key)

            """
            
            processed_images_cids = process_image(original_img_cid)  # Replace with your actual AI processing function

            # Step 4: Upload processed images to Pinata and associate with Image object
            pinata_keys = []  # This will hold the created PinataKey objects
            for cid in processed_images_cids:
                pinata_key = PinataKey.objects.create(key=cid)  # Create a new PinataKey object for each CID
                pinata_keys.append(pinata_key)

            # Step 5: Add all the PinataKey objects to the returned_image field
            image_obj.returned_image.add(*pinata_keys)
            """
            return Response({
                "message": "succesfully uploaded and received hashes from pinata"
            }, status=201)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
    
    def get(self, request):
        try:
            images = Image.objects.filter(user=request.user)
            serialized_images = ImageSerializer(images, many=True)
            return Response(serialized_images.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=500)