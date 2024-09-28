from django.db import models
from django.contrib.auth.models import User

class PinataKey(models.Model):
    value = models.CharField(max_length=255)

    def __str__(self):
        return self.value

class Image(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    upload_time = models.DateTimeField(auto_now_add=True)
    uploaded_image = models.OneToOneField(PinataKey, related_name="original_pinata_key", null=True, on_delete=models.CASCADE)
    returned_image = models.ManyToManyField(PinataKey, related_name="processed_pinata_key", null=True)

    def __str__(self):
        return f"Image uploaded by {self.user.username} at time: {self.upload_time}"