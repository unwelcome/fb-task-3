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

4.  **Запустите Docker на своем устройстве**
    *   Docker сильно упростит сборку проекта

5.  **Запустите проект через Docker compose**
    *   Выполните команду `docker compose up --build -d` для запуска проекта через Docker.
        ```bash
        docker compose up --build -d
        ```
    *   Проект должен быть доступен по адресу `http://localhost:8080` - версия для пользователя, `http://localhost:3000` - админ панель, `http://localhost:8081` - сервер для чата поддержки

6.  **Если не можете запустить проект через Docker, можно запустить его через NodeJS**
    *   Перейдите в папку `/backend` и выполните команду `npm install`
        ```bash
        cd ./backend
        npm install
        ```
    *   Эта команда установит все зависимости для запуска проекта

7.  **Запустите проект через NodeJS**
    *   В папке `/backend` выполните команду `npm run live`
        ```bash
        npm run live
        ```
    *   Эта команда запустит проект на вашем устройстве бзе использования Docker
    *   Проект должен быть доступен по адресу `http://localhost:8080` - версия для пользователя, `http://localhost:3000` - админ панель, `http://localhost:8081` - сервер для чата поддержки