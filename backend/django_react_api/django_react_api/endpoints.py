"""
Custom API endpoints go here. This includes Wagtail endpoints.]
"""

from wagtail.api.v2.views import BaseAPIViewSet
from web_api.models import Game

class GameModelAPIViewset(BaseAPIViewSet):
    """ The Wagtail way of adding models to an endpoint in their API. """

    model = Game

    body_fields = BaseAPIViewSet.body_fields + [
        'title'
    ]

    listing_default_fields = BaseAPIViewSet.listing_default_fields = [
        'title'
    ]
