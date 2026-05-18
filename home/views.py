from django.shortcuts import render


def index(request):
    programs = [
        {
            "title": "AI Literacy for Bharat",
            "body": "Practical foundations in AI, data, safety, and responsible use for students, teachers, and community leaders.",
        },
        {
            "title": "Startup & Builder Labs",
            "body": "Hands-on cohorts that help founders prototype AI products for agriculture, education, healthcare, and public services.",
        },
        {
            "title": "Research to Reality",
            "body": "A bridge between universities, civic institutions, and industry teams working on India-scale technology problems.",
        },
    ]
    metrics = [
        ("28", "state chapters planned"),
        ("100K+", "learners goal"),
        ("12", "domain tracks"),
    ]
    return render(
        request,
        "home/index.html",
        {
            "programs": programs,
            "metrics": metrics,
        },
    )
