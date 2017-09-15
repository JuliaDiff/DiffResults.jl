var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Documentation",
    "title": "Documentation",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#DiffResults-1",
    "page": "Documentation",
    "title": "DiffResults",
    "category": "section",
    "text": "CurrentModule = DiffResultsMany differentiation techniques can calculate primal values and multiple orders of derivatives simultaneously. In other words, there are techniques for computing f(x), ∇f(x) and H(f(x)) in one fell swoop!For this purpose, DiffResults provides the DiffResult type, which can be passed to in-place differentiation methods instead of an output buffer. The method then loads all computed results into the given DiffResult, which the user can then query afterwards.Here's an example of DiffResult in action using ForwardDiff:julia> using ForwardDiff, DiffResults\n\njulia> f(x) = sum(sin, x) + prod(tan, x) * sum(sqrt, x);\n\njulia> x = rand(4);\n\n# construct a `DiffResult` with storage for a Hessian, gradient,\n# and primal value based on the type and shape of `x`.\njulia> result = DiffResults.HessianResult(x)\n\n# Instead of passing an output buffer to `hessian!`, we pass `result`.\n# Note that we re-alias to `result` - this is important! See `hessian!`\n# docs for why we do this.\njulia> result = ForwardDiff.hessian!(result, f, x);\n\n# ...and now we can get all the computed data from `result`\njulia> DiffResults.value(result) == f(x)\ntrue\n\njulia> DiffResults.gradient(result) == ForwardDiff.gradient(f, x)\ntrue\n\njulia> DiffResults.hessian(result) == ForwardDiff.hessian(f, x)\ntrueThe rest of this document describes the API for constructing, accessing, and mutating DiffResult instances. For details on how to use a DiffResult with a specific package's methods, please consult that package's documentation."
},

{
    "location": "index.html#DiffResults.DiffResult",
    "page": "Documentation",
    "title": "DiffResults.DiffResult",
    "category": "Type",
    "text": "DiffResult(value::Union{Number,AbstractArray}, derivs::Tuple{Vararg{Number}})\nDiffResult(value::Union{Number,AbstractArray}, derivs::Tuple{Vararg{AbstractArray}})\n\nReturn r::DiffResult, with output value storage provided by value and output derivative storage provided by derivs.\n\nIn reality, DiffResult is an abstract supertype of two concrete types, MutableDiffResult and ImmutableDiffResult. If all value/derivs are all Numbers or SArrays, then r will be immutable (i.e. r::ImmutableDiffResult). Otherwise, r will be mutable (i.e. r::MutableDiffResult).\n\nNote that derivs can be provide in splatted form, i.e. DiffResult(value, derivs...).\n\n\n\n"
},

{
    "location": "index.html#DiffResults.JacobianResult",
    "page": "Documentation",
    "title": "DiffResults.JacobianResult",
    "category": "Function",
    "text": "JacobianResult(x::AbstractArray)\n\nConstruct a DiffResult that can be used for Jacobian calculations where x is the input to the target function. This method assumes that the target function's output dimension equals its input dimension.\n\nNote that JacobianResult allocates its own storage; x is only used for type and shape information. If you want to allocate storage yourself, use the DiffResult constructor instead.\n\n\n\nJacobianResult(y::AbstractArray, x::AbstractArray)\n\nConstruct a DiffResult that can be used for Jacobian calculations where x is the input to the target function, and y is the output (e.g. when taking the Jacobian of f!(y, x)).\n\nLike the single argument version, y and x are only used for type and shape information and are not stored in the returned DiffResult.\n\n\n\n"
},

{
    "location": "index.html#DiffResults.GradientResult",
    "page": "Documentation",
    "title": "DiffResults.GradientResult",
    "category": "Function",
    "text": "GradientResult(x::AbstractArray)\n\nConstruct a DiffResult that can be used for gradient calculations where x is the input to the target function.\n\nNote that GradientResult allocates its own storage; x is only used for type and shape information. If you want to allocate storage yourself, use the DiffResult constructor instead.\n\n\n\n"
},

{
    "location": "index.html#DiffResults.HessianResult",
    "page": "Documentation",
    "title": "DiffResults.HessianResult",
    "category": "Function",
    "text": "HessianResult(x::AbstractArray)\n\nConstruct a DiffResult that can be used for Hessian calculations where x is the input to the target function.\n\nNote that HessianResult allocates its own storage; x is only used for type and shape information. If you want to allocate storage yourself, use the DiffResult constructor instead.\n\n\n\n"
},

{
    "location": "index.html#Constructing-a-DiffResult-1",
    "page": "Documentation",
    "title": "Constructing a DiffResult",
    "category": "section",
    "text": "DiffResults.DiffResult\nDiffResults.JacobianResult\nDiffResults.GradientResult\nDiffResults.HessianResult"
},

{
    "location": "index.html#DiffResults.value",
    "page": "Documentation",
    "title": "DiffResults.value",
    "category": "Function",
    "text": "value(r::DiffResult)\n\nReturn the primal value stored in r.\n\nNote that this method returns a reference, not a copy.\n\n\n\n"
},

{
    "location": "index.html#DiffResults.derivative",
    "page": "Documentation",
    "title": "DiffResults.derivative",
    "category": "Function",
    "text": "derivative(r::DiffResult, ::Type{Val{i}} = Val{1})\n\nReturn the ith derivative stored in r, defaulting to the first derivative.\n\nNote that this method returns a reference, not a copy.\n\n\n\n"
},

{
    "location": "index.html#DiffResults.gradient",
    "page": "Documentation",
    "title": "DiffResults.gradient",
    "category": "Function",
    "text": "gradient(r::DiffResult)\n\nReturn the gradient stored in r.\n\nEquivalent to derivative(r, Val{1}).\n\n\n\n"
},

{
    "location": "index.html#DiffResults.jacobian",
    "page": "Documentation",
    "title": "DiffResults.jacobian",
    "category": "Function",
    "text": "jacobian(r::DiffResult)\n\nReturn the Jacobian stored in r.\n\nEquivalent to derivative(r, Val{1}).\n\n\n\n"
},

{
    "location": "index.html#DiffResults.hessian",
    "page": "Documentation",
    "title": "DiffResults.hessian",
    "category": "Function",
    "text": "hessian(r::DiffResult)\n\nReturn the Hessian stored in r.\n\nEquivalent to derivative(r, Val{2}).\n\n\n\n"
},

{
    "location": "index.html#Accessing-data-from-a-DiffResult-1",
    "page": "Documentation",
    "title": "Accessing data from a DiffResult",
    "category": "section",
    "text": "DiffResults.value\nDiffResults.derivative\nDiffResults.gradient\nDiffResults.jacobian\nDiffResults.hessian"
},

{
    "location": "index.html#DiffResults.value!",
    "page": "Documentation",
    "title": "DiffResults.value!",
    "category": "Function",
    "text": "value!(r::DiffResult, x)\n\nReturn s::DiffResult with the same data as r, except for value(s) == x.\n\nThis function may or may not mutate r. If r::ImmutableDiffResult, a totally new instance will be created and returned, whereas if r::MutableDiffResult, then r will be mutated in-place and returned. Thus, this function should be called as r = value!(r, x).\n\n\n\nvalue!(f, r::DiffResult, x)\n\nEquivalent to value!(r::DiffResult, map(f, x)), but without the implied temporary allocation (when possible).\n\n\n\n"
},

{
    "location": "index.html#DiffResults.derivative!",
    "page": "Documentation",
    "title": "DiffResults.derivative!",
    "category": "Function",
    "text": "derivative!(r::DiffResult, x, ::Type{Val{i}} = Val{1})\n\nReturn s::DiffResult with the same data as r, except derivative(s, Val{i}) == x.\n\nThis function may or may not mutate r. If r::ImmutableDiffResult, a totally new instance will be created and returned, whereas if r::MutableDiffResult, then r will be mutated in-place and returned. Thus, this function should be called as r = derivative!(r, x, Val{i}).\n\n\n\nderivative!(f, r::DiffResult, x, ::Type{Val{i}} = Val{1})\n\nEquivalent to derivative!(r::DiffResult, map(f, x), Val{i}), but without the implied temporary allocation (when possible).\n\n\n\n"
},

{
    "location": "index.html#DiffResults.gradient!",
    "page": "Documentation",
    "title": "DiffResults.gradient!",
    "category": "Function",
    "text": "gradient!(r::DiffResult, x)\n\nReturn s::DiffResult with the same data as r, except gradient(s) == x.\n\nEquivalent to derivative!(r, x, Val{1}); see derivative! docs for aliasing behavior.\n\n\n\ngradient!(f, r::DiffResult, x)\n\nEquivalent to gradient!(r::DiffResult, map(f, x)), but without the implied temporary allocation (when possible).\n\nEquivalent to derivative!(f, r, x, Val{1}); see derivative! docs for aliasing behavior.\n\n\n\n"
},

{
    "location": "index.html#DiffResults.jacobian!",
    "page": "Documentation",
    "title": "DiffResults.jacobian!",
    "category": "Function",
    "text": "jacobian!(r::DiffResult, x)\n\nReturn s::DiffResult with the same data as r, except jacobian(s) == x.\n\nEquivalent to derivative!(r, x, Val{1}); see derivative! docs for aliasing behavior.\n\n\n\njacobian!(f, r::DiffResult, x)\n\nEquivalent to jacobian!(r::DiffResult, map(f, x)), but without the implied temporary allocation (when possible).\n\nEquivalent to derivative!(f, r, x, Val{1}); see derivative! docs for aliasing behavior.\n\n\n\n"
},

{
    "location": "index.html#DiffResults.hessian!",
    "page": "Documentation",
    "title": "DiffResults.hessian!",
    "category": "Function",
    "text": "hessian!(r::DiffResult, x)\n\nReturn s::DiffResult with the same data as r, except hessian(s) == x.\n\nEquivalent to derivative!(r, x, Val{2}); see derivative! docs for aliasing behavior.\n\n\n\nhessian!(f, r::DiffResult, x)\n\nEquivalent to hessian!(r::DiffResult, map(f, x)), but without the implied temporary allocation (when possible).\n\nEquivalent to derivative!(f, r, x, Val{2}); see derivative! docs for aliasing behavior.\n\n\n\n"
},

{
    "location": "index.html#Mutating-a-DiffResult-1",
    "page": "Documentation",
    "title": "Mutating a DiffResult",
    "category": "section",
    "text": "DiffResults.value!\nDiffResults.derivative!\nDiffResults.gradient!\nDiffResults.jacobian!\nDiffResults.hessian!"
},

]}
