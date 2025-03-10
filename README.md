# Добро пожаловать!

Этот проект представляет собой небольшой интернет магазин

## Инструкция по запуску проекта

Чтобы запустить проект, выполните следующие шаги:

1.  **Перейдите в папку (где вы хотите разместить проект):**
    *   Откройте терминал или командную строку.
    *   Используйте команду `cd` (change directory) для перехода в желаемую папку. Например:
        ```bash
        cd Documents
        ```

2.  **Клонируйте репозиторий с GitHub:**
    *   Используйте команду `git clone` для загрузки исходного кода проекта из репозитория GitHub:
        ```bash
        git clone https://github.com/unwelcome/fb-task-3
        ```
    *   Эта команда создаст новую папку с названием `fb-task-3` в текущей директории.

3.  **Перейдите в папку проекта:**
    *   С помощью команды `cd` перейдите в папку, которую вы только что склонировали:
        ```bash
        cd ./fb-task-3
        ```

4.  **Установите все необходимые зависимости:**
    *   Выполните команду `npm install` для установки всех пакетов, указанных в файле `package.json`.
        ```bash
        npm install
        ```
    *   Эта команда загрузит и установит все необходимые библиотеки и инструменты.

5.  **Запустите проект:**
    *   Используйте команду `npm run live` для запуска проекта.
        ```bash
        npm run live
        ```
    *   Проект должен быть доступен по адресу `http://localhost:8080` - версия для пользователя, `http://localhost:3000` - админ панель, `http://localhost:8081` - сервер для чата поддержки
