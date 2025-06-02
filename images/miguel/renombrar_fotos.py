import os

ruta = "."
extension = ".jpg"

archivos = sorted([f for f in os.listdir(ruta) if f.lower().endswith(extension)])

for i, nombre_original in enumerate(archivos, start=1):
    nuevo_nombre = f"frame_{i:04d}{extension}"
    os.rename(nombre_original, nuevo_nombre)
    print(f"{nombre_original} → {nuevo_nombre}")

print("\n✅ Renombrado completado.")


