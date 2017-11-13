from django.http import JsonResponse

def hello(request):
    return JsonResponse({ 'hello': 'world' })

def status(request):
    return JsonResponse
