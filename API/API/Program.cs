using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();


app.MapGet("/", () => "Prova A2");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5000/api/categoria/listar
app.MapGet("/api/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5000/api/categoria/cadastrar
app.MapPost("/api/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//GET: http://localhost:5000/api/tarefas/buscar/{tarefaId}
app.MapGet("/api/tarefas/buscar/{tarefaId}", ([FromRoute] string tarefaId,
    [FromServices] AppDataContext ctx) =>
{
    Tarefa? tarefa = ctx.Tarefas.Find(tarefaId);
    if (tarefa == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(tarefa);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5000/api/tarefas/listar
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.Include(x => x.Categoria).ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5000/api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//PUT: http://localhost:5000/api/tarefas/alterar/{tarefaId}
app.MapPut("/api/tarefas/alterar/{tarefaId}", ([FromServices] AppDataContext ctx, [FromRoute] string tarefaId, [FromBody] Tarefa tarefaAlterada) =>
{
//Implementar a alteração do status da tarefa
    Tarefa? tarefa = ctx.Tarefas.Find(tarefaId);
    if (tarefa == null)
    {
        return Results.NotFound();
    }
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria is null)
    {
        return Results.NotFound();
    }
    tarefa.Categoria = categoria;
    tarefa.Titulo = tarefaAlterada.Titulo;
    tarefa.Descricao = tarefaAlterada.Descricao;
    tarefa.Status = tarefaAlterada.Status;
    ctx.Tarefas.Update(tarefa);
    ctx.SaveChanges();
    return Results.Ok(tarefa);
});

//GET: http://localhost:5000/tarefas/naoconcluidas
app.MapGet("/api/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    //Implementar a listagem de tarefas não concluídas
    var naoConcluidas = ctx.Tarefas.Where(x => x.Status == "Não iniciada" && x.Status == "Em andamento").ToList();
    if (naoConcluidas.Any())
    {
        return Results.Ok(naoConcluidas);
    }
    return Results.NotFound();
});

//GET: http://localhost:5000/tarefas/concluidas
app.MapGet("/api/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    //Implementar a listagem de tarefas concluídas
    var concluidas = ctx.Tarefas.Where(x => x.Status == "Concluída").ToList();
    if (concluidas.Any())
    {
        return Results.Ok(concluidas);
    }
    return Results.NotFound();
});

app.UseCors("Acesso Total");

app.Run();