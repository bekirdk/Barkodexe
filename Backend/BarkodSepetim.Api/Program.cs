using BarkodSepetim.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// CORS Politikası Tanımlaması
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000") // React uygulamanızın adresi
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});
// --- CORS Bitiş ---

// Veritabanı Bağlantı Cümlesini Al
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<BarkodSepetimDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// --- CORS Middleware Kullanımı ---
app.UseCors(MyAllowSpecificOrigins); // Bu satırı UseHttpsRedirection'dan ÖNCE ekleyin
// --- CORS Bitiş ---

app.UseHttpsRedirection();
app.MapControllers();
app.Run();