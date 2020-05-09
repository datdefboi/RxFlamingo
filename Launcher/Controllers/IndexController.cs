using Microsoft.AspNetCore.Mvc;

[Route("/")]
public class IndexController : Controller
{
    [HttpGet]
    public IActionResult Index()
    {
        return File("index.html", "text/html");
    }
}