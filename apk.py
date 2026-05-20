import os
import subprocess
import platform
from pathlib import Path

def executar(comando):
    print(f"\nExecutando: {' '.join(comando)}")
    resultado = subprocess.run(comando, text=True)

    if resultado.returncode != 0:
        raise Exception("Erro ao executar o comando.")

def main():
    projeto = Path.cwd()

    if platform.system() == "Windows":
        gradle = projeto / "gradlew.bat"
        comando_gradle = [str(gradle), "assembleDebug"]
    else:
        gradle = projeto / "gradlew"
        comando_gradle = ["./gradlew", "assembleDebug"]

    if not gradle.exists():
        print("Erro: gradlew não encontrado.")
        print("Execute este script dentro da pasta raiz do projeto Android.")
        return

    if platform.system() != "Windows":
        os.chmod(gradle, 0o755)

    executar(comando_gradle)

    apk = projeto / "app" / "build" / "outputs" / "apk" / "debug" / "app-debug.apk"

    if apk.exists():
        print("\nAPK gerado com sucesso!")
        print(f"Local do APK: {apk}")
    else:
        print("\nBuild terminou, mas o APK não foi encontrado no caminho esperado.")

if __name__ == "__main__":
    main()