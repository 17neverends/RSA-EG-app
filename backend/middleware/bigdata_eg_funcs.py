import random
from sympy import gcd, mod_inverse, isprime

def generate_keypair_eg_bd(p, g):
    private_key = random.randint(2, p-2)
    public_key = pow(g, private_key, p)
    return private_key, public_key

def sign_eg_bd(message, p, g, private_key):
    k = random.randint(2, p-2)
    while gcd(k, p-1) != 1:
        k = random.randint(2, p-2)
    r = pow(g, k, p)
    k_inv = mod_inverse(k, p-1)
    if k_inv is None:
        raise ValueError("Невозможно найти обратное значение для k")
    s = (message - private_key * r) * k_inv % (p - 1)
    return r, s

def verify_eg_bd(message, signature, p, g, public_key):
    r, s = signature
    if not (0 < r < p and 0 < s < p-1):
        return False
    v1 = pow(g, message, p)
    v2 = (pow(public_key, r, p) * pow(r, s, p)) % p
    return v1 == v2