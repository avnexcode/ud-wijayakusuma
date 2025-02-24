from datetime import datetime
import random
import string


def generate_cuid():
    return "c" + "".join(random.choices(string.ascii_lowercase + string.digits, k=24))


def generate_insert_customers(count, output_file="./src/data/customer.sql"):

    created_at = updated_at = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

    with open(output_file, "w") as file:
        for i in range(count):
            cuid = generate_cuid()
            name = f"Customer {i+1}"
            email = f"customer{i+1}@mailnator.com"
            address = f"{i+1} Main Street, City"
            phone = f"62815678{i:04}"

            sql = f"""
            INSERT INTO customers (id, name, email, address, phone, created_at, updated_at)
            VALUES ('{cuid}', '{name}', '{email}', '{address}', '{phone}', '{created_at}', '{updated_at}');
            """.strip()

            file.write(sql + "\n")


generate_insert_customers(100)
