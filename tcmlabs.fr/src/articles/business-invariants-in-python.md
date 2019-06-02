# Enforcing business invariants in Python: type-checking, property-based testing and type combinators

An application, or "program", is a set of instructions given to a computer. This program is expected to behave in a very specific way, that is, closely follow a set of strict business expectations, or invariants.

This article highlights the common tools we use at TCM Labs to enforce code quality in the programs that we ship to our customers. We often work with data scientists and data engineers, so examples will be given in the Python programming language.

We'll be exploring a simple business domain, arithmetics, and implement a `calculus` module with an `add()` function that we expect to work on natural numbers only.

## The problem

At run time, ie. when the application is live and end-users are interacting with it, the Python runtime accepts calling a function with any kind of values, and not just with a subset of all values which makes sense from a business point of view.

Before we go further, let's establish a bit of terminology:

- at "run time" (two words) refers to when [an application is running](<https://en.wikipedia.org/wiki/Run_time_(program_lifecycle_phase)>), in contrast to [compile time](Compile_time), which is _before_ an application is running.
- a "runtime" (single word) refers to [an execution environment](https://en.wikipedia.org/wiki/Runtime_system) (ie. Python or Node.js interpreters, a browser, etc.)

In Python, avoiding bugs at run time is a responsibility which is mostly left to the programmer. More precisely, this responsability is ensuring that all functions are called with expected values, and each of them return values that make sense.

Typically, these checks are:

- not done at all within the function
- left to the responsability of the caller
- done in the function with a few asserts which only check for some values
- making the function `None` if some checks fail
- manually done with known "good" values and visually tested only, using the Python REPL or Jupyter notebook, but missing many of the "bad" values that could exist at run time

Some of the risks are:

- shipping a code which may not handle all business use cases, or a code that may perform differently on some edge use cases that were missed
- calling functions with values that have no business representation, but still called due to other functions returning "bad" values (`None`, etc.). It is important to understand that these bad values will flow through the functions until one can't handle it, making the program fail.

In Python, nothing prevents a developer from **_not_** calling a function with values that doesn't mean anything from a business point of view, unless the developer takes care of it at run time. Put it the other way, Python accepts (at run time) calling a function with unintended values. Nothing will automatically check that values are expected, meaningful for the business and therefore allowed in our program.

However, some guards can be applied and help us enforce business invariants: we can enforce quality in our programs by increasing the level of confidence we have in its behavior and help reduce the number of bugs, all of this by making as many business expectations explicit. These business expectations are typically described in the description of user stories found in the application backlog.

In certain cases, some guards allow specific class of bugs to be totally eliminated and guarantee that they can no longer exist in the program.

In this article, we'll review three techniques which help us achieve this goal:

- static type-checking
- property-based (unit) testing
- run time type checking with type combinators

We'll divide this article between:

- invariants that can be checked at build time and test time: static-type checking and property-based testing (before it's too late)
- invariants that can be checked at run time: type combinators (after it's too late)

Our business domain will be related to the addition of natural numbers, and we'll be implementing a simple `calculus` module with an `add()` function. Examples will be given in Python, though we use this approach in other languages as well (including JavaScript/TypeScript).

## Enforcing invariants before shipping to production: static type-checking and property-based unit testing

These sections correspond to checks that are executed at build time and test time: before the program has a chance to even run with real user/customer traffic. These checks can prevent errors which can be made apparent simply by statically analyzing the code and figuring out what it does.

### Static type checking with Python type hints

[Type checking in Python](https://docs.python.org/3/library/typing.html) is done using type hints, which were introduced experimentally in Python 3.5 and are now an official feature of the language (see, [PEP 483](https://www.python.org/dev/peps/pep-0483/), [484](https://www.python.org/dev/peps/pep-0484/) and [526](https://www.python.org/dev/peps/pep-0526/)).

Type hints adds an extra syntax to the source code which indicates the types of variables. According to Wikipedia, _"[a data type or simply type](<(https://en.wikipedia.org/wiki/Data_type)>) is an attribute of data which tells the compiler or interpreter how the programmer intends to use the data"_.

Some of the benefits of type hints:

- checks whether a function is called with arguments whose values are of some expected types, and correspondingly returns values of the expected type (same, or different type)
- automatically document code for a human programmer, avoiding duplication of code in comments (which we see as paraphrasing)

To enable type checking in the IDE, we use [flake8](http://flake8.pycqa.org/en/latest/) + [mypy](http://mypy-lang.org/). Especially, we use [mypy as a flake8 plugin](https://pypi.org/project/flake8-mypy/) since we use flake8 for static analysis that goes beyond type-checking. We also configure our editor of choice (VS Code) to automatically highlights code which contradicts explicitely defined types, in the form of errors underlined in red. Other options to consider could be Facebook's [pyre check](https://pyre-check.org/).

With static type checking, an entire class of bugs can be eliminated by making it impossible to call functions with specific kind of values. What we really want is this:

> "Make illegal states unrepresentable"
>
> --Yaron Minsky, [Effective ML Revisited](https://blog.janestreet.com/effective-ml-revisited/)

Put it another way:

> "Making illegal states unrepresentable is all about statically proving that all runtime values (without exception) correspond to valid objects in the business domain."
>
> --John De Goes, https://twitter.com/jdegoes/status/1089949149628375040?s=20

So instead of coding the following in our `calculus` module:

```python
def add(a, b):
    return a + b
```

We'll clearly indicate the Python interpreter that, in our domain, the `add()` function expects integer types and return integers:

```python
def add (a: int, b: int) -> int:
  return a + b
```

The above definition allows to automatically detects some valid and erroneous behavior in our current business domain:

```python
add(2, 3)       # OK, type checks
add(10, 7)      # OK
add(2, "foo")   # Fails, does not type-check
add(5)          # Fails
add(None, 11)   # Fails
```

Entire class of bugs can be prevented, though not all bugs will disappear as we'll see next. The type checker can detect that we're calling the function in a way which is not intended, with values (or absence of values) that we know doesn't make any sense from a business point of view. When adding numbers, adding integers with strings doesn't make much sense, nor does adding `None` with integers.

However, type checking [has some limitation](https://en.wikipedia.org/wiki/No_Silver_Bullet) and doesn't prevent all mistakes. The following implementation of the `add()` function, although valid as far as types are concerned, is obviously broken:

```python
def add (a: int, b: int) -> int:
  return a + b + 42
```

This will type check:

```python
add(2, 3)       # OK, type checks
add(10, 7)      # OK
```

But calling will return `47` and `59` instead of `5` and `17`, respectively. Obviously, something is broken here. The above function still takes values of type `int` and returns value of type `int`, but it will break the behavior of addition by always adding `42` to all `a` and `b` values. The function is correct from the perspective of types, but is broken in its implementation: it doesn't add integers properly, and always computes erroneous values.

How could we detect this buggy behavior in our program? Let's see how tests can help us and why they are an important complement to types.

### Unit testing: checking the behavior of a program with real values

We've demonstrated how types, although very useful, doesn't guard us against some programming mistakes. To those unfamiliar with tests, they are simply a program which automatically tests another program. Let's see how we can leverage tests to verify that our `add()` function behaves as expected.

#### Testing with known values: fixed values and fixtures

The first approach is to test our function with a set of inputs and assert that the outputs match a set of expectations, respectively. The following examples assume that you're a bit familiar with the pytest library; if not, the [pytest tutorial](https://docs.pytest.org/en/latest/getting-started.html) will get you started.

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

Test's passing, everything's good. However, this results in a bit of code duplication and we could be copy/pasting several `def test_*` functions with whatever values cross our mind in order to verify that our `add()` function behaves as expected.

In order to avoid duplication, [pytest allows parametrizing tests](https://docs.pytest.org/en/latest/parametrize.html) and automatically execute the same test function with different values (see, `@pytest.mark.parametrize` decorator):

```python
import pytest

some_additions = [
    ((3, 5), 8),
    ((2, 4), 6),
    ((6, 9), 15),
]

@pytest.mark.parametrize("test_input,expected", some_additions)
def test_many_additions(test_input, expected):
    [a, b] = test_input
    assert add(a, b) == expected
```

Using Pytest fixtures helps reduce the verbosity. Although we've de-duplicated our tests into data structures executed multiple times against a single test function, this still doesn't scale very well and obviously doesn't test all possible `int` values which could be passed to our `add()` function.

But wait. What if we could _generate_ the inputs, instead of relying on manually written entries? The thing is that we would still have to know ahead of time what the output would be, for each generated input. Generated (unknown) inputs requiring known values to be tested against - we're stuck. Deriving that output from the input passed to the function we wish to test wouldn't help much, as our tests would be relying on the behavior of the function that we're trying to test. This is a no go, we wouldn't be testing anything.

Let's see how we can generate test data and test our `add()` function against thousands of values, while still having no clue of the expected outputs are. We'll actually not care about output values, but care about something deeper in our `add()` function.

#### Unit testing with unknown values: property-based testing

The next step beyond unit tests with pytest's parametrized fixtures consists of asserting whether specific function properties always hold true for any values included in its domain for which the function is defined. This sounds kind of mathematical ("for all x, there exist... such as..."), and that is precisely what we're going to do.

Ideally, we should be checking our function against all possible values (but this input could be huge, possibly infinite), or we could be testing against a subset of randomly-generated data.

Let's take a moment to think about what the properties of addition are.

Considering the `add()` function above, some properties of addition that we'd like to check for all integers could be:

- [associativity](https://en.wikipedia.org/wiki/Associative_property): `(a + b) + c == a + (b + c)`
- [commutativity](https://en.wikipedia.org/wiki/Commutative_property): `a + b == b + a`
- [additive identity](https://en.wikipedia.org/wiki/Additive_identity) (neutral element): `a + 0 = a = 0 + a`

In order to test these properties, we'll be using the [Python hypothesis library](https://hypothesis.readthedocs.io/en/latest/) which offers a very powerful way to do property-based testing of our functions. We recommend that you read the [excellent introduction](https://hypothesis.readthedocs.io/en/latest/quickstart.html) in the library official documentation.

Back to our `add()` function. Basically, we want a way to check that for all x where x is an integer, our implementation of the `add()` function preserves the associativity, commutativity and identity mathematical properties of the addition.

These three properties can be tested this way:

```python
@given(integers(), integers())
def test_addition_commutativity(a, b):
    assert add(a, b) == add(b, a)

@given(integers(), integers(), integers())
def test_addition_associativity(a, b, c):
    assert add(a, add(b, c)) == add(add(a, b), c)

@given(integers())
def test_addition_additive_identity(a):
    assert add(a, 0) == a == add(0, a)
```

What the Hypothesis library does is generate thousand of random values, pass these values to the test functions, and help us detect values for which some properties of addition implementation no longer hold true by narrowing values until it finds one for which the test certainly fails.

### Combining type checking and tests: preventing deployment of faulty programs to production

During a continuous integration pipeline, code which violates type hints and tests could be spoted almost instantanesouly and one could prevent such code from being deployed to production and shipped to the customer. We simply know, by analysing the source code and running the application in an isolated test environment, that some features are simply broken: they don't match our business expectations. These business expectations, in the present case, are simply the mathematical properties of addition.

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
