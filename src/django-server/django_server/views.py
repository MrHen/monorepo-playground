from django.http import JsonResponse, HttpResponse

def hello(request):
    return JsonResponse({ 'hello': 'world' })

def status(request):
    return JsonResponse(None, safe=False)

def not_found(request):
    return JsonResponse({ 'message': 'ERROR_ROUTE_NOT_FOUND' }, status=404)
