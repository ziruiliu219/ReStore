using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;

namespace API.MiddleWare
{
   
    public class ExceptionMiddleWare
    {
            private readonly RequestDelegate _next;
            private readonly ILogger<ExceptionMiddleWare>_logger;
            private readonly IHostEnvironment _env;
            public ExceptionMiddleWare(RequestDelegate next,ILogger<ExceptionMiddleWare> logger,
                IHostEnvironment env)
            {
                _env=env;
                _logger=logger;
                _next=next;
            }
            public async Task InvokeAsync(HttpContext context)
            {
                try
                {
                    await _next(context);
                }
                catch(Exception ex)
                {
                    _logger.LogError(ex,ex.Message);
                    context.Response.ContentType="application/json";
                    context.Response.StatusCode=500;
                    var response=new ProblemDetails
                    {
                        Status=500,
                        Detail=_env.IsDevelopment()? ex.StackTrace?.ToString():null,
                        Title=ex.Message
                    };
                    var options=new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};
                    var json=JsonSerializer.Serialize(response,options);
                    await context.Response.WriteAsync(json);
                }
            }
    }
}