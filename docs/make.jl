using Documenter, DiffResults

makedocs(modules=[DiffResults],
         doctest = false,
         format = :html,
         sitename = "DiffResults",
         pages = ["Documentation" => "index.md"])

deploydocs(repo = "github.com/JuliaDiff/DiffResults.jl.git",
           osname = "linux",
           julia = "0.6",
           target = "build",
           deps = nothing,
           make = nothing)
