# DiffResults

Many differentiation techniques can calculate primal values and multiple orders of
derivatives simultaneously. In other words, there are techniques for computing `f(x)`,
`∇f(x)` and `H(f(x))` in one fell swoop!

For this purpose, DiffResults provides the `DiffResult` type, which can be passed
to in-place differentiation methods instead of an output buffer. The method
then loads all computed results into the given `DiffResult`, which the user
can then query afterwards.
