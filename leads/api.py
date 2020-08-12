from leads.models import Lead
from rest_framework import viewsets, permissions
from leads.serializers import LeadSerializer


class LeadViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This is going to retrieve only the leads created by
        the logged in user
        """
        return self.request.user.leads.all()

    serializer_class = LeadSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)