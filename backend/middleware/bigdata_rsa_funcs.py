import random
from typing import Tuple
from sympy import mod_inverse, gcd

def generate_keypair_rsa_bd(p: int, q: int) -> Tuple[Tuple[int, int], Tuple[int, int]]:
    n = p * q
    phi_n = (p - 1) * (q - 1)
    e = random.randint(2, phi_n - 1)
    while gcd(e, phi_n) != 1:
        e = random.randint(2, phi_n - 1)
    d = mod_inverse(e, phi_n)
    return (e, n), (d, n)

def sign_rsa_bd(message: int, private_key: Tuple[int, int]) -> int:
    d, n = private_key
    signature = pow(message, d, n)
    return signature

def verify_rsa_bd(message: int, signature: int, public_key: Tuple[int, int]) -> bool:
    e, n = public_key
    decrypted_signature = pow(signature, e, n)
    return decrypted_signature == message
