import pytest

from hypothesis import given, example
from hypothesis.strategies import integers


from calculus import add


def test_addition():
    assert add(2, 3) == 5


some_additions = [
    #
    ((3, 5), 8),
    ((2, 4), 6),
    ((6, 9), 15),
]


@pytest.mark.parametrize("test_input,expected", some_additions)
def test_addition_parametrized(test_input, expected):
    [a, b] = test_input
    assert add(a, b) == expected


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
    assert add(a, 0) == a
