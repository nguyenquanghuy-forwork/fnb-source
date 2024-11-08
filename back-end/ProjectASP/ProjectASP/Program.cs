using NSwag;
using ProjectASP.API;
using ProjectASP.Services;
using ProjectASP.Common.Wrappers;
using ProjectASP.Application;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container
builder.Services.AddControllers();

// Add NSwag document
builder.Services.AddOpenApiDocument(options => {
    options.PostProcess = document =>
    {
        var releaseVersion = configuration.GetValue<string>("ReleaseVersion");
        document.Info = new OpenApiInfo
        {
            //Version = "v1",
            Title = "API Document - ReleaseVersion " + releaseVersion,
            Description = "ASP.NET Core Web API",
            Contact = new OpenApiContact
            {
                Name = "Romio Nguyen",
                Url = "#"
            },
            License = new OpenApiLicense
            {
                Name = "MIT",
                Url = "#"
            }
        };
    };
});


// Add custom services layers
builder.Services
    .AddInitServices(configuration)
    .AddIdentityInfrastructure(configuration)
    .RegisterApplicationInsightsLogging(configuration)
    .AddInvalidModelStateResponse();

builder.Services.AddApplicationServices();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS", policy =>
    {
        policy.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

// Use appsettings tokenized on production enviroment
if (builder.Environment.IsProduction())
{
    builder.Configuration.AddJsonFile(
      "appsettings.Tokenized.json",
      optional: false, reloadOnChange: true
    );
}

var app = builder.Build();

app.UseResponseWrapper();

//remove enableSwagger avoid error build-api from front end
app.UseOpenApi();
app.UseSwaggerUi();

// Configure the HTTP request pipeline.
app.UseCors("CORS");
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
