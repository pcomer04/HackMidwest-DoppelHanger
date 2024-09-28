from django.db import models
from django.contrib.auth.models import User

class PinataKey(models.Model):
    value = models.CharField(max_length=255)

    def __str__(self):
        return self.value

class Image(models.Model):
    # TODO: fix this so that user can't be blank (did for debugging purposes)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    upload_time = models.DateTimeField(auto_now_add=True)
    uploaded_image = models.OneToOneField(PinataKey, related_name="original_pinata_key", null=True, on_delete=models.CASCADE)
    returned_image = models.ManyToManyField(PinataKey, related_name="processed_pinata_key")

    def __str__(self):
        return "this is a test"
        return f"Image uploaded by {self.user.username} at time: {self.upload_time}"