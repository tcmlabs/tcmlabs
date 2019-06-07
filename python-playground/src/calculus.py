from pycomb import combinators, context
from pycomb.decorators import returning


class MyObserver(context.ValidationErrorObserver):
    def on_error(self, ctx, expected_type, found_type):
        print("Expected {}, got {}".format(expected_type, found_type))


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
