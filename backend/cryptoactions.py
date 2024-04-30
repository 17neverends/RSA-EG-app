from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa, padding, ec
from cryptography.hazmat.backends import default_backend


class CryptographyActions:
    def __init__(self) -> None:
        self.rsa_private_key: rsa.RSAPrivateKey = None
        self.rsa_public_key: rsa.RSAPublicKey = None
        self.elgamal_private_key: ec.EllipticCurvePrivateKey = None
        self.elgamal_public_key: ec.EllipticCurvePublicKey = None

    def generate_rsa_keys(self, exp: int, size: int) -> None:
        self.rsa_private_key = rsa.generate_private_key(
            public_exponent=exp,
            key_size=size,
        )
        self.rsa_public_key = self.rsa_private_key.public_key()

    def sign_data_rsa(self, data: bytes) -> bytes:
        if self.rsa_private_key is None:
            raise ValueError("Приватный ключ RSA не был получен.")
        return self.rsa_private_key.sign(
            data,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )

    def load_rsa_public_key(self, public_key_pem: bytes) -> None:
        self.rsa_public_key = serialization.load_pem_public_key(public_key_pem)

    def verify_signature_rsa(self, signature: bytes, data: bytes) -> bool:
        if self.rsa_public_key is None:
            raise ValueError("Публичного ключа RSA нет.")
        try:
            self.rsa_public_key.verify(
                signature,
                data,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
            return True
        except Exception as e:
            print("Ошибка верификации RSA", e)
            return False

    def generate_elgamal_keys(self) -> None:
        self.elgamal_private_key = ec.generate_private_key(ec.SECP256R1(), default_backend())
        self.elgamal_public_key = self.elgamal_private_key.public_key()

    def sign_data_elgamal(self, data: bytes) -> bytes:
        if self.elgamal_private_key is None:
            raise ValueError("Приватный ключ Эль-Гамаля не был получен.")
        signature = self.elgamal_private_key.sign(
            data,
            ec.ECDSA(hashes.SHA256())
        )
        return signature

    def verify_signature_elgamal(self, signature: bytes, data: bytes) -> bool:
        if self.elgamal_public_key is None:
            raise ValueError("Публичного ключа Эль-Гамаля нет.")
        try:
            self.elgamal_public_key.verify(
                signature,
                data,
                ec.ECDSA(hashes.SHA256())
            )
            return True
        except Exception as e:
            print("Ошибка верификации Эль-Гамаля", e)
            return False
