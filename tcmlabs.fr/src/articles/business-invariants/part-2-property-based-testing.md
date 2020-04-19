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
