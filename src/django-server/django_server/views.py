from django.http import JsonResponse, HttpResponse

def hello(request):
    return JsonResponse({ 'hello': 'world' })

def status(request):
    return JsonResponse(None, safe=False)
