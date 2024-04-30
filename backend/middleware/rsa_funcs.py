from backend.cryptoactions import CryptographyActions

crypto = CryptographyActions()


async def rsa_sign(exp: int, size: int, message: str) -> str:
    crypto.generate_rsa_keys(exp=exp, size=size)
    return crypto.sign_data_rsa(message.encode('utf-8'))


async def rsa_verify(signature: str, data: str) -> bool:
    return crypto.verify_signature_rsa(signature=bytes.fromhex(signature), data=data.encode('utf-8'))


async def rsa_check(m: int, s: int, e: int, n: int) -> bool:
    return pow(s, e, n) == m


