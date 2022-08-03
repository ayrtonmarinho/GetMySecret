import base64

# encode
mysecret = "Era @uma vez, Lá em casa15369"

encode = (base64.b64encode(mysecret.encode('utf-8')))
encoded_utf8 = encode.decode('utf-8')
print(encoded_utf8)


# Decode
a = "QWxhbW9zIEUgZG9pcyAyeA=="
base64text = a

decoded = base64.b64decode(base64text.encode('utf-8'))
decoded_ascii = decoded.decode('utf-8')
print(decoded_ascii)
