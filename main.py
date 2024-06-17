import os
import subprocess
import http.server
import ssl
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

def serve_with_ssl(directory):
    server_address = ('localhost', 8000)

    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain('server.pem')

    os.chdir(directory)
    handler = http.server.SimpleHTTPRequestHandler

    # Crear el servidor SSL
    with http.server.HTTPServer(server_address, handler) as httpd:
        httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

        print(f"Servidor HTTPS iniciado en https://{server_address[0]}:{server_address[1]}")
        httpd.serve_forever()

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
            print(f"La página {page_directory} está disponible en https://localhost:8000")
            page_directory_full_path = os.path.join(templates_path, page_directory)
            serve_with_ssl(page_directory_full_path)
        else:
            print("Página no encontrada")
    except (ValueError, IndexError):
        print("Por favor, ingrese un número válido.")

if __name__ == "__main__":
    initial()
