## Важно
Перед внесением первых изменений в код нужно [настроить](https://www.jetbrains.com/help/webstorm/prettier.html#ws_prettier_run_automatically_in_new_projects) срабатывание `prettier` на сохранение и форматирование файлов.

### Scripts
- `npm run dev` - запуск в дев режиме, приложение по дефолту доступно на `localhost:6969`
- `npm run build` - билд
- `npm run start` - запуск билда

### Развёртывание для немощных
1. Создать в корне проекта файл .env с данными для сборки. Данные в конфе в телеграме закреплены
2. `npm run dev`
3. Профит
#### Это боевая база в интернетах, форспуши аффектят всех. Прежде чем что-то говнячить, отпишите в конфу


### Развёртывание в докере
 1. [Установить докер](https://docs.docker.com/desktop/install/windows-install/), если ещё не.
 2. Создать в корне проекта файл .env с данными для сборки. Можно скопировать из .env.sample
 3. `docker compose up`
 4. Зайти на localhost:{порт из env} под креденшелами PGADMIN_* из .env
 5. Servers > Create > Server
 6. name - любое имя
 7. host name/address - `host.docker.internal`
 8. username и password - POSTGRES_USER и POSTGRES_PASSWORD из .env
 9. save
 10. Должен появиться сервер с именем из пункта 6. В нём должна быть база postgres. Успех.
 11. Сейчас всё раскатывается вместе с сервером, если он не нужен, можно убить в докере.

### Про code quality
На проекте настроены husky, commitlint, eslint и prettier.\
\
`Eslint и prettier` будут автоматически делать стилистические правки в коде, для поддержания общего стиля.\
`Commitlint` проверяет коммиты на соответствие общему стилю. Обязательное условие - наличие в заголовке префикса `HUE2-{число}/`
\
`husky` автоматически запускает все необходимые проверки при попытке коммита, если что-то фейлится, сделать коммит он не даст.
Гуглите ошибки и исправляйте, если будут вопрос - спрашивайте.
