import os
import subprocess
from colorama import init, Fore, Style

init()

banner = f"""{Fore.RED}
███████╗ █████╗ ██╗   ██╗ ██████╗███████╗        ██████╗ ██╗███████╗██╗  ██╗███████╗██████╗ 
██╔════╝██╔══██╗██║   ██║██╔════╝██╔════╝        ██╔══██╗██║██╔════╝██║  ██║██╔════╝██╔══██╗
███████╗███████║██║   ██║██║     █████╗          ██████╔╝██║███████╗███████║█████╗  ██████╔╝
╚════██║██╔══██║██║   ██║██║     ██╔══╝          ██╔═══╝ ██║╚════██║██╔══██║██╔══╝  ██╔══██╗
███████║██║  ██║╚██████╔╝╚██████╗███████╗███████╗██║     ██║███████║██║  ██║███████╗██║  ██║
╚══════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝╚══════╝╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
{Style.RESET_ALL}"""

def user_menu(directories):
    print(banner) 
    print("Ingresa el numero de pagina requerida:")
    for i, directory in enumerate(directories, start=1):
        print(f"{i}. {directory}")

def initial():
    templates_path = os.path.join(os.path.dirname(__file__), "Templates")
    pages = os.listdir(templates_path)

    user_menu(pages)
    choice = input()

    try:
        choice_index = int(choice) - 1
        page_directory = pages[choice_index]
        page_path = os.path.join(templates_path, page_directory, "index.html")

        if os.path.exists(page_path):
            print(f"La página {page_directory} está disponible en http://localhost:8000")
            os.chdir(os.path.join(templates_path, page_directory))
            print("Cambiando al directorio:", os.getcwd())
            server_process = subprocess.Popen(["python", "-m", "http.server"])
            server_process.wait()
        else:
            print(f"No encontrada")
    except (ValueError, IndexError):
        print("Por favor, ingrese un numero valido.")

if __name__ == "__main__":
    initial()
