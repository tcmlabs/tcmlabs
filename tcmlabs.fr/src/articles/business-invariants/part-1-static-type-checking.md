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
