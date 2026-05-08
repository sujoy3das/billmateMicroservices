from sqlalchemy import create_engine, text
from config import settings

ROOT_DB_URL = f"mysql+pymysql://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.DB_HOST}/"

TEMPLATE_DB = "billmate"

def create_company_database(db_name: str):
    engine = create_engine(ROOT_DB_URL)
    with engine.connect() as conn:
        conn.execute(text(f"CREATE DATABASE {db_name}"))
        conn.commit()


def copy_template_tables(db_name: str):
    engine = create_engine(ROOT_DB_URL)
    with engine.connect() as conn:
        result = conn.execute(text(f"SHOW TABLES FROM {TEMPLATE_DB}"))
        tables = [row[0] for row in result]

        for table in tables:
            conn.execute(text(f"""
                CREATE TABLE {db_name}.{table}
                LIKE {TEMPLATE_DB}.{table}
            """))
        conn.commit()
