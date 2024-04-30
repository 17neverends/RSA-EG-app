from backend.cryptoactions import CryptographyActions

crypto = CryptographyActions()

async def eg_sign(message: str) -> str:
    crypto.generate_elgamal_keys()
    return crypto.sign_data_elgamal(message.encode('utf-8'))


async def eg_verify(signature: str, data: str) -> bool:
    return crypto.verify_signature_elgamal(signature=bytes.fromhex(signature), data=data.encode('utf-8'))


async def calculate_public_key_eg(g, x, p):
    return pow(g, x, p)

async def sign_message_eg(m, k, g, x, p):
    r = pow(g, k, p)
    k_inv = pow(k, -1, p-1)
    s = (k_inv * (m - x*r)) % (p-1)
    return r, s

async def verify_signature_eg(m, r, s, g, y, p):
    left = (pow(y, r, p) * pow(r, s, p)) % p
    right = pow(g, m, p)
    return left == right