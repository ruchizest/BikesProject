using System;
using Bikes_App.Repositories;
using Bikes_App.Services;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ProductRepository>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BikesDB")));
builder.Services.AddDbContext<SalespersonRepository>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BikesDB")));
builder.Services.AddDbContext<CustomerRepository>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BikesDB")));
builder.Services.AddDbContext<SalesRepository>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BikesDB")));
builder.Services.AddDbContext<SalesDetailsRepository>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BikesDB")));
builder.Services.AddDbContext<DiscountsRepository>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BikesDB")));

builder.Services.AddScoped<SalesDetailsService>();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

var app = builder.Build();
app.UseCors("CorsPolicy");


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
