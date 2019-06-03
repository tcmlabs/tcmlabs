## Enforcing business invariants at run time: runtime type checking with type combinators

Some behavior cannot be enforced at build time in Python, simply because the values are not known. For example, one cannot enforce that a function will be called with positive integers (natural numbers). The Python type system cannot help us here.

For this, a programmer can use [PyComb](https://github.com/fcracker79/pycomb), a Python type combinator library which happens to be a port of the [tcomb](https://github.com/gcanti/tcomb) JavaScript type combinator library.

Type combinators, amongst other things, help us define subset of types which correspond to values that match a specific predicate.

```python
from pycomb import combinators
from pycomb.decorators import returning

def is_positive(x: int) -> bool:
    return x >= 0

def is_integer(x: int) -> bool:
    return x % 1 == 0

def is_natural(x: int) -> bool:
    return is_positive(x) and is_integer(x)

natural_numbers = combinators.subtype(
    combinators.Int, is_natural, example=42, name="Natural number"
)

@combinators.function(natural_numbers, natural_numbers)
@returning(natural_numbers)
def add(a: int, b: int) -> int:
    return a + b
```

> Note that stricly speaking, checking for `is_integer(x)` isn't really needed here since this should already be handled by static types `(x: int)`. However, because static types can be bypassed, it's sometimes a valid extra precaution to also check this at run time.

The function will behave this way at run time:

```python
add(2, 3)     # OK
add(2, 3.5)   # Fails with "Error on Natural number: expected Natural number but was int"
```

What we've done here is turn business expectations into [predicates](<https://en.wikipedia.org/wiki/Predicate_(mathematical_logic)>) (functions returning booleans). These functions could now also be type-checked, tested and re-used elsewhere in our program, avoiding a lot of code duplication.

The above `@combinators.function` decorator will make the function fail at run time should it be called with any value which happens to be an integer (as defined using the `int` static type annotations), but is not a natural number (a positive integer).

The overhead of checking values could be problematic for performance sensitive application, and the feature can be deactivated in production mode or fully removed if manipulating the AST if for some reasons that extra `if` becomes costly. Most of the time, chances are high that guaranteeing correctness over performance yields greater business benefits. This is true unless high performance also becomes a clearly stated business requirement.

The nice thing about type combinators is that they can be composed and re-used throughout your application. The intuition about them is that they're types with predicates. If you like type combinators, you might also be interested in reading more about [refinement types](https://en.wikipedia.org/wiki/Refinement_type).

## Conclusion

This article highlights how type checking, property-based testing and type combinators can provide some interesting guarantees, at build time and run time. They allow to greatly improve the quality of our program by making invariants explicit and automatically asserted.

At TCM Labs, we tend to use the above approach combined with functions with the following caracteristics:

- small functions: low [arity](https://en.wikipedia.org/wiki/Arity) (often 1-2 args. max), few lines (5-10 max)
- [pure functions](https://en.wikipedia.org/wiki/Pure_function): no [side-effects](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)>), preserve [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency)
- ideally, [total functions](https://en.wikipedia.org/wiki/Partial_function#Total_function): functions which are fully defined for all their input range (in contrast to [partial functions](https://en.wikipedia.org/wiki/Partial_function))

These functions do very few things (ideally, only one thing) and are therefore easier to test and compose. The less things a function does, the higher the chances that we'll be able to make that function right.

The above approach helps us enforce a very high level quality in the code we ship to our customers. We can iterate faster while still delivering features and remaining confident that we're not breaking existing features. Using these techniques is also a key part when refactoring existing code, since refactoring testing code lessens the chance to break business expectations.

---

Interesting in joining TCM Labs? We're hiring consultants/software engineers in Paris. We do functional programming, DevOps and cloud automation and focus on shipping quality applications to our customer.
