from cryptography.hazmat.primitives import serialization
from cryptoactions import CryptographyActions

crypto = CryptographyActions()

crypto.generate_rsa_keys(exp=65537, size=2048)

public_key_pem = crypto.rsa_public_key.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo
)   

web_page_data = b"""<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>RSA</title>
                    </head>
                    <body>
                        <h1>Public key:</h1>
                        <p>""" + public_key_pem + b"""</p>
                    </body>
                    </html>"""

with open("index.html", "wb") as page: 
    page.write(web_page_data) 


signature = crypto.sign_data_rsa(web_page_data)

with open("signature.dat", "wb") as signature_file: 
    signature_file.write(signature) 


with open("public.pem", "wb") as public_key_file: 
    public_key_file.write(public_key_pem)



if crypto.verify_signature_rsa(signature, web_page_data):
    print("Верификация RSA пройдена.\nПодпись верна. Веб-страница не изменена.")
else:
    print("Подпись недействительна. Веб-страница была изменена")
