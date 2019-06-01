# Enforcing business invariants in Python: type-checking, property-based testing and type combinators

An application, or "program", is a set of instruction given to a computer. This program is expected to behave in a certain way, that is, closely follow a set of strict business expectations, or invariants.

This article highlights the common tools we use at TCM Labs to enforce code quality in the programs that we ship to our customers. We often work with data scientists and data engineers, so examples will be given in the Python programming language.

## The problem

At runtime, ie. when the application is live and end-users are interacting with it, the Python runtime accepts calling a function with any kind of values, and not just with a subset of all values which makes sense from a business point of view.

Most of the responsibility is left to the programmer, that is: ensuring that this function is called with expected values, and returns values that make sense from a business point of view. Typically, these checks are:

- not done at all within the function
- left to the responsability of the caller
- done with a few asserts which only check for some values

Before being deployed to production, some functions are sometimes not tested at all.

In Python, nothing prevents a developer from **_not_** calling a function with values that doesn't mean anything from a business point of view, unless the developer takes care of it at runtime. Put it differently, Python accepts the calling of a function with unintended values. Nothing will check automatically that values are expected, meaningful for the business and therefore allowed in our program.

However, some guards can be applied and help us enforce business invariants (= business expectations): we can enforce quality in our programs by increasing the level of confidence we have in its behavior and help reduce the number of bugs. In certain cases, some class of bugs are totally eliminated and can no longer exist in the program.

In this article, we'll review three tools which help us achieve this goal:

- static type-checking
- property-based (unit) testing
- type combinators

We'll divide this article between:

- invariants that can be checked at build time: static-type checking and property-based testing
- invariants that can be checked at runtime: type combinators

Our business domain will be related to the addition of natural numbers, and we'll be implementing a simple `calculus` module with an `add()` function. Examples will be given in Python, though we use this approach in other languages as well (including JavaScript/TypeScript).

## Enforcing invariants at build time: static type-checking and property-based unit testing

These section corresponds to checks that are executed at build time: before the program has a chance to even run. They can prevent errors which can be made apparent simply by statically analyzing the code and figuring out what it does.

### Static type checking with type-hints

[Type checking in Python](https://docs.python.org/3/library/typing.html) is done using type hints, which were introduced experimentally in Python 3.5 and are now an official feature of the language (see, [PEP 483](https://www.python.org/dev/peps/pep-0483/), [484](https://www.python.org/dev/peps/pep-0484/) and [526](https://www.python.org/dev/peps/pep-0526/)).

Benefits of type hints:

- checks whether a function is called with arguments whose values are of expected type, and returns values of the expected type
- automatically document code, avoiding duplication of code in comments (which we see as paraphrasing)

To enable type checking in the IDE, we use [flake8](http://flake8.pycqa.org/en/latest/) + [mypy](http://mypy-lang.org/). We use [mypy as a flake8 plugin](https://pypi.org/project/flake8-mypy/), since we use flake8 for static analysis that goes beyond type-checking. We also configure our editor of choice (VS Code) to automatically highlights code which contradicts explicitely defined types, in the form of errors underlined in red. Other options to consider could be Facebook's [pyre check](https://pyre-check.org/).

An entire class of bug can be eliminated by making it impossible to call functions with certain kind of values. What we really want is this:

> "Make illegal states unrepresentable"
>
> --Yaron Minsky, [Effective ML Revisited](https://blog.janestreet.com/effective-ml-revisited/)

Put it another way:

> "Making illegal states unrepresentable is all about statically proving that all runtime values (without exception) correspond to valid objects in the business domain."
>
> --John De Goes, https://twitter.com/jdegoes/status/1089949149628375040?s=20

So instead of coding the following:

```python
def add(a, b):
    return a + b
```

We'll clearly indicate the Python interpreter that, in our domain, the `add()` function expects integers and return integers:

```python
def add (a: int, b: int) -> int:
  return a + b
```

The above definition allows to automatically detects some valid and erroneous behavior in our current business domain:

```python
add(2, 3)       # OK, type checks
add(10, 7)      # OK
add(2, "foo")   # KO, does not type-check
add(5)          # KO
add(None, 11)   # KO
```

Entire class of bugs can be prevented, though not all bugs will disappear as we'll see next. The type checker can detect that we're calling the function in a way which is not intended, with values (or absence of values) that we know doesn't make any sense from a business point of view. When adding numbers, adding integers with strings doesn't make much sense, nor does adding `None` with integers makes much more sense.

However, type checking [has some limitation](https://en.wikipedia.org/wiki/No_Silver_Bullet). The following function, although valid as far as types are concerned, is obviously broken:

```python
def add (a: int, b: int) -> int:
  return a + b + 42
```

This will type check:

```python
add(2, 3)       # OK, type checks
add(10, 7)      # OK
```

But calling will return `47` and `59`, instead of `5` and `17`, respectively. Obviously, something is broken here. The above function still takes `int` and returns an `int`, but will break the behavior of addition by adding `42` to all `a` and `b` values. The function is correct from the perspective of types, but is broken in its implementation: it doesn't add integers properly, and always computes erroneous values.

This is why tests are important and nicely complement types. Let's see how.

### Unit testing: checking the behavior of a program with real values

We've demonstrated how types, although very useful, doesn't guard us against some programming mistakes. Tests are simply a program which automatically test another program. Let's see how we can leverage tests to verify that our addition function behaves as expected.

#### Testing with known values: fixed values and fixtures

The first approach is to test our function with a set of inputs and assert that the outputs match a set of expectations, respectively. The following examples assume that you're a bit familiar with pytest; if not, the [pytest tutorial](https://docs.pytest.org/en/latest/getting-started.html) will get you started.

We can define a simple test, which takes a couple integers and verify that the sum equals some value that we know to be correct ahead of time:

```python
def test_addition():
    assert add(2, 3) == 5    # OK, test passes
```

Using the pytest framework, the above test will pass. More tests could be defined, so we could increase the level of confidence in our program. Let's define a second test:

```python
def test_addition_seventeen():
    assert add(10, 7) == 17   # OK, test passes
```

Test's passing, everything's good. However, this results in a bit of code duplication and we could be copy/pasting several `def test_*` functions with whatever values cross our mind.

In order to avoid duplication, [pytest allows parametrizing tests](https://docs.pytest.org/en/latest/parametrize.html) and automatically executing the same test function with different values (see, `@pytest.mark.parametrize` decorator):

```python
import pytest

some_additions = [
    ((3, 5), 8),
    ((2, 4), 6),
    ((6, 9), 15),
]

@pytest.mark.parametrize("test_input,expected", some_additions)
def test_addition_parametrized(test_input, expected):
    [a, b] = test_input
    assert add(a, b) == expected
```

Using Pytest fixtures helps reduce the verbosity. Although we've de-duplicated our tests into data structures executed against a single test function, this still doesn't scale very well and obviously doesn't test all possible `int` values which could be passed to our `add()` function.

But wait. What if we could _generate_ the inputs, instead of relying on manually written entries? The thing is that we would still have to know ahead of time what the output would be, for each generated input. Generated (unknown) inputs requiring known values to be tested against - we're stuck. Deriving that output from the input passed to the function we wish to test wouldn't help much, as our tests would be relying on the behavior of the function that we're trying to test. This is a no go, we wouldn't be testing anything.

Let's see how we can generate test data and test our `add()` function against thousands of values, while still having no clue of the expected outputs are.

#### Unit testing with unknown values: property-based testing

The next step beyond unit tests with fixtures consists of asserting whether certain function properties always hold true for any values included in its domain for which the function is defined. This sounds kind of mathematical ("for all x, there exist..."), and that is precisely what we're going to do.

Ideally, we should be checking our function against all possible values (but this input could be huge, possibly infinite), or we could be testing against a subset of randomly-generated data.

Let's take a moment to think about what the properties of addition are.

Considering the `add()` function above, some properties of addition that we'd like to check could be:

- [associativity](https://en.wikipedia.org/wiki/Associative_property): `(a + b) + c == a + (b + c)`
- [commutativity](https://en.wikipedia.org/wiki/Commutative_property): `a + b == b + a`
- [additive identity](https://en.wikipedia.org/wiki/Additive_identity) (neutral element): `a + 0 = a = 0 + a`

In order to test these properties, we'll be using the [Python hypothesis library](https://hypothesis.readthedocs.io/en/latest/) which offers a very powerful way to do property-based testing of our functions. We recommend that you read the [excellent introduction](https://hypothesis.readthedocs.io/en/latest/quickstart.html) in the library official documentation.

Back to our `add()` function. Basically, we want a way to check that for all x where x is an integer, our implementation of the `add()` function preserves the associativity, commutativity and identity mathematical properties of the addition.

These three properties can be tested this way:

```python
@given(integers(), integers())
@example(a=2, b=3)
def test_addition_commutativity(a, b):
    assert add(a, b) == add(b, a)


@given(integers(), integers(), integers())
@example(a=2, b=3, c=5)
def test_addition_associativity(a, b, c):
    assert add(a, add(b, c)) == add(add(a, b), c)


@given(integers())
def test_addition_neutral_element(a):
    assert add(a, 0) == a == add(0, a)  # TODO: check this
```

What the Hypothesis library does is generate random values, pass these values to the test functions, and help us detect values for which some properties of addition implementation no longer hold true by narrowing values until it finds one for which the test certainly fails.

### Combining type checking and tests: preventing deployment of faulty programs

During a continuous integration pipeline, code which violates type hints and tests could be spoted almost instantanesouly and one could prevent such code from being deployed to production and shipped to the customer. We simply know, by analysing the source code and running the application in an isolated test environment, that some features are simply broken: they don't match our business expectations.

## Enforcing business invariants at run time: runtime type checking with type combinators

Some behavior cannot be enforced at build time in Python, simply because the values are not known. For example, one cannot enforce that a function will be called with positive integers (natural numbers). The Python type system cannot help us here.

For this, one can use [PyComb](https://github.com/fcracker79/pycomb), a Python type combinator library which happens to be a port of [tcomb](https://github.com/gcanti/tcomb) JavaScript type combinator library.

```python
from pycomb import combinators

def is_positive(x: int) -> bool:
    return x >= 0

def is_integer(x: int) -> bool:
    return x % 1 == 0

def is_natural(x: int) -> bool:
    return is_positive(x) and is_integer(x)

natural_numbers = combinators.subtype(combinator.Int, is_natural)

@combinators.function(natural_numbers, natural_numbers) # TODO: check this
def add(a: int, b: int) -> int:
    return a + b
```

The function will behave this way at run time:

```python
# TODO: check this
add(2, 3)     # OK
add(2, 3.5)   # KO
```

We've reified business expectations into predicates (functions returning booleans), which could also be type-checked, tested and re-used elsewhere.

The above decorator will make the function fail at runtime should it be called with any value which happens to be an int (as defined using type annotations), but is not a natural number.

The overhead of checking values could be problematic for performance sensitive application, and the feature can be deactivated in production mode or fully removed if manipulating the AST if for some reasons that extra `if` becomes costly.

The nice thing about type combinators is that they can be composed and re-used throughout your application. The intuition about them is that they're types with predicates. If you like type combinators, you might also be interested in reading more about [refinement types](https://en.wikipedia.org/wiki/Refinement_type).

## Conclusion

This article highlights how type checking, property-based testing and type combinators can provide some interesting guarantees, at build time and run time. They allow to greatly improve the quality of our program by making invariants explicit and automatically asserted.

At TCM Labs, we tend to use the above approach combined with functions with the following caracteristics:

- small functions: low [arity](https://en.wikipedia.org/wiki/Arity) (often 1-2 args. max), few lines (5-10 max)
- [pure functions](https://en.wikipedia.org/wiki/Pure_function): no [side-effects](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)>), preserves [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency)
- ideally, [total functions](https://en.wikipedia.org/wiki/Partial_function#Total_function): functions which are fully defined for all their input range (in contrast to [partial functions](https://en.wikipedia.org/wiki/Partial_function))

These functions do very few things (ideally, only one thing) and are therefore easier to test and compose. The less things a function does, the higher the chances that we'll be able to make that function right.

The above approach helps us enforce a very high level quality in the code we ship to our customers. We can iterate faster while still delivering features and remaining confident that we're not breaking existing features. Using these techniques is also a key part when refactoring existing code, since refactoring testing code lessens the chance to break business expectations.

---

Interesting in joining TCM Labs? We're hiring consultants/software engineers in Paris. We do functional programming, DevOps and cloud automation and focus on shipping quality applications to our customer.
