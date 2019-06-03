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
