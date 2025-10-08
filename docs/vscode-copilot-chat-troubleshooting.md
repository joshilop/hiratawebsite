# Guía de solución de problemas: "Error al iniciar el chat" en VS Code Copilot Chat

Si el chat de Copilot (antes Codex) no se inicia en Visual Studio Code y aparece el mensaje `Error starting chat`, revisa los siguientes puntos:

## 1. Verifica que la extensión esté instalada y actualizada
1. Abre la **Vista de Extensiones** (`Ctrl+Shift+X`).
2. Busca **GitHub Copilot Chat**.
3. Si ves un botón de **Actualizar**, haz clic en él.
4. Reinicia VS Code después de actualizar.

> Sugerencia: También necesitas tener instalada la extensión principal **GitHub Copilot**.

## 2. Confirma que iniciaste sesión correctamente
1. Abre el **Panel de Comandos** (`Ctrl+Shift+P`).
2. Ejecuta `GitHub: Sign in` y completa el flujo en el navegador.
3. Comprueba que tu cuenta aparezca en la esquina inferior izquierda (Status Bar).

## 3. Revisa la conexión a internet y el proxy
* Si usas VPN o proxy corporativo, asegúrate de que VS Code tenga acceso a `api.githubcopilot.com`.
* Comprueba que la configuración de proxy en `settings.json` sea correcta o desactívala temporalmente.

## 4. Valida que la suscripción esté activa
* Visita [https://github.com/settings/copilot](https://github.com/settings/copilot) y confirma que tu suscripción individual o empresarial esté vigente.

## 5. Borra el estado de la extensión
1. Cierra VS Code.
2. Elimina la carpeta de estado de Copilot:
   * **Windows:** `%APPDATA%/Code/User/globalStorage/github.copilot-chat`
   * **macOS:** `~/Library/Application Support/Code/User/globalStorage/github.copilot-chat`
   * **Linux:** `~/.config/Code/User/globalStorage/github.copilot-chat`
3. Vuelve a abrir VS Code y deja que la extensión regenere los archivos.

## 6. Reinstala la extensión
1. Desde la **Vista de Extensiones**, desinstala **GitHub Copilot Chat**.
2. Reinicia VS Code.
3. Instálala de nuevo desde el Marketplace.

## 7. Revisa los registros de salida
1. Abre la vista **Output** (`Ctrl+Shift+U`).
2. Selecciona **GitHub Copilot** o **GitHub Copilot Chat** en la lista desplegable.
3. Busca mensajes de error específicos para compartir con soporte o tu administrador.

## 8. Verifica la configuración de la política empresarial (si aplica)
* Si perteneces a una organización, confirma con el administrador que Copilot Chat esté habilitado en la política de la empresa.

## 9. Último recurso: restablece la configuración de VS Code
1. Haz una copia de seguridad de tu carpeta `User` (ubicaciones en el paso 5).
2. Elimina la configuración o renómbrala.
3. Reinicia VS Code y vuelve a iniciar sesión en Copilot.

---

Si ninguno de estos pasos funciona, captura los mensajes del registro y abre un ticket con el soporte de GitHub especificando que aparece "Error starting chat" junto con tu versión de VS Code y del sistema operativo.
