## Первое, нужно установить зависимости:

Бэкэнд от фронта отдельно (бекенд - папка <span style="color:blue">**server**, фронт - <span style="color:blue">**client**), и у каждого свои зависимости,
соответственно в консоли переходим в папку server и выполняем <span style="color:blue">**npm install**

**!!! С папкой client вообще пока не ясно, где она будет, некоторые пишут, что её лучше хранить отдельно,
чтобы бекенд с фронтом не пересекались, плюс на локалке я установил на фронт React, а у него свой репозиторий, и он не заливается в общий,
сожет придётся делать два, так что строку ниже пока игнорируй !!!**

То-же самое в папке <span style="color:blue">**client**: <span style="color:blue">**npm install**</span> (*На данный момент фронта нет, пропускаем этот шаг*)

Зависимости установлены.

## Дальше работаем впапке server
### Миграциями создаём базу данных и таблицы.

С базой работает <span style="color:blue">**ORM sequelize**</span> и за миграции отвечает dev-пакет <span style="color:blue">**sequelize-cli**
Для работы с базой есть три режима, которые хранятся в файле *C:/ndserv/sound/server/config/config.json*,
а за то, какой режим активен овечает переменная файла **.env**</span> - *NODE_ENV*.

Для создания базы выполняем: <span style="color:blue">**npx sequelize-cli db:create**
При создания таблиц, ORM ругается на режим ES (module), поэтому на время выполнения миграций переключаем режим на <span style="color:blue">**commonjs**,
в файле *server/package.json* заменяем <span style="color:blue">**module**</span> на <span style="color:blue">**commonjs**
и выполняем <span style="color:blue">**npx sequelize-cli db:migrate**. 
Таблицы созданы, меняем режим обратно.

Всё, теперь бекенд готов для работы.


В папке <span style="color:blue">**routes**</span> есть три типа путей:
1. пути для регистрации, проверки почты, логина и логаута <span style="color:blue">**LoginRoutes.js**
2. пути работы с пользователями, <span style="color:blue">**UserRoutes.js**
3. пути для постов, <span style="color:blue">**PostRoutes.js**</span> - создавал их первыми, пока тренировался и их можно будет использовать в проекте (либо как есть, если не раздражает название <span style="color:blue">**post**, либо переименовать)

Дальше логика такая:
	роуты указывают на соответствующие контроллеры, каждый роут на определённый метод контроллера,
	а каждый метод контроллера указывает на соответствующий сервис (папка <span style="color:blue">**server/services**) и на его определённый метод,
	который при необходимости подключает модели таблиц (папка <span style="color:blue">**server/models**).


Обработчик ошибок в папке <span style="color:blue">**server/exceptions**

В папке <span style="color:blue">**dtos**</span> *(Data Transfer Objects)* лежат классы (пока только один), которые "обезвреживают" данные, получаемые из таблиц (отфильтровывают только нужные поля записей)

В папке <span style="color:blue">**static**</span> хранятся статичные файлы

Файлы папки *server/config*:
1. <span style="color:blue">**config.json**</span> - упоминал его выше
2. <span style="color:blue">**sequelizedb.js**</span> - настройки подключения к БД для ORM (работающие в приложении)
3. <span style="color:blue">**db.js**</span> - настройки подключения к БД для прямых запросов (в приложении не работает, оставил для примера)
