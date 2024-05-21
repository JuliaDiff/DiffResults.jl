module StaticArraysExt

using DiffResults, StaticArrays

import DiffResults: DiffResult, ImmutableDiffResult, GradientResult, JacobianResult, HessianResult, derivative!
using DiffResults: value, tuple_setindex

DiffResult(value::Number, derivs::Tuple{Vararg{StaticArray}}) = ImmutableDiffResult(value, derivs)
DiffResult(value::StaticArray, derivs::Tuple{Vararg{StaticArray}}) = ImmutableDiffResult(value, derivs)

GradientResult(x::StaticArray) = DiffResult(first(x), x)

JacobianResult(x::StaticArray) = DiffResult(x, zeros(StaticArrays.similar_type(typeof(x), Size(length(x),length(x)))))
JacobianResult(y::StaticArray, x::StaticArray) = DiffResult(y, zeros(StaticArrays.similar_type(typeof(x), Size(length(y),length(x)))))

HessianResult(x::StaticArray) = DiffResult(first(x), x, zeros(StaticArrays.similar_type(typeof(x), Size(length(x),length(x)))))

function derivative!(r::ImmutableDiffResult, x::Union{Number,StaticArray}, ::Type{Val{i}} = Val{1}) where {i}
    return ImmutableDiffResult(value(r), tuple_setindex(r.derivs, x, Val{i}))
end
function derivative!(f, r::ImmutableDiffResult, x::StaticArray, ::Type{Val{i}} = Val{1}) where {i}
    return derivative!(r, map(f, x), Val{i})
end

end
